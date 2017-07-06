
module.exports = (api) => {

  let Application = api.models.Application;

  function getAdFlow(req, res, next) {
    let query = 'select date_trunc(\'day\', "Ad"."createdAt") as day, '
                + 'count("Ad"."id") as "nbAd" '
                + 'from "Ad" '
                + 'inner join "TagAd" on "TagAd"."AdId" = "Ad"."id" '
                + 'where "TagAd"."TagTag" = ' + '\'' + req.params.tag + '\' '
                + 'group by "TagTag", day '
                + 'order by day'

    api.connection.query(query, {type: api.connection.QueryTypes.SELECT})
    .then(results => {
      return res.status(200).send(results);
    });
  }

  function getSentAppFlow(req, res, next) {
    let query = 'select count("Application"."id"), date_trunc(\'day\', "Application"."createdAt") as date '
                + 'from "Application" '
                + 'inner join "Ad" on "Ad"."id" = "Application"."adId" '
                + 'inner join "TagAd" on "TagAd"."AdId" = "Ad"."id" '
                + 'where "Application"."state" != \'CREATED\' '
                + 'and "TagAd"."TagTag" = ' + '\'' + req.params.tag + '\' '
                + 'group by date '
                + 'order by date'
    api.connection.query(query, {type: api.connection.QueryTypes.SELECT})
    .then(results => {
      return res.status(200).send(results);
    });
  }

  return {getAdFlow,
          getSentAppFlow};

};
