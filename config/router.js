const router = require('express').Router();
const wiki = require('../controllers/wikipedia');
const youtube = require('../controllers/youtube');
const auth = require('../controllers/auth');
const users = require('../controllers/users');

router.get('/wiki', wiki.article);
router.get('/youtube', youtube.videos);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
