const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Company', {
      name: {
        type: Sequelize.STRING,
        field: 'name',
        primaryKey: true
      }
    }, {
      tableName: 'Company',
      paranoid: true
    });
}
