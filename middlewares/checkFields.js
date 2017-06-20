
module.exports = (fields) => {

    return (req, res, next) => {
      if (!req.body) {
        return res.status(400).send('missing.fields');
      }

      for (let i = 0; i < fields.length; i++) {
        if (!req.body[fields[i]] || (req.body[fields[i]] === '')) {
          let message = 'missing field ' + fields[i];
          return res.status(400).send(message);
        }
      }

      next();
    };

};
