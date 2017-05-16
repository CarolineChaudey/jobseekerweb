module.exports = (api) => {
    api.middlewares = {
        bodyParser: require('body-parser'),
        checkFields: require('./checkFields')
    };
};
