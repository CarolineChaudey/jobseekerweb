const router = require('express').Router();

module.exports = (api) => {

  router.get('/getAdFlow/:tag',
             api.middlewares.checkUser(api.models.Supervisor),
             api.actions.stats.getAdFlow);

  return router;
};
