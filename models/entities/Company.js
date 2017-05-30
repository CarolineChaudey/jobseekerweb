const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Company', {
      id: {
        type: Sequelize.UUID,
        field: 'id',
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
      }
    }, {
      tableName: 'Company',
      paranoid: true
    });
}
