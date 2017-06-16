
module.exports = (api) => {
  return (req, res, next) => {
    const Supervisor = api.models.Supervisor;
    const jwt = require('jsonwebtoken');
    let authorization = req.headers['authorization'];

    if (!authorization) {
      return res.status(401).send('unauthorized: token required');
    }
    jwt.verify(authorization,
              api.settings.salt,
              (err, decryptedToken) => { // est-ce qu'il est valide ?
                if (err) {
                  return res.status(400).send('Invalid token.');
                }
                let user = Supervisor.findOne({token: authorization}) // qui est son user ?
                .then((supervisor) => {
                  if (!supervisor) {
                    return res.status(400).send('No supervisor for this token.');
                  }

                  next();
                });
   });
  }
};
