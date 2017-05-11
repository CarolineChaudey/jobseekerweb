const Sequelize = require('sequelize');
let User = require('./User.js');

module.exports = (api) => {

  User.company = {
    type: Sequelize.STRING,
    field: 'company',
    allowNull: true
  };

  return api.connection.define('Supervisor', User, {
    tableName: 'Supervisor',
    paranoid: true
  });

};
