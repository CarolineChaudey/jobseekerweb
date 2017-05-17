const Sequelize = require('sequelize');

module.exports = (api) => {

  let User = require('./User.js')(api);

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
