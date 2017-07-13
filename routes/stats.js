const router = require('express').Router();

module.exports = (api) => {

  router.get('/getAdFlow/:tag',
             api.middlewares.checkUser(api.models.Supervisor),
             api.actions.stats.getAdFlow);

  router.get('/getAppFlow/:tag',
              api.middlewares.checkUser(api.models.Supervisor),
              api.actions.stats.getSentAppFlow);

  router.get('/getAppGlobalState/:tag',
              api.middlewares.checkUser(api.models.Supervisor),
              api.actions.stats.getAppGlobalState);

  return router;
};
