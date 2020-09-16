const compression = require('compression');
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

global.config = require('./config.js');

const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json({
  limit: '10mb'
}));

/** Security */
app.disable('x-powered-by');

/** SOAP */
var soap = require('soap');
var xml = require('fs').readFileSync('service.wsdl', 'utf8');
var service = require('./webservices/wsUser.js');

// Exponer api atraves del puerto configurado
module.exports = app.listen(global.config.app.port, function () {
  soap.listen(app, '/users', service, xml);
});