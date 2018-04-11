/* global api, describe, it, expect, beforeEach */

const Playlist = require('../../../models/playlist');
const User = require('../../../models/user');

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

let playlist;

describe('GET /playlist/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Playlist.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => playlistData.forEach(playlist => playlist.owner = user))
      .then(() => Playlist.create(playlistData))
      .then(playlists => playlist = playlists[0])
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/playlists/${playlist._id}`)
      .expect(200, done);
  });

  it('should return a playlist', done => {
    api
      .get(`/api/playlists/${playlist._id}`)
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
      .get(`/api/playlists/${playlist._id}`)
      .end((err, res) => {
        expect(res.body.title).to.eq(playlistData[0].title);
        expect(res.body.description).to.eq(playlistData[0].description);
        // expect(res.body.owner).to.deep.eq(playlistData.owner);
        // expect(res.body.chosenSongs).to.deep.eq(playlistData.chosenSongs);
        expect(res.body.public).to.eq(playlistData[0].public);
        done();
      });
  });
});
