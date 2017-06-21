const router = require('express').Router();

module.exports = (api) => {

  router.post('/',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkUser(api.models.Seeker),
              api.middlewares.checkFields(['adId']),
              api.actions.applications.create);

  return router;
};
