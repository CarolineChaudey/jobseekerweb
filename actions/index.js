module.exports = (api) => {
    api.actions = {
      users: require('./users')(api),
      websites: require('./websites')(api),
      ads: require('./ads')(api),
      applications: require('./applications')(api)
    };
};
