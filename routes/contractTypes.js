const router = require('express').Router();

module.exports = (api) => {

  router.get('/',
              api.actions.contractTypes.getAllContractTypes);

  return router;
};
