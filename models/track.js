const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  artist: { type: String },
  title: { type: String },
  year: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('Track', trackSchema);
