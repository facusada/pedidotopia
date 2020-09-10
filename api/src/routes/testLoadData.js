const server = require('express').Router();
const { Product, Category } = require('../db.js');

const categories = [
    {title: "Camperas"},
    {title: "Buzos"},
    {title: "Camisetas"},
    {title: "Zapatillas"}
]
const products = [
    { title: "Campera Argentina", price: 200, quantity: 10, categories: [1]},
    { title: "Campera Fla", price: 300, quantity: 10, categories: [1]},
    { title: "Buzo Vasco", price: 400, quantity: 10, categories: [2]},
    { title: "Buzo Bota", price: 10, quantity: 10, categories: [2]},
    { title: "Buzo Brasil", price: 10, quantity: 10, categories: [2]},
    { title: "Camiseta de Boca", price: 100, quantity: 10, categories: [3]},
    { title: "Camiseta del 12", price: 100, quantity: 10, categories: [3]},
    { title: "Zapatilla Puma", price: 150, quantity: 10, categories: [4]},
    { title: "Zapatilla Holanda", price: 150, quantity: 10, categories: [4]},
    { title: "Zapatilla Mate", price: 150, quantity: 10, categories: [4]},
]

server.get('/', async (req, res) => {
    categories.forEach((category) => Category.create(category))

	Product.create(products[0])
		.then((product) => {
			product.setCategories(1)
			return Product.create(products[1])
		})
		.then((product) => {
			product.setCategories(1)
			return Product.create(products[2])
		})
		.then((product) => {
			product.setCategories(2)
			return Product.create(products[3])
		})
		.then((product) => {
			product.setCategories(2)
			return Product.create(products[4])
		})
		.then((product) => {
			product.setCategories(2)
			return Product.create(products[5])
		})
		.then((product) => {
			product.setCategories(3)
			return Product.create(products[6])
		})
		.then((product) => {
			product.setCategories(3)
			return Product.create(products[7])
		})
		.then((product) => {
			product.setCategories(4)
			return Product.create(products[8])
		})
		.then((product) => {
			product.setCategories(4)
			return Product.create(products[9])
		})
		.then((product) => {
			product.setCategories(4)
		})
		.catch(console.log)
	
	res.send('ok')


})

module.exports = server;