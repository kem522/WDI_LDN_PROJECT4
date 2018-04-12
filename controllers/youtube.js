const rp = require('request-promise');
const Promise = require('bluebird');

function getSingleVideo(song){
  const searchTerm = `${song.artist.replace(/\s+/g, '')}${song.title.replace(/\s+/g, '')}`;
  const endpoint = 'https://www.googleapis.com/youtube/v3/search';
  return rp({
    url: `${endpoint}`,
    qs: {
      part: 'snippet',
      q: searchTerm,
      key: process.env.YOUTUBE_API_KEY
    },
    json: true
  })
    .then(res => res.items[0] ? res.items[0].id.videoId : null);
}

function videos(req,res,next){
  const promises = req.query.songs.map(song => getSingleVideo(JSON.parse(song)));
  Promise.all(promises)
  // map over req.query.years to create an array of promises with getSingleYear...
  // use Promise.all to resolve all the promises
    .then(data => {
      res.json(data);
    })
    .catch(next);
}
//

function playlists(req,res,next){
  let currentVideoIndex = 0;

  function insertVideosRecursive(data, token) {
    return new Promise(resolve => {
      if(currentVideoIndex === req.body.videoIds.length) return resolve();
      return addVideo(req.body.videoIds[currentVideoIndex], data, token)
        .then(() => {
          currentVideoIndex++;
          return insertVideosRecursive(data, token);
        });
    });
  }

  return rp({
    method: 'POST',
    url: 'https://www.googleapis.com/youtube/v3/playlists',
    qs: {
      access_token: req.currentUser.token,
      part: 'snippet',
      mine: true
    },
    body: req.body,
    json: true
  })
    .then(data => {
      res.json(data);
      return insertVideosRecursive(data, req.currentUser.token);
    })
    .catch(next);
}

function addVideo(video, data, token){
  const body = {
    snippet: {
      playlistId: data.id,
      resourceId: {
        kind: 'youtube#video',
        videoId: video
      }
    }
  };
  return rp({
    method: 'POST',
    url: 'https://www.googleapis.com/youtube/v3/playlistItems',
    qs: {
      access_token: token,
      part: 'snippet'
    },
    body: body,
    json: true
  });
}

module.exports = {
  videos,
  playlists
};
