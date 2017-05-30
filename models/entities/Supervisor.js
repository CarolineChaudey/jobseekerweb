const Sequelize = require('sequelize');

module.exports = (api) => {

  let User = require('./User.js')(api);

  return api.connection.define('Supervisor', User, {
    tableName: 'Supervisor',
    paranoid: true
  });

};
