const server = require('express').Router();
const { Product, Category } = require('../db.js');

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
	const { title, price, quantity, description, categories} = req.body;
	if(!title || !price || !quantity){
		return res.status(422).json({ error: "No se enviaron todos los datos"});
	}

	Product.create({
		title,
		price,
		quantity,
		description
	})
	.then( product => {
		product.setCategories(categories)
		.then(() => res.status(201).send(product))
	})
	.catch( err => res.status(500).json({ error: "No se pudo crear el producto"}))

})

module.exports = server;
