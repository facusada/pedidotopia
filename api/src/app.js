const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const fetch = require('node-fetch');
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3001') // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, DELETE'
	)
	next()
})

// middlewares con Multer
const storage = multer.diskStorage({
	destination: path.join(__dirname, '../public/images'),
	filename: (req, file, cb) => {
		cb(null, uuidv4() + path.extname(file.originalname).toLowerCase())
	},
})

const upload = multer({
	storage,
	limits: { fileSize: 2000000 },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|PNG/
		const mimeType = fileTypes.test(file.mimetype)
		const extName = fileTypes.test(path.extname(file.originalname))
		if (mimeType && extName) {
			return cb(null, true)
		}
		cb('Error: debe subir un archivo valido')
	},
}).array('file')

server.use(upload)

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Static files
server.use(express.static(path.join(__dirname, '../public')))

server.get('/', (req, res) => {
  const code = req.query.code;
  
  if(code){
    const body = {
      grant_type : 'authorization_code', 
      client_id : '2319781659457528',
      client_secret : 'h0B0WpaJevSc0RZoGxbzpXRTSGNQ6336',
      code : code,
      redirect_uri:'http://localhost:3000'
    }
    fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(jsonToken => console.log(jsonToken));
    // esse jsonToken es el objetito que contiene con el token 
  }
  res.send(req.query.code)
});

module.exports = server;
