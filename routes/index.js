
module.exports = (api) => {
    api.use('/users', require('./users')(api));
    api.use('/websites', require('./websites')(api));
};
