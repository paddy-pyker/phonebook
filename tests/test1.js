//a simple unit test for the main route '/'
const request = require('supertest');
const app = require('../server');


describe('GET /', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, { status: 'hello world' }, done);
  });
}
);
