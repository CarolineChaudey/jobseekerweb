const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
  const Seeker = api.models.Seeker;
  const Tag = api.models.Tag;

  function create(req, res, next) {
    req.body.pswd = sha1(req.body.pswd);
    Seeker.findOrCreate({
      where: {login: req.body.login},
      defaults: req.body
    })
    .spread((seeker, created) => {
      if (!created) {
        return res.status(409).send('login taken');
      }
      return res.status(200).send(seeker);
    });
  }

  function connectSeeker(req, res, next) {
    // trouver Seeker
    let seeker = Seeker.findOne(
      {where : {login: req.body.login,
                pswd: sha1(req.body.pswd)}}
    ).then((seeker) => {
      if (!seeker) {
        return res.status(404).send('Wrong login and/or password');
      }
      sendToken(seeker, res);
    });
  }

  function update(req, res, next) {
    Seeker.update(req.body,
                  {where: {id: req.params.id}})
    .then((result) => {
      if (result[0] != 1) {
        return res.status(400).send('update failed.');
      }
      return res.status(200).send('Update succeeded.');
    });
  }

  function setFavoriteWebsites(req, res, next) {
    Seeker.findById(req.params.id)
    .then((seeker) => {
      if (null == seeker) {
        return res.status(400).send('No seeker for given id.');
      }
      seeker.setWebsites(req.body.websites)
      .then((result) => {
        return res.status(200).send('Favorite websites saved.');
      });
    });
  }

  function setContractTypes(req, res, next) {
    Seeker.findById(req.params.id)
    .then((seeker) => {
      if (null == seeker) {
        return res.status(400).send('No seeker for given id.');
      }
      seeker.setContractTypes(req.body.contractTypes)
      .then((result) => {
        return res.status(200).send('Favorite contract types saved.');
      });
    });
  }

  function getTags() {
    Tag.findAll()
    .then((tags) => {
      return tags;
    });
  }

  function tagExists(tag) {
    let tags = getTags();
    for (oneTag in tags) {
      if (oneTag.tag === tag) {
        return true;
      }
    }
    return false;
  }

  function setTags(req, res, next) {

    Seeker.findById(req.params.id)
    .then((seeker) => {
      if (null == seeker) {
        return res.status(400).send('No seeker for given id.');
      }
      for (let i = 0; i < req.body.tags.length; i++) {
        Tag.findOrCreate({
          where: {tag: req.body.tags[i]},
          defaults: {
            'tag': req.body.tags[i]
          }
        }).spread((tag, created) => {
          if (i == (req.body.tags.length - 1)) {
            seeker.setTags(req.body.tags);
          }
        });
      }
    });
    return res.status(200).send('Favorite tags saved.');
  }

  function sendToken(seeker, res) {
    jwt.sign({ userId: seeker.id },
              api.settings.salt,
              {'expiresIn': api.settings.token_duration},
              function(err, genToken) {
                if (err) {
                  return res.status(500).send('connection failed');
                }
                Seeker.update({token: genToken},
                            {where: {id: seeker.id}}
                ).then(function(result) {
                  if (result[0] != 1) {
                    return res.status(500).send('connection failed');
                  }
                  return res.status(200).send({token: genToken});
                });
    });
  }

  return {create,
          connectSeeker,
          update,
          setFavoriteWebsites,
          setContractTypes,
          setTags};

};
