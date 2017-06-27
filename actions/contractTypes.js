module.exports = (api) => {
  const Website = api.models.Website;

  function getAllContractTypes(req, res, next) {
    Website.findAll()
    .then(websites => {
      return res.status(200).send(websites);
    });
  }

  return {getAllContractTypes};
}
