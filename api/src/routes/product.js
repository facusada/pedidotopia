const server = require('express').Router();
const { Product, Category } = require('../db.js');
const fetch = require('node-fetch')

server.get('/', (req, res) => {
	Product.findAll({
		include: [Category],
	})
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
	const { title, price, quantity, description, categories, images} = req.body;
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
		fetch('https://api.mercadolibre.com/items?access_token=APP_USR-625401119093695-091609-b5237289c816a035d8d660134b6a69f5-174509496',{
			method: 'POST', 
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			}
			})
			.then(res => res.json())
			.then((product)=> {
				console.log(product) })
			.catch(error => console.error('Error:', error))
		})
	.catch(err => console.log(err))

	// Product.create({
	// 	title,
	// 	price,
	// 	quantity,
	// 	description,
	// 	images,
	// })
	// .then( product => {
	// 	product.setCategories(categories)
	// 	.then(() => res.status(201).send(product))
	// })
	// .catch( err => res.status(500).json({ error: "No se pudo crear el producto"}))

})

server.delete('/:id', (req, res) => {
	const { id } = req.params;
	console.log(id)
	fetch(`https://api.mercadolibre.com/items/${id}?access_token=APP_USR-2319781659457528-091700-eda818dacdee0c0d9644ef026f75e46d-67495033`, {
        method: 'PUT',
        header: {
		  "Content-Type": "application/json", "Accept": "application/json" },
		body: JSON.stringify({"status": "closed"}),
    })
	.then(res => res.json())
	.then((respuesta) => {
	console.log(respuesta)
	})
	.catch(error => console.error('Error:', error))
})

server.put('/:id/modificar', (req, res) => {
	const { id } = req.params;
	const { cantidad, precio, video, imagenes, descripcion, envio } = req.body;
	fetch(`https://api.mercadolibre.com/items/${id}?access_token=APP_USR-2319781659457528-091700-eda818dacdee0c0d9644ef026f75e46d-67495033`, {
		method: 'PUT',
		header: {
			"Content-Type": "application/json", "Accept": "application/json"
		},
		body: JSON.stringify({
			"cantidad": cantidad,
			"precio" : precio,
			"video" : video,
			"imagenes" : imagenes,
			"description" : descripcion,
			"envio" : envio
		})
	})
})

module.exports = server;
