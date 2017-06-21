
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

  return {
    create}
};
