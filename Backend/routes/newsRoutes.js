const express = require('express');
const {
  loadDbNews,
  getNewsByCategory,
  postNews,
  getExternalNews,
  getTrendingNews
} = require('../controllers/newsController');

const router = express.Router();

router.get('/', loadDbNews)
router.post('/', postNews);
router.get('/category/:category', getNewsByCategory)
router.get('/external-news', getExternalNews);
router.get('/trending-news', getTrendingNews);

module.exports = router;
