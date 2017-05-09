module.exports = (api) => {
    api.actions = {
      auth: require('./auth')(api),
      sellers: require('./sellers')(api),
      opinions: require('./opinions')(api),
      products: require('./products')(api)
    };
};
