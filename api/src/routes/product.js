const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res) => {
	Product.findAll({
		include: [Category],
	})
	.then(products => {
		console.log('products es: '+ JSON.stringify(products))
		return res.status(200).send(products)})
	.catch( err => {
		console.log('el err es: '+ err)
		return res.status(500).json({ error: "No se pudiero obtener los productos",
		message: err})
	});
});

server.post('/', (req, res) => {
	const { title, price, quantity, categories} = req.body;
	if(!title || !price || !quantity || categories.length === 0){
		return res.status(422).json({ error: "No se enviaron todos los datos"});
	}

	Product.create({
		title,
		price,
		quantity
	})
	.then( product => {
		product.setCategories(categories)
		.then(() => res.status(201).send(product))
	})
	.catch( err => res.status(500).json({ error: "No se pudo crear el producto"}))

})

module.exports = server;
