const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/server');
const UrlModel = require('../src/models/url.model');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('URL Shortener API', () => {
  beforeEach(async () => {
    await UrlModel.deleteMany({});
  });

  it('should create a short URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({
        originalUrl: 'https://example.com'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('shortUrl');
  });
});
