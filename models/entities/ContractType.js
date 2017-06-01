const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('ContractType', {
      name: {
        type: Sequelize.STRING,
        field: 'name',
        primaryKey: true
      }
    }, {
      tableName: 'ContractType',
      paranoid: true
    });
}
