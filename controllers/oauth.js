const rp = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

let accessToken = null;

function google(req,res,next){
  rp({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    form: {
      code: req.body.code,
      client_id: process.env.YOUTUBE_CLIENT_ID,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    },
    json: true
  })
    .then(response => {
      accessToken = response.access_token;
      return rp({
        method: 'GET',
        url: 'https://www.googleapis.com/plus/v1/people/me',
        qs: response,
        json: true
      });
    })
    .then(profile => {
      return User
        .findOne({ $or: [{ email: profile.emails[0].value }, { googleId: profile.id }] })
        .then(user => {
          if(!user) {
            user = new User({ username: profile.displayName });
          }

          user.email = profile.emails[0].value;
          user.googleId = profile.id;
          user.token = accessToken;
          return user.save();
        });
    })
    .then(user => {
      console.log(user);
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      res.json({
        message: `Welcome back ${user.username}`,
        token,
        user
      });
    })
    .catch(next);
}

module.exports = {
  google
};
