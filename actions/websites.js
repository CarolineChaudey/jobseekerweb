module.exports = (api) => {
  const Website = api.models.Website;

  function create(req, res, next) {
    Website.findOrCreate({
      where: {$or: [{name: req.body.name}, {url: req.body.url}]},
      defaults: req.body
    })
    .spread((website, created) => {
      if (!created) {
        return res.status(409).send('website already exists');
      }
      return res.status(200).send(website);
    });
  }

  function getAllWebsites(req, res, next) {
    Website.findAll()
    .then(websites => {
      return res.status(200).send(websites);
    });
  }

  return {create,
          getAllWebsites};
}
