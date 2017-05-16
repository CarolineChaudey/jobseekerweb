module.exports = (api) => {
    api.actions = {
      users: require('./users')(api)
    };
};
