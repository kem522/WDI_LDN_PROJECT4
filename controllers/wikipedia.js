const rp = require('request-promise');

function article(req,res,next){
  const year = req.query.year;
  const endpoint ='https://en.wikipedia.org/wiki';
  rp({
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

          const song = td[0].match(/<a .*>/) ? td[0].match(/<a .*>(.*)<\/a>/)[1] : td[0].match(/<td>(.*)<\/td>/)[1];
          const artist = td[1].match(/<a .*>/) ? td[1].match(/<a .*>(.*)<\/a>/)[1] : td[1].match(/<td>(.*)<\/td>/)[1];

          return { song, artist };
        });
    })
    .then(data => res.json(data))
    .catch(next);
}

module.exports = {
  article
};
