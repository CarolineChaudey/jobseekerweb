const jwt = require('jsonwebtoken');

module.exports = (api) => {

  return (userType) => {
    return (req, res, next) => {
      let authorization = req.headers['authorization'];
      if (!authorization) {
        return res.status(401).send('unauthorized: token required');
      }
      jwt.verify(
        authorization,
        api.settings.salt,
        (err, decryptedToken) => { // est-ce qu'il est valide ?
          if (err) {
            console.log(req.headers['authorization']);
            return res.status(400).send('Invalid token.');
          }
          userType.findOne({where: {token: authorization}}) // qui est son user ?
          .then((user) => {
            if (!user) {
              return res.status(400).send('No ' + userType + ' for this token.');
            }
            if (!req.body) {
              req.body = {};
            }
            req.body.user = user;
            next();
          });
     });
    }
  }
};
