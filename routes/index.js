
module.exports = (api) => {
    api.use('/users', require('./users')(api));
    api.use('/websites', require('./websites')(api));
    api.use('/ads', require('./ads')(api));
    api.use('/applications', require('./applications')(api));
};
