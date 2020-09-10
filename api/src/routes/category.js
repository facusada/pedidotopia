const server = require('express').Router();
const { Category } = require('../db.js');

server.get('/', (req, res) => {
	Category.findAll()
		.then( categories => {
			res.send( categories );
		})
		.catch( err => res.status(500).json({ error: "No se obtuvieron las categorias"}));
});

server.post('/', (req, res) => {
	const { title, parentId} = req.body;
	if(!title){
		return res.status(422).json({ error: "No se envio el nombre de la categoria"});
	}

	Category.create({
		title,
		parentId 
	})
	.then((category) => res.status(201).send(category))
	.catch( err => res.status(500).json({ error: "No se pudo crear la categoria"}))
})

module.exports = server;
