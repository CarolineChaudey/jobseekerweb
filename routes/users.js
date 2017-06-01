const router = require('express').Router();

module.exports = (api) => {
/*
  router.get('/',
  api.actions.users.findAll);

  router.get('/:id',
  api.actions.users.findOne);
*/
  router.post('/',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkFields(['firstname', 'lastname', 'login', 'pswd', 'email']),
              api.actions.users.create);

  router.post('/seeker-auth',
              api.middlewares.bodyParser.json(),
              api.middlewares.checkFields(['login', 'pswd']),
              api.actions.users.connectSeeker);

  router.put('/:id/favoriteWebsites',
             api.middlewares.bodyParser.json(),
             api.actions.users.setFavoriteWebsites);

  router.put('/:id/favoriteContractTypes',
             api.middlewares.bodyParser.json(),
             api.actions.users.setContractTypes);

  router.put('/:id/favoriteTags',
             api.middlewares.bodyParser.json(),
             api.actions.users.setTags);

  router.put('/:id',
             api.middlewares.bodyParser.json(),
             api.actions.users.update);

/*
  router.delete('/:id',
  api.actions.users.remove);
*/

  return router;
}
