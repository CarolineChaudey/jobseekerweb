
module.exports = (api) => {
  const Ad = api.models.Ad;

  function create(req, res, next) {
    Ad.create(req.body)
    .then((ad) => {
      if (!ad) {
        return res.status(500).send('Couldn\'t save ad.');
      }
      return res.status(200).send(ad);
    })
  };

  return {create};
}
