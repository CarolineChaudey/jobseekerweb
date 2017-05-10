const Sequelize = require('sequelize');
let Tokenify = require('sequelize-tokenify');
let User = require('./User.js');

module.exports = (api) => {

  User.favoriteTags = {
    type: Sequelize.STRING,
    field: 'favoriteTags',
    allowNull: false,
    defaultValue: ''
  };

  User.token = {
    type: Sequelize.STRING,
    field: 'token',
    allowNull: true
  };

  return api.connection.define('Seeker', User, {
    tableName: 'Seeker',
    paranoid: true
  });

};
