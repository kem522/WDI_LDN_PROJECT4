const router = require('express').Router();
const wiki = require('../controllers/wikipedia');
const youtube = require('../controllers/youtube');

router.get('/wiki', wiki.article);
router.get('/youtube', youtube.videos);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
