const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.connection.define('Ad', {
      id: {
        type: Sequelize.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      position: {
        type: Sequelize.STRING,
        field: 'position',
        allowNull: false
      },
      publicationDate: {
        type: Sequelize.DATE,
        field: 'publicationDate',
        allowNull: false
      },
      contactEmail: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: true
      },
      urlApplication: {
        type: Sequelize.STRING,
        field: 'urlApplication',
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        field: 'description',
        allowNull: true
      },
      jobDuration: {
        type: Sequelize.INTEGER,
        field: 'jobDuration',
        allowNull: true
      }
    }, {
      tableName: 'Ad',
      paranoid: true
    });
}
