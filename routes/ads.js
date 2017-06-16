const router = require('express').Router();

module.exports = (api) => {

  router.post('/',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkUser(api.models.Supervisor),
              api.middlewares.checkFields(['position', 'publicationDate', 'contractTypes', 'tags']),
              api.actions.ads.create);

  router.get('/',
             api.middlewares.checkUser(api.models.Seeker),
             api.actions.ads.search);

  return router;
};
