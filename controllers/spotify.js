const rp = require('request-promise');
const Promise = require('bluebird');

function playlists(req,res,next){
  return rp({
    method: 'POST',
    url: `https://api.spotify.com/v1/users/${req.currentUser.spotifyId}/playlists`,
    form: JSON.stringify(req.body.playlist),
    json: true,
    headers: {
      'Authorization': `Bearer ${req.currentUser.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(next);
}

module.exports = {
  playlists
};
