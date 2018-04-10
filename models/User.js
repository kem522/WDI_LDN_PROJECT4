const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  birthday: [ { type: String } ],
  password: { type: String },
  googleId: { type: String },
  image: { type: String },
  token: { type: String }
});

userSchema
  .virtual('playlists', {
    ref: 'Playlist',
    localField: '_id',
    foreignField: 'owner'
  });

userSchema
  .virtual('followedPlaylists', {
    ref: 'Playlist',
    localField: '_id',
    foreignField: 'followers'
  });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswords(next) {
  if(!this.password && !this.googleId){
    this.invalidate('password', 'password is required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
