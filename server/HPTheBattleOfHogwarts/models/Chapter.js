// models/Chapter.js
const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: false
  }
});

chapterSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model('Chapter', chapterSchema, "hp_chapters");