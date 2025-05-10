const News = require("../models/News.js");
const axios = require('axios');

const postNews = async (req, res) => {
  try {
    // Validate request body
    if (!req.body.title || !req.body.content || !req.body.category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const news = new News({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category.toLowerCase(), // Ensure consistent casing
      timestamp: new Date(),
    });

    await news.save();

    // Broadcast to all clients subscribed to this category
    // Note: req.io should be attached to the request object via middleware
    if (req.io) {
      req.io.to(news.category).emit("newNews", news);
    } else {
      console.warn("Socket.IO instance not available");
    }

    res.status(201).json(news);
  } catch (err) {
    console.error("Error creating news:", err);
    res.status(500).json({ error: err.message });
  }
};

const getNewsByCategory = async (req, res) => {
  try {
    const news = await News.find({
      category: req.params.category.toLowerCase(),
    })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loadDbNews = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category.toLowerCase();
    }

    const news = await News.find(query).sort({ timestamp: -1 }).limit(50);

    console.log(`Found ${news.length} news items for category ${category}`); // Debug log
    res.json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: err.message });
  }
};

const getExternalNews = async (req, res) => {
  const { category } = req.query;
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category?.toLowerCase(),
        apiKey: process.env.NEWS_API_KEY
      }
    });
    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error('External News Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch external news' });
  }
};

const getTrendingNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        pageSize: 5,
        apiKey: process.env.NEWS_API_KEY
      }
    });
    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error('Trending News Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch trending news' });
  }
};

module.exports = {
  loadDbNews,
  getNewsByCategory,
  postNews,
  getExternalNews,
  getTrendingNews
};