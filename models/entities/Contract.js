const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Contract', {
      name: {
        type: Sequelize.STRING,
        field: 'name',
        primaryKey: true
      }
    }, {
      tableName: 'Contract',
      paranoid: true
    });
}
