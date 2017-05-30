const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
  const Seeker = api.models.Seeker;

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

  return {create, connectSeeker};

};
