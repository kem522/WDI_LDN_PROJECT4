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

describe('GET /playlists', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Playlist.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => playlistData.forEach(playlist => playlist.owner = user))
      .then(() => Playlist.create(playlistData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/playlists')
      .expect(200, done);
  });

  it('should return an array of playlists', done => {
    api
      .get('/api/playlists')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach(playlist => {
          expect(playlist).to.include.keys([
            '_id',
            'title',
            'owner',
            'years',
            'description',
            'chosenSongs',
            'public'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/playlists')
      .end((err, res) => {
        res.body = res.body.sort((a, b) => a.name > b.name);
        res.body.forEach((playlist, i) => {
          expect(playlist.title).to.eq(playlistData[i].title);
          expect(playlist.description).to.eq(playlistData[i].description);
          // expect(res.body.owner).to.deep.eq(playlistData.owner);
          // expect(res.body.chosenSongs).to.deep.eq(playlistData.chosenSongs);
          expect(playlist.public).to.eq(playlistData[i].public);
        });
        done();
      });
  });
});
