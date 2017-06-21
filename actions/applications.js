
module.exports = (api) => {

  function create(req, res, next) {
    return res.status(200).send('Bien reçu !');
  }

  return {
    create
  }
};
