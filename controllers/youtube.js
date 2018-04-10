const rp = require('request-promise');

function getSingleVideo(song){
  const searchTerm = `${song.artist.replace(/\s+/g, '')}${song.title.replace(/\s+/g, '')}`;
  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${process.env.YOUTUBE_API_KEY}`;
  return rp({
    url: `${endpoint}`,
    json: true
  })
    .then(res => {
      if (res.items[0]) {
        return res.items[0].id.videoId;
      } else {
        return '';
      }
    });
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
  return rp({
    method: 'POST',
    url: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',
    qs: {
      access_token: req.currentUser.token
    },
    json: true
  })
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(next);
}

module.exports = {
  videos,
  playlists
};
