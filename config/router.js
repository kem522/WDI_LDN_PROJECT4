const router = require('express').Router();
const wiki = require('../controllers/wikipedia');
const youtube = require('../controllers/youtube');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const playlists = require('../controllers/playlists');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');

//API routes
router.get('/wiki', wiki.show);
router.get('/youtube', youtube.videos);
router.post('/youtubeplaylists', secureRoute, youtube.playlists);

//Auth routes
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/google', oauth.google);

//Users routes
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

//Playlists routes
router.route('/playlists')
  .get(playlists.index)
  .post(secureRoute, playlists.create);

router.route('/playlists/:id')
  .get(playlists.show)
  .put(secureRoute, playlists.update)
  .delete(secureRoute, playlists.delete);

router.route('/playlists/:id/followers')
  .post(playlists.followersCreate);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
