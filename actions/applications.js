
module.exports = (api) => {
const Ad = api.models.Ad;
const Seeker = api.models.Seeker;
const Application = api.models.Application;

  function create(req, res, next) {
    let application;
    //let ad;
    Application.create()
    .then(createdApplication => {
      if (!createdApplication) {
        return res.status(500).send('Application creation failed.');
      }
      application = createdApplication;
    })
    .then(() => {
        return Seeker.find({where: {token: req.headers['authorization']}})
    })
    .then(seeker => {
      if (!seeker) {
        return res.status(404).send('User not found.');
      }
      application.setSeeker(seeker);
    })
    .then(() => {
      return Ad.find({attributes: ['id', 'position', 'description'], where: {id: req.body.adId}});
    })
    .then(ad => {
      if (!ad) {
        return res.status(404).send('Ad not found.');
      }
      application.setAd(ad);
    })
    .then(() => {
      return res.status(201).send(application);
    });
  }

  function search(req, res, next) {
    let query = 'select * '
                + 'from "Application" '
                + 'where "deletedAt" is NULL ';
    let data = {};
    if (req.query.state) {
      query = query + 'and "state" = :state ';
      data.state = req.query.state;
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
          search}
};
