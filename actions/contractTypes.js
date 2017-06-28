module.exports = (api) => {
  const ContractType = api.models.ContractType;

  function getAllContractTypes(req, res, next) {
    ContractType.findAll()
    .then(contractTypes => {
      return res.status(200).send(contractTypes);
    });
  }

  return {getAllContractTypes};
}
