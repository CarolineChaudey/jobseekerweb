const router = require('express').Router();

module.exports = (api) => {

  router.post('/',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkSupervisor,
              api.middlewares.checkFields(['position', 'publicationDate']));

  return router;
};
