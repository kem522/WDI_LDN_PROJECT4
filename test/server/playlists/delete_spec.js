/* global api, describe, it, expect, beforeEach */

const Playlist = require('../../../models/playlist');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const playlistData = [{
  title: 'My Playlist',
  owner: {},
  years: ['1990', '1991', '1992'],
  description: 'This is a test playlist',
  chosenSongs: [{
    artist: 'Sir Mix-A-Lot',
    title: 'Baby Got Back'
  },
  {
    artist: 'Charles and Eddie',
    title: 'Would I Lie To You'
  }],
  public: true
}, {
  title: 'My Playlist2',
  owner: {},
  years: ['2000', '2001'],
  description: 'This is a test playlist',
  chosenSongs: [{
    artist: 'Missy Elliot',
    title: 'Get Ur Freak On'
  },
  {
    artist: 'Destiny\'s Child',
    title: 'Bootylicious'
  }],
  public: false
}];

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

let token;
let playlist;

describe('DELETE /playlists/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Playlist.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        playlistData.forEach(playlist => playlist.owner = user);
      })
      .then(() => Playlist.create(playlistData))
      .then(playlists => {
        playlist = playlists[0];
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .delete(`/api/playlists/${playlist._id}`)
      .expect(401, done);
  });

  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/playlists/${playlist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });

  it('should return no data', done => {
    api
      .delete(`/api/playlists/${playlist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
  });
});
