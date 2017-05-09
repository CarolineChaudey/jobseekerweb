
module.exports = (server) => {

  server.models.User.belongsTo(server.models.Role, {as: 'role'});
  server.models.Advice.belongsTo(server.models.User, {as: 'author'});
  server.models.Advice.belongsTo(server.models.User, {as: 'subject'});
  //User.belongsToMany(User, {through: 'Advice', foreignKey: 'userId', otherKey: 'projectId'})
  server.models.Product.belongsTo(server.models.User, {as: 'seller'});
  server.models.Product.belongsTo(server.models.User, {as: 'buyer'});
  server.models.Product.belongsToMany(server.models.Category, {through: 'CategoryProduct'});

};
