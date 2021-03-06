
module.exports = (api) => {
  const Ad = api.models.Ad;
  const Company = api.models.Company;
  const ContractType = api.models.ContractType;
  const Tag = api.models.Tag;
  const Website = api.models.Website;
  const Supervisor = api.models.Supervisor;
  const Promise = require('bluebird');


  function deleteAd(req, res, next) {
    Ad.destroy({where: {id: req.params.id,
                       authorId: req.body.user.id}}) // verifier que c'est l'auteur
    .then(result => {
      if (result !== 1) {
        return res.status(404).send('No active ad.');
      };
      return res.status(200).send();
    });
  }

  function getAllAdsBySupervisor(req, res, next) {
    console.log('In getAllAdsBySupervisor');
    let data = {};
    data.authorId = req.body.user.id;
    let query = 'select "Ad"."id", "position", "publicationDate", "email", "jobDuration", '
                + '"Company"."name" as company, count("Application"."id") as "nbApplications" '
                + 'from "Ad" '
                + 'inner join "Company" on "Company"."id" = "Ad"."companyId" '
                + 'left outer join "Application" on "Application"."adId" = "Ad"."id"'
                + 'where "authorId" = :authorId '
                +' and "Ad"."deletedAt" is null '
                + 'group by "Ad"."id", "Company"."name"';
    api.connection.query(query, {replacements: data, type: api.connection.QueryTypes.SELECT})
    .then(ads => {
      return res.status(200).send(ads);
    });
  }

  function search(req, res, next) {
    let data = {};
    let query =
      'select "Ad"."id", "position", "publicationDate", "email", "urlApplication", "description", "jobDuration" '
      + 'from "Ad" '
      + 'inner join "Website" on "Website"."id" = "Ad"."websiteId" '
      + 'inner join "ProposedContracts" on "ProposedContracts"."AdId" = "Ad"."id" '
      + 'inner join "ContractType" on "ContractType"."name" = "ProposedContracts"."ContractTypeName" '
      + 'inner join "TagAd" on "TagAd"."AdId" = "Ad"."id" '
      + 'inner join "Tag" on "TagAd"."TagTag" = "Tag"."tag" '
      + 'where "Ad"."deletedAt" is NULL ';

    if (req.query.minDate) {
      query = query + 'and "Ad"."publicationDate" >= \'' + req.query.minDate + '\' ';
    }
    if (req.query.maxDate) {
      query = query + 'and "Ad"."publicationDate" <= \'' + req.query.maxDate + '\' ';
    }
    if (req.query.contractTypes) {
      let contractTypes = req.query.contractTypes.split(',');
      query = query + 'and "ContractType"."name" in (:contractTypes) ';
      data.contractTypes = contractTypes;
    }
    if (req.query.websites) {
      let websites = req.query.websites.split(',');
      query = query + 'and "Website"."name" in (:websites) ';
      data.websites = websites;
    }
    if (req.query.tags) {
      let tags = req.query.tags.split(',');
      query = query + 'and "Tag"."tag" in (:tags) ';
      data.tags = tags;
    }
    api.connection.query(query, {replacements: data, type: api.connection.QueryTypes.SELECT})
    .then(ads => {
      return res.status(200).send(ads);
    });
  }

  function create(req, res, next) {
    let contractTypes = [];
    let company;
    let constructedAd;
    let tags = []
    let website;
    console.log(req.body);
    setTags(req)
    .then((returnedTags) => {
      tags = returnedTags;
      return verifyContractTypes(req)
    })
    .then((verifiedContractTypes) => {
      console.log("contracts ok");
      if (verifiedContractTypes.length === 0) {
        return res.status(400).send('No valid contract types');
      }
      contractTypes = verifiedContractTypes;
      console.log("Debut find website.");
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
    .then(result => {
      return constructedAd.setAuthor(req.body.user);
    })
    .then((result) => {
      return res.status(201).send(constructedAd);
    });
 }

 function verifyContractTypes(req) {
   console.log("Debut verifyContractTypes");
    let contractTypes = req.body.contractTypes;
    if (contractTypes.length === 0) {
      return res.status(400).send('No contract type.');
    }
    console.log("Fin verifyContractTypes");
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
          search,
          getAllAdsBySupervisor,
          deleteAd};
}
