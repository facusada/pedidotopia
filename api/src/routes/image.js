const server = require('express').Router()

server.post('/', (req, res) => {
	console.log(req.file)
	const names = req.file.filename
	res.send(JSON.stringify(names))
})

module.exports = server