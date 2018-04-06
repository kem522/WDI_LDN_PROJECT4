const rp = require('request-promise');

function videos(req,res,next){
  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=eminemtherealslimshady&key=${process.env.YOUTUBE_API_KEY}`;
  rp({
    url: `${endpoint}`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  videos
};
