const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Tag', {
      tag: {
        type: Sequelize.STRING,
        field: 'tag',
        primaryKey: true
      }
    }, {
      tableName: 'Tag',
      paranoid: true
    });
}
