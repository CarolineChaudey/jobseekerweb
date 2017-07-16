
module.exports = (api) => {
const Ad = api.models.Ad;
const Seeker = api.models.Seeker;
const Application = api.models.Application;

  function create(req, res, next) {
    let application;
    Application.create({seekerId: req.body.user.id, adId: req.body.adId})
    .then(app => {
      return res.status(201).send(app);
    });
  }

  function findBySeeker(req, res, next) {
    Seeker.find({attributes: ["id", "supervisorId"],
                where: {id: req.params.seekerId}})
    .then(seeker => {
      if (!seeker) {
        return res.status(400).send('Seeker does not exist.');
      }
      if (seeker.supervisorId !== req.body.user.id) {
        return res.status(400).send('Not authorized for this seeker.');
      }
      return seeker;
    })
    .then((seeker) => {
      return Application.findAll({where: {seekerId: seeker.id},
                          attributes: ["id", "state", "createdAt", "updatedAt", "deletedAt",
                                      "seekerId", "letterId", "resumeId", "adId"],
                          include: [{model: Ad, as: 'ad', paranoid: false}]
                         })
    })
    .then(applications => {
      return res.status(200).send(applications);
    });
  }

  function search(req, res, next) {
    let query = 'select distinct "Application"."id", "state", "Application"."createdAt"'
                + ', "Ad"."id", "Ad"."position", "Company"."name" as companyName '
                + 'from "Application" '
                + 'inner join "Ad" on "Ad"."id" = "Application"."adId" '
                + 'inner join "TagAd" on "Ad"."id" = "TagAd"."AdId" '
                + 'inner join "Tag" on "Tag"."tag" = "TagAd"."TagTag" '
                + 'inner join "ProposedContracts" on "ProposedContracts"."AdId" = "Ad"."id" '
                + 'inner join "ContractType" on "ContractType"."name" = "ProposedContracts"."ContractTypeName" '
                + 'inner join "Company" on "Company"."id" = "Ad"."companyId" '
                + 'where "Application"."deletedAt" is NULL ';
    let data = {};
    if (req.query.state) {
      query = query + 'and "state" = :state ';
      data.state = req.query.state;
    }
    if (req.query.minDate) {
      query = query + 'and "Application"."createdAt" >= :minDate ';
      data.minDate = req.query.minDate;
    }
    if (req.query.maxDate) {
      query = query + 'and "Application"."createdAt" <= :maxDate ';
      data.maxDate = req.query.maxDate;
    }
    if (req.query.tags) {
      query = query + 'and "Tag"."tag" in (:tags) ';
      data.tags = req.query.tags;
    }
    if (req.query.contractTypes) {
      query = query + 'and "ContractType"."name" in (:contractTypes) ';
      data.contractTypes = req.query.contractTypes;
    }
    Seeker.find({where: {token: req.headers['authorization']}})
    .then(seeker => {
      query = query + 'and "seekerId" = :seekerId ';
      data.seekerId = seeker.id;
    })
    .then (() => {
      api.connection.query(query, {replacements: data, type: api.connection.QueryTypes.SELECT})
      .then(applications => {
        return res.status(200).send(applications);
      });
    });
  }

  return {create,
          search,
          findBySeeker}
};
