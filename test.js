//a simple unit test to for the / route

const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  test('should return 200 and JSON with key "status" and value "hello world"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'Hello World!' });
  })
});