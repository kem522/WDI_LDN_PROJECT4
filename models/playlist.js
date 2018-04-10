const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  years: [ { type: String} ],
  description: { type: String },
  chosenSongs: [{
    artist: { type: String },
    title: { type: String }
  }],
  public: { type: Boolean },
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Playlist', playlistSchema);
