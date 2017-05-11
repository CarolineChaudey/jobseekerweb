const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Letter', {
      id: {
        type: Sequelize.UUID,
        field: 'id',
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false
      }
    }, {
      tableName: 'Letter',
      paranoid: true
    });
}
