const Sequelize = require('sequelize');

module.exports = (api) => {

  let User = require('./User.js')(api);

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
