const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Website', {
      id: {
        type: Sequelize.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        field: 'url',
        allowNull: false
      }
    }, {
      tableName: 'Website',
      paranoid: true
    });
}
