const express = require('express');
const { loadDbNews, getNewsByCategory, postNews } = require('../controllers/newsController');

const router = express.Router();

router.get('/', loadDbNews)
router.post('/', postNews);
router.get('/category/:category', getNewsByCategory)

module.exports = router;
