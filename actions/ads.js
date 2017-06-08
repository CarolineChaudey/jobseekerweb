
module.exports = (api) => {
  const Ad = api.models.Ad;
  const Company = api.models.Company;

  function create(req, res, next) {
    Company.findOrCreate({
      where: {name: req.body.company},
      defaults: {name: req.body.company}
    })
    .spread((company, created) => {
      Ad.create(req.body)
      .then((ad) => {
        if (!ad) {
          return res.status(500).send('Couldn\'t save ad.');
        }
        ad.setCompany(company);
        return res.status(200).send(ad);
      });
    });
  };

  return {create};
}
