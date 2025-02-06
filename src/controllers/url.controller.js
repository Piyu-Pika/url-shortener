const validUrl = require('valid-url');
const urlService = require('../services/url.service');
const logger = require('../utils/logger');
const config = require('../config');

class UrlController {
  async shortenUrl(req, res) {
    try {
      const { originalUrl } = req.body;

      if (!validUrl.isUri(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }

      const url = await urlService.createShortUrl(originalUrl);
      const shortUrl = `${config.baseUrl}/${url.shortId}`;

      res.json({
        originalUrl: url.originalUrl,
        shortUrl,
        shortId: url.shortId,
        clicks: url.clicks
      });
    } catch (error) {
      logger.error('Error in shortenUrl:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async redirectToUrl(req, res) {
    try {
      const { shortId } = req.params;
      const url = await urlService.getUrlByShortId(shortId);

      if (!url) {
        return res.status(404).json({ error: 'URL not found' });
      }

      await urlService.incrementClicks(url._id);
      res.redirect(url.originalUrl);
    } catch (error) {
      logger.error('Error in redirectToUrl:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUrls(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const urls = await urlService.getAllUrls(parseInt(page), parseInt(limit));
      
      const urlsWithShortUrl = urls.map(url => ({
        ...url.toJSON(),
        shortUrl: `${config.baseUrl}/${url.shortId}`
      }));

      res.json(urlsWithShortUrl);
    } catch (error) {
      logger.error('Error in getUrls:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async deleteUrl(req, res) {
    try {
      const { shortId } = req.params;
      const url = await urlService.getUrlByShortId(shortId);

      if (!url) {
        return res.status(404).json({ error: 'URL not found' });
      }

      await urlService.deleteUrl(url._id);
      res.json({ message: 'URL deleted successfully' });
    } catch (error) {
      logger.error('Error in deleteUrl:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UrlController();
