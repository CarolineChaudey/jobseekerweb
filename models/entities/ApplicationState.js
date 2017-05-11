const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('ApplicationState', {
      state: {
        type: Sequelize.STRING,
        field: 'state',
        primaryKey: true
      }
    }, {
      tableName: 'ApplicationState',
      paranoid: true
    });
}
