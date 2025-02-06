const express = require('express');
const { body } = require('express-validator');
const urlController = require('../controllers/url.controller');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/shorten',
  [
    body('originalUrl')
      .isURL()
      .withMessage('Please provide a valid URL')
  ],
  validate,
  urlController.shortenUrl
);

router.get('/urls', urlController.getUrls);
router.get('/:shortId', urlController.redirectToUrl);
router.delete('/:shortId', urlController.deleteUrl);

module.exports = router;
