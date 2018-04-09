const router = require('express').Router();
const wiki = require('../controllers/wikipedia');
const youtube = require('../controllers/youtube');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const playlists = require('../controllers/playlists');

//API routes
router.get('/wiki', wiki.articles);
router.get('/youtube', youtube.videos);

//Auth routes
router.post('/register', auth.register);
router.post('/login', auth.login);

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
  .post(playlists.create);

router.route('/playlists/:id')
  .get(playlists.show)
  .put(playlists.update)
  .delete(playlists.delete);

router.route('playlists/:id/followers')
  .post(playlists.followersCreate);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
