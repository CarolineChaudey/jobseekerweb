
module.exports = (api) => {
  const Ad = api.models.Ad;
  const Company = api.models.Company;
  const ContractType = api.models.ContractType;

  function create(req, res, next) {
    let contractTypes = [];
    let company;

    // verifier les types de contrats
    verifyContractTypes(req, res)
    .then((verifiedContractTypes) => {
      if (verifiedContractTypes.length === 0) {
        return res.status(400).send('No valid contact types');
      }
      contractTypes = verifiedContractTypes;
    })
    // trouver ou créer l'entreprise concernee
    .then(() => {
      return Company.findOrCreate({
        where: {name: req.body.company},
        defaults: {name: req.body.company}
      }).spread((givenCompany, created) => {
        company = givenCompany;
      });
    })
    // créer l'annonce avec ses relations
    .then((result) => {
      return Ad.create(req.body);
    })
    .then((ad) => {
      return ad.setCompany(company);
    })
    .then((adWithCompany) => {
      console.log(adWithCompany);
      return adWithCompany.setContractTypes(contractTypes);
    })
    .then((result) => {
      return res.status(200).send(result);
    });
 }

 function verifyContractTypes(req, res) {
    let contractTypes = req.body.contractTypes;
    if (contractTypes.length === 0) {
      return res.status(400).send('No contract type.');
    }
    return ContractType.findAll({
      where: {
        name: {
          $in: contractTypes
      }}
    });
  }

  return {create};
}
