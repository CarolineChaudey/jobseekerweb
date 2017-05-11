const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Application', {
      id: {
        type: Sequelize.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      }
    }, {
      tableName: 'Application',
      paranoid: true
    });
}
