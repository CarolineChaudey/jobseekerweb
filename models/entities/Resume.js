const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Resume', {
      id: {
        type: Sequelize.UUID,
        field: 'id',
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false
      },
      format: {
        type: Sequelize.STRING,
        field: 'format',
        allowNull: false
      }
    }, {
      tableName: 'Resume',
      paranoid: true
    });
}
