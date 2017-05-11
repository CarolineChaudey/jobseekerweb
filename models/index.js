const bluebird = require('bluebird');
var mysql = require('pg');
var Sequelize = require('sequelize');
const path = './entities/';

module.exports = (server) => {

    server.connection = new Sequelize('service', 'postgres', 'azerty', {
      //host: '192.168.0.33',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 1000
      }
    });

    server.models = {
        Ad:               require(path + 'Ad')(server),
        Application:      require(path + 'Application')(server),
        ApplicationState: require(path + 'ApplicationState')(server),
        Company:          require(path + 'Company')(server),
        Contract:         require(path + 'Contract')(server),
        Letter:           require(path + 'Letter')(server),
        Resume:           require(path + 'Resume')(server),
        Seeker:           require(path + 'Seeker')(server),
        Supervisor:       require(path + 'Supervisor')(server),
        Tag:              require(path + 'Tag')(server),
        Website:          require(path + 'Website')(server)
    }
    console.log('Models created.');

    /*
    require('./relations.js')(server);
    console.log('Relations between models set.');
*/
    server.connection.sync().then(function() {
      console.log('Server sync successfuly');
    //}).catch((error) => {
      //console.log(error);
    });
};
