/* global api, describe, it, expect, beforeEach */

const Playlist = require('../../../models/playlist');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const playlistData = {
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
};

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

let token;
let newUser;

describe('POST /playlists', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Playlist.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        newUser = user;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .post('/api/playlists')
      .send({...playlistData, owner: newUser })
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({...playlistData, owner: newUser })
      .expect(201, done);
  });

  it('should return the created playlist', done => {
    api
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({...playlistData, owner: newUser })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'title',
          'owner',
          'years',
          'description',
          'chosenSongs',
          'public'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({...playlistData, owner: newUser })
      .end((err, res) => {
        expect(res.body.username).to.eq(playlistData.username);
        expect(res.body.description).to.eq(playlistData.description);
        // expect(res.body.owner).to.deep.eq(playlistData.owner);
        // expect(res.body.chosenSongs).to.deep.eq(playlistData.chosenSongs);
        expect(res.body.public).to.eq(playlistData.public);
        done();
      });
  });
});
