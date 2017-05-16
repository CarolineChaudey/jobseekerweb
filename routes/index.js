
module.exports = (api) => {
    api.use('/users', require('./users')(api));
};
