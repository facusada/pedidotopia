const server = require('express').Router();
const { Product, Category } = require('../db.js');
const fetch = require('node-fetch')
const token = require('../../token/token.js')

server.get('/', (req, res) => {
	Product.findAll()
	.then(products => {
		return res.status(200).send(products)})
	.catch( err => {
		return res.status(500).json({ 
			error: "No se pudieron obtener los productos",
			message: err
		})
	});
});

server.post('/', (req, res) => {
	const { title, price, quantity, description, images} = req.body;
	if(!title || !price || !quantity){
		return res.status(422).json({ error: "No se enviaron todos los datos"});
	}

	fetch(`https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=${title}`)
	.then((respuesta) => respuesta.json())
	.then((category) => {
		console.log('la category es: '+ JSON.stringify(category));
		return category[0].category_id;
	})
	.then((categoriaML) => {
		var data =  {
			title: title,
			category_id:categoriaML,
			price:price,
			currency_id:"ARS",
			available_quantity:quantity,
			condition:"new",
			listing_type_id:"gold_special",
			description:{
			   plain_text: description
			},
			sale_terms:[
			   {
				  id:"WARRANTY_TYPE",
				  value_name:""
			   },
			   {
				  id:"WARRANTY_TIME",
				  value_name:"90 días"
			   }
			],
			pictures:[
			   {
				  source: images
			   }
			],
			attributes:[
				{
				  id:"COLOR",
				  value_name:"Azul"
			   },
			   {
				  id:"SIZE",
				  value_name: "M"
			   }
			]
		}

	   fetch(`https://api.mercadolibre.com/items?access_token=${token}`,{
		method: 'POST', 
		body: JSON.stringify(data)})
		.then(res => res.json())
		.then((response)=> {
			// if(response.error){
			// 	// res.status(401).send(response)
			// } else {
			console.log('se creo el producto: '+ JSON.stringify(response))

			// Guardo el produto cerado en la api en mi db
			console.log('a la db va con: '+ response.id, response.title, response.price, response.available_quantity,
			description, images, response.permalink)

			Product.create({
					idML: response.id,
					title: response.title,
					price: response.price,
					quantity: response.available_quantity,
					description,
					images,
					linkMeli: response.permalink
				})
				.then( product => {
					console.log('se ceral el producto en la db: '+ JSON.stringify(product))
					res.status(201).send(product)
					res.send(product)
				})
				.catch( err => res.status(502).json({ 
					error: "No se pudo crear el producto"
				}))

		})
		.catch(error => console.error('Error:', error))
	})
	.catch(err => console.log(err))

	

})

server.delete('/:id', (req, res) => {
	const { id } = req.params;
	var idML = "";
	
	Product.findOne({ where: { id: req.params.id }})
		.then((product) => {
			if (!product) return ('Id no válido')
			// console.log('product encontrado: '+ JSON.stringify(product))
			idML = product.idML
			product.destroy().then(() => {
				// console.log('producto borrado db: '+ JSON.stringify(product))
			})

			// console.log('idML: '+idML)
			// console.log('id: '+id)
			fetch(`https://api.mercadolibre.com/items/${idML}?access_token=${token}`, {
				method: 'PUT',
				header: {
				  "Content-Type": "application/json", "Accept": "application/json" },
				body: JSON.stringify({"status": "closed"}),
			})
			.then(res => res.json())
			.then((respuesta) => {
				// console.log('la respuesta del delete en ml es: '+ JSON.stringify(respuesta))
				res.send(respuesta)
		    }) 
		})
	
	.catch(error => {
		console.error('Error:', error);
		res.status(500).send(error)
	})
})

server.put('/:id/modificar', (req, res) => {
	const { id } = req.params;
	const { available_quantity, price, title, description } = req.body;
	console.log('el id al ual le voy a hacer el put: '+ JSON.stringify(req.params.id))
	console.log('el body al ual le voy a hacer el put: '+ JSON.stringify(req.body))
	fetch(`https://api.mercadolibre.com/items/${id}?access_token=${token}`, {
		method: 'PUT',
		header: {
			"Content-Type": "application/json", "Accept": "application/json"
		},
		body: JSON.stringify({
			available_quantity,
            price,
            title,
            description
		})
	})

	.then(res => res.json())
	.then((respuesta) => {
	console.log('la respuesta del modificare s: '+JSON.stringify(respuesta))
		
		Product.findOne({ where: { idML: respuesta.id }})
		.then(product => {
			if(!product){
				res.status(404).send('No se encontro')
			} else {
				product.title = respuesta.title 
				product.description = respuesta.description
				product.price = respuesta.price
				product.quantity = respuesta.quantity 
				product.save().then(() => {
					res.status(201).send(product)
				})
			}
		})
		// alert("El producto ha sido modificado exitosamente")
	 }) 
	.catch(err => console.log('modificar sale por el catch '+ err))
})

server.put('/picture/:id/modificar', (req, res) => {
	const { id } = req.params;
	const { pictures } = req.body;
	fetch(`https://api.mercadolibre.com/items/{item_id}?access_token=APP_USR-2319781659457528-091710-bace5fa0f1615a9a5441e571140f97b7-174509496`,{
		method: 'PUT',
		body: {
			pictures:pictures
		}
	})
	.then(res => res.json())
	.then(res => {
		console.log('se modifico la imagen'+ res)
	})
	.catch(err => console.log(err))
})

server.get('/:id', (req, res) => {
	Product.findOne({ where: { idML: req.params.id }})
	.then(product => {
		if(!product){
			res.status(404).send('No se encotro')
		} else {
			res.send(product)
		}
	})
})

module.exports = server;
