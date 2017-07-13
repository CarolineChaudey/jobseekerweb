const router = require('express').Router();

module.exports = (api) => {
/*
  router.get('/',
  api.actions.users.findAll);

  router.get('/:id',
  api.actions.users.findOne);
*/
  router.post('/seeker-signin',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkFields(['firstname', 'lastname', 'login', 'pswd', 'email']),
              api.actions.users.create(api.models.Seeker));

  router.post('/supervisor-signin',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkFields(['firstname', 'lastname', 'login', 'pswd', 'email']),
              api.actions.users.create(api.models.Supervisor));

  router.post('/seeker-auth',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkFields(['login', 'pswd']),
              api.actions.users.connect(api.models.Seeker));

  router.post('/supervisor-auth',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkFields(['login', 'pswd']),
              api.actions.users.connect(api.models.Supervisor));

  router.put('/:id/favoriteWebsites',
             api.middlewares.bodyParser.json(),
             api.middlewares.checkRightSeeker,
             api.actions.users.setFavoriteWebsites);

  router.put('/:id/favoriteContractTypes',
             api.middlewares.bodyParser.json(),
             api.middlewares.checkRightSeeker,
             api.actions.users.setContractTypes);

  router.put('/:id/favoriteTags',
             api.middlewares.bodyParser.json(),
             api.middlewares.checkRightSeeker,
             api.actions.users.setTags);

  router.put('/:id',
             api.middlewares.bodyParser.json(),
             api.middlewares.checkRightSeeker,
             api.actions.users.update);

  router.get('/supSeekers',
              api.middlewares.checkUser(api.models.Supervisor),
              api.actions.users.getSupervisorSeekers);
/*
  router.delete('/:id',
  api.actions.users.remove);
*/

  return router;
}
