
module.exports = (api) => {

  return {
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
    surname: {
      type: Sequelize.STRING,
      field: 'surname',
      allowNull: false
    },
    login: {
      type: Sequelize.STRING,
      field: 'login',
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      field: 'pwd',
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
