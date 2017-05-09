
var express = require('express');
var server = express();

require('./settings')(server);  console.log('Settings initialized');
require('./models')(server);  console.log('Models initialized');
require('./middlewares')(server); console.log('Middlewares initialized');
require('./actions')(server); console.log('Actions initialized');
require('./routes')(server);  console.log('Routes initialized');

server.listen(server.settings.port);
console.log('Server listening on port', server.settings.port);
