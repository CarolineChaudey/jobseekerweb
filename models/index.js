const bluebird = require('bluebird');
var mysql = require('pg');
var Sequelize = require('sequelize');
const path = './entities/';

module.exports = (server) => {

    server.connection = new Sequelize('service', 'root', 'azerty', {
      //host: '192.168.0.33',
      host: 'localhost',
      port: 3306,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 1000
      }
    });

    server.models = {
      /*
        User: require(path + 'User')(server)
        */
    }
    console.log('Models created.');


    require('./relations.js')(server);
    console.log('Relations between models set.');

    server.connection.sync().then(function() {
      console.log('Server sync successfuly');
    //}).catch((error) => {
      //console.log(error);
    });
};
