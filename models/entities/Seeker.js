const Sequelize = require('sequelize');
let User = require('./User.js');

module.exports = (api) => {

  User.favoriteTags = {
    type: Sequelize.STRING,
    field: 'favoriteTags',
    allowNull: false,
    defaultValue: ''
  };

  return api.connection.define('Seeker', User, {
    tableName: 'Seeker',
    paranoid: true
  });

};
