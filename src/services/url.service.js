const shortid = require('shortid');
const UrlModel = require('../models/url.model');
const config = require('../config');

class UrlService {
  async createShortUrl(originalUrl) {
    const existingUrl = await UrlModel.findOne({ originalUrl });
    if (existingUrl) return existingUrl;

    const shortId = shortid.generate();
    const url = new UrlModel({
      originalUrl,
      shortId
    });

    return url.save();
  }

  async getUrlByShortId(shortId) {
    return UrlModel.findOne({ shortId });
  }

  async incrementClicks(urlId) {
    return UrlModel.findByIdAndUpdate(
      urlId,
      { $inc: { clicks: 1 } },
      { new: true }
    );
  }

  async getAllUrls(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return UrlModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }
}

module.exports = new UrlService();
