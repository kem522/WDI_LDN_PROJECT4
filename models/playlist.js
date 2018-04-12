const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: 'Title is required.' },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  years: [ { type: String} ],
  description: { type: String },
  chosenSongs: [{
    artist: { type: String },
    title: { type: String },
    year: { type: String }
  }],
  public: { type: Boolean, required: true, default: true },
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Playlist', playlistSchema);
