const router = require('express').Router();

module.exports = (api) => {

  router.get('/getAdFlow/:tag',
             api.middlewares.checkUser(api.models.Supervisor),
             api.actions.stats.getAdFlow);

  router.get('/getAppFlow/:tag',
              api.middlewares.checkUser(api.models.Supervisor),
              api.actions.stats.getSentAppFlow);

  return router;
};
