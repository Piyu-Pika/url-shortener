const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./utils/logger');
const urlRoutes = require('./routes/url.routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  logger.info('Connected to MongoDB');
  app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
  });
})
.catch(err => {
  logger.error('MongoDB connection error:', err);
  process.exit(1);
});

module.exports = app;
