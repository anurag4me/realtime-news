const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    url: String,
    img: String,
    timestamp: { type: Date, default: Date.now, index: true }, // Index improves sort performance
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
