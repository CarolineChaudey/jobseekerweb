const router = require('express').Router();

module.exports = (api) => {

  router.post('/',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkFields(['name', 'url']),
              api.actions.websites.create);


  return router;
};
