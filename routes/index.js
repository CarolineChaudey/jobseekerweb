
module.exports = (api) => {
    api.use('/users', require('./users')(api));
    api.use('/websites', require('./websites')(api));
    api.use('/ads', require('./ads')(api));
    api.use('/applications', require('./applications')(api));
    api.use('/contractTypes', require('./contractTypes')(api));
    api.use('/stats', require('./stats')(api));
};
