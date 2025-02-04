const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Url', urlSchema);
