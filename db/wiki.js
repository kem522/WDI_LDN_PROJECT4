const rp = require('request-promise');
const Promise = require('bluebird');
const Track = require('../models/track');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const _ = require('lodash');

const years = _.range(2010, 2013, 1);


function getSingleYear(year){
  const endpoint ='https://en.wikipedia.org/wiki';
  return rp({
    url: `${endpoint}/Billboard_Year-End_Hot_100_singles_of_${year}`,
    method: 'GET'
  })
    .then(response => {
      return response
        //returns an array of all the trs, not greedy, whitespace (over the line)
        .match(/<tr>[\S\s]+?<\/tr>/g)
        // map over the array of trs and match everything inside the tds
        .map(tr => tr.match(/<td>.*<\/td>/g))
        //filter out the null responses
        .filter(td => !!td)
        .map(td => {
          if (td.length > 2) return td.slice(1);
          else return td;
        })
        // map over the array of tds and creates objects of the contents of the a tags
        .map(td => {
          const title = td[0].match(/<a .*>/) ? td[0].match(/<a .*>(.*)<\/a>/)[1] : td[0].match(/<td>(.*)<\/td>/)[1];
          const link = 'https://en.wikipedia.org' + td[0].match(/href="(.+?)"/)[1];
          const artist = td[1].match(/<a .*>/) ? (
            td[1]
              .replace(' and ', ', ')
              .replace(' featuring ', ', ')
              .split(', ')
              .map(line => {
                return line.match(/<a .*>(.*)<\/a>/) && line.match(/<a .*>(.*)<\/a>/)[1];
              })
              .filter(match => !!match)
              .join(', ')
          ) : (
            td[1].match(/<td>(.*)<\/td>/)[1]
          );

          return { title, artist, link, year };
        });
    })
    .then(data => {
      return Promise.all(data.map(track => getArtwork(track.link)))
        .then(images => {
          return data.map((track, i) => {
            track.image = images[i];
            return track;
          });
        });
    })
    .then(tracks => Track.create(tracks))
    .then(tracks => console.log(`${tracks[0].year} completed`))
    .catch(err => console.log(err));
}


function getArtwork(link){
  return rp({
    url: link,
    method: 'GET'
  })
    .then(response => {
      return response
        .match(/<img .*>/g)[0]
        .match(/src\s*=\s*"(.+?)"/g)[0]
        .split('"')[1];
    })
    .then(response => {
      return `https:${response}`;
    });
}

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  const promises = years.map(year => getSingleYear(year));
  Promise.all(promises)
    .then(() => mongoose.connection.close());
});
