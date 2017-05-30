const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Application', {
      id: {
        type: Sequelize.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      state: {
        type: Sequelize.ENUM(api.settings.applicationStates),
        field: 'state',
        allowNull: false,
        defaultValue: api.settings.applicationStates[0] // "CREATED"
      }
    }, {
      tableName: 'Application',
      paranoid: true
    });
}
