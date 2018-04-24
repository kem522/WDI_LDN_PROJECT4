// const rp = require('request-promise');
// const Promise = require('bluebird');
const Track = require('../models/track');

function showRoute(req,res,next){
  const years = req.query.years;
  const promises = years.map(year =>  getTracks(year));
  Promise.all(promises)
    .then(data => {
      res.json(data);
    })
    .catch(next);
}

function getTracks(year) {
  return new Promise((resolve) => {
    Track.find({ year: year })
      .then(res => {
        return resolve(res);
      });
  });
}

module.exports = {
  show: showRoute
};
