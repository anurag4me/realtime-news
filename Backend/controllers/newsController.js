const News = require("../models/News.js");

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

module.exports = {
  loadDbNews,
  getNewsByCategory,
  postNews,
};
