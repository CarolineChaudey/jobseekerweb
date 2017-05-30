const Sequelize = require('sequelize');

module.exports = (api) => {

  let User = require('./User.js')(api);

  return api.connection.define('Seeker', User, {
    tableName: 'Seeker',
    paranoid: true
  });

};
