
module.exports = (api) => {
    api.use('/auth', require('./auth')(api));
    api.use('/sellers', require('./sellers')(api));
    api.use('/products', require('./products')(api));
    api.use('/opinions', require('./opinions')(api));
};
