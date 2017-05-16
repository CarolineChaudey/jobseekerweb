const sha1 = require('sha1');

module.exports = (api) => {

  function create(req, res, next) {
    return res.status(200).send('creation');
  };

  return {create};

};
