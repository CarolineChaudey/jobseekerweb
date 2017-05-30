const Sequelize = require('sequelize');

module.exports = (api) => {

  return {
    id: {
      type: Sequelize.UUID,
      field: 'id',
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    firstname: {
      type: Sequelize.STRING,
      field: 'firstname',
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      field: 'lastname',
      allowNull: false
    },
    login: {
      type: Sequelize.STRING,
      field: 'login',
      allowNull: false
    },
    pswd: {
      type: Sequelize.STRING,
      field: 'pswd',
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      field: 'token',
      allowNull: true
    }
  };

};
