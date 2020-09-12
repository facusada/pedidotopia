const server = require('express').Router();
const { Product, Category } = require('../db.js');
const fetch = require('node-fetch');

server.get('/', (req, res) => {
	
	fetch('https://api.mercadolibre.com/sites/MLA/categories#json')
	.then(res => res.json())
	.then(categories => {
		categories.map((category) => 
			Category.create({
				idML: category.id,
				name: category.name
			})
			.then( res => console.log('res es: '+res))
			.catch( err => console.log('err es: '+err))
			)
	})
	.catch( err => console.log(err))

	res.send('ok')
})

module.exports = server;