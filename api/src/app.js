const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const fetch = require('node-fetch');
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
var meli = require('mercadolibre');
const helmet = require('helmet');
const session = require('cookie-session');
require('dotenv').config();
const { meli_get } = require('../utils');
const { validateToken } = require('../middlewares/tokens')
const { tokens } = require('../middlewares/tokens')
console.log("este es el token", tokens)

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


// var meliObject = new meli.Meli('2319781659457528', 'h0B0WpaJevSc0RZoGxbzpXRTSGNQ6336');


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
// server.use(express.static(path.join(__dirname, '../public')))

// server.get('/', (req, res) => {
//   const code = req.query.code;
  
//   if(code){
//     const body = {
//       grant_type : 'authorization_code', 
//       client_id : '2319781659457528',
//       client_secret : 'h0B0WpaJevSc0RZoGxbzpXRTSGNQ6336',
//       code : code,
//       redirect_uri:'http://localhost:3000'
//     }
//     fetch('https://api.mercadolibre.com/oauth/token', {
//         method: 'post',
//         body:    JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json' },
//     })
//     .then(res => res.json())
//     .then(jsonToken => console.log(jsonToken));
//     // esse jsonToken es el objetito que contiene con el token 
//   }
//   res.send(req.query.code)
// });

// server.get('/', (req, res) => {
//   const access_token = req.body.access_token;
  
//   if(access_token){
//     const body = {
//       grant_type : 'refresh_token', 
//       client_id : '2319781659457528',
//       client_secret : 'h0B0WpaJevSc0RZoGxbzpXRTSGNQ6336',
//       refresh_token:'TG-5f62b6bcd5d09c0007f3d240-640321140'
//     }
//     fetch('https://api.mercadolibre.com/oauth/token', {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json' },
//     })
//     .then(res => res.json())
//     .then(jsonToken => console.log(jsonToken));
//   }
//   res.send(req.body.access_token)
// });

const { CLIENT_ID, CLIENT_SECRET, SYS_PWD } = process.env;

server.use(helmet());
server.use(session({
  name: 'session',
  keys: ['2319781659457528', 'h0B0WpaJevSc0RZoGxbzpXRTSGNQ6336'],
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000 * 6) // 6 horas
  },
}));
server.use(express.urlencoded({ extended: false }));

// server.get('/', (req, res) => {
//   res.render('index');
// });

// server.post('/login', (req, res) => {
//   if (req.body.password === SYS_PWD) {
//     req.session.user = true;
//     res.redirect('/home');
//   } else {
//     res.redirect('/?error=contraseña incorrecta');
//   }
// });

// server.get('/home', validateToken, async (req, res) => {
//   try {
//     const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET, res.locals.access_token);
//     const user = await meli_get(meliObject, '/users/me');
//     const currencies = await meli_get(meliObject, '/currencies');
//     const listing_types = await meli_get(meliObject, `/sites/${user.site_id}/listing_types`);
//     res.render('home', {
//       user,
//       currencies,
//       listing_types
//     });
//   } catch (err) {
//     console.log('Error', err);
//     res.status(500).send(`Error! ${err}`);
//   }
// });

server.post('/post', validateToken, async (req, res) => {
  try {
    const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET, res.locals.access_token);
    const user = await meli_get(meliObject, '/users/me');
		const predict = await meli_get(meliObject, `/sites/${user.site_id}/category_predictor/predict?title=${encodeURIComponent(req.body.title)}`);
		console.log(predict)
		console.log(req.body)
    const body = {
      title: req.body.title,
      category_id: predict.id,
      price: req.body.price,
      // currency_id: req.body.currency,
      quantity: req.body.quantity,
      // buying_mode: 'buy_it_now',
      // listing_type_id: req.body.listing_type,
      // condition: req.body.condition,
      description: req.body.description,
      tags: [ 'immediate_payment' ],
      pictures: [
        {
          source: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
				}
				
      ]
    };
    meliObject.post('/items', body, null, (err, response) => {
      if (err) {
        throw err;
      } else {
        console.log('publicado na categoria:', predict.name);
        console.log('category probability (0-1):', predict.prediction_probability, predict.variations);
        res.send(response);
      }
    });
  } catch(err) {
    console.log('Error', err);
    res.status(500).send(`Error! ${err}`);
  }
});



module.exports = {
	server
	// meliObject
 };
