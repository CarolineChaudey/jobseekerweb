const sha1 = require('sha1');

module.exports = (api) => {
  const Seeker = api.models.Seeker;

  function create(req, res, next) {
    Seeker.findOrCreate({
      where: {login: req.body.login},
      defaults: req.body
    })
    .spread((seeker, created) => {
      if (!created) {
        return res.status(409).send('already taken');
      }
      return res.status(200).send(seeker);
    });
  };

  return {create};

};
