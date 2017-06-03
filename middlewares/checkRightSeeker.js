
module.exports = (api) => {
  return (req, res, next) => {
    const Seeker = api.models.Seeker;
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
                let user = Seeker.findOne({token: authorization}) // qui est son user ?
                .then((seeker) => {
                  if (!seeker) {
                    return res.status(400).send('No user for this token.');
                  }
                  // est-ce bien le user qui veux faire des modifs ?
                  if (seeker.id !== req.params.id) {
                    return res.status(401).send('You can\'t change other users\' settings.');
                  }
                  next();
                });
   });
  }
};
