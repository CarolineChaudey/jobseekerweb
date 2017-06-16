
module.exports = (api) => {
  const Ad = api.models.Ad;
  const Company = api.models.Company;
  const ContractType = api.models.ContractType;
  const Tag = api.models.Tag;
  const Website = api.models.Website;
  const Promise = require('bluebird');

  function search(req, res, next) {
    let whereCondition = {};
    if (req.query.minDate || req.query.maxDate) {
      whereCondition.publicationDate = {};
    }
    if (req.query.minDate) {
      console.log(req.query.minDate);
      whereCondition.publicationDate.$gte = req.query.minDate;
    }
    if (req.query.maxDate) {
      whereCondition.publicationDate.$lte = req.query.maxDate;
    }
    /*
    if (req.query.contractTypes) {
      whereCondition.contractTypes = {};
      whereCondition.contractTypes.$in = req.query.contractTypes;
    }
    if (req.query.websites) {
      whereCondition.websites = {};
      whereCondition.website.$in = req.query.websites;
    }
    if (req.query.tags) {
      whereCondition.tags = {};
      whereCondition.tags.$in = req.query.tags;
    }
    */
    console.log('condition = ', whereCondition);
    Ad.findAll({where: whereCondition})
    .then((ads) => {
      return res.status(200).send(ads);
    });
  }

  function create(req, res, next) {
    let contractTypes = [];
    let company;
    let constructedAd;
    let tags = []
    let website;

    setTags(req)
    .then((returnedTags) => {
      tags = returnedTags;
      return verifyContractTypes(req)
    })
    .then((verifiedContractTypes) => {
      if (verifiedContractTypes.length === 0) {
        return res.status(400).send('No valid contact types');
      }
      contractTypes = verifiedContractTypes;
      return Website.find({where: {name: req.body.website}});
    })
    .then((returnedWebsite) => {
      website = returnedWebsite;
      return Company.findOrCreate({
        where: {name: req.body.company},
        defaults: {name: req.body.company}
      }).spread((givenCompany, created) => {
        company = givenCompany;
      });
    })
    .then((result) => {
      return Ad.create(req.body);
    })
    .then((ad) => {
      constructedAd = ad;
      return constructedAd.setCompany(company);
    })
    .then((adWithCompany) => {
      if (req.body.website) {
        return constructedAd.setWebsite(website);
      }
    })
    .then((adWithMaybeAWebsite) => {
      return constructedAd.setContractTypes(contractTypes);
    })
    .then((adWithContracts) => {
      return constructedAd.setTags(tags);
    })
    .then((result) => {
      return res.status(200).send(constructedAd);
    });
 }

 function verifyContractTypes(req) {
    let contractTypes = req.body.contractTypes;
    if (contractTypes.length === 0) {
      return res.status(400).send('No contract type.');
    }
    return ContractType.findAll({
      where: {name: {$in: contractTypes}}
    });
  }

  function setTags(req) {
    return new Promise(function(resolve, reject) {
      let tags = [];
      for (let i = 0; i < req.body.tags.length; i++) {
        Tag.findOrCreate({
          where: {tag: req.body.tags[i]},
          defaults: {
            'tag': req.body.tags[i]
          }
        }).spread((tag, created) => {
          tags.push(tag);
          if (i == (req.body.tags.length - 1)) {
            resolve(tags);
          }
        });
      }
    });
  }

  return {create,
          search};
}
