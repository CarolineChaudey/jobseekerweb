module.exports = (api) => {
    api.actions = {
      users: require('./users')(api),
      websites: require('./websites')(api)
    };
};
