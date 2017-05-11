const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Tag', {
      tag: {
        type: Sequelize.STRING,
        field: 'tag',
        allowNull: false
      }
    }, {
      tableName: 'Tag',
      paranoid: true
    });
}
