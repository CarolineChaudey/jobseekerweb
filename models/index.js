const bluebird = require('bluebird');
var mysql = require('mysql');
var Sequelize = require('sequelize');
const path = './entities/';

module.exports = (server) => {

    server.connection = new Sequelize('gbay', 'root', 'azerty', {
      //host: '192.168.0.33',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 1000
      }
    });


    server.models = {
        Advice: require(path + 'Advice')(server),
        Category: require(path + 'Category')(server),
        Product: require(path + 'Product')(server),
        Role: require(path + 'Role')(server),
        //Token: require('Token')(server), à voir après
        User: require(path + 'User')(server)
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
