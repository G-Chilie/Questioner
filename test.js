// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Meetup', () => { // eslint-disable-line no-undef
  describe('GET /api/v1/meetups', () => { // eslint-disable-line no-undef
    it('should return all meetup record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .get('/api/v1/meetups')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.data.should.not.have.lengthOf(0);
          done();
        });
    });
  });

  describe('GET /api/v1/meetups/:id', () => { // eslint-disable-line no-undef
    it('should get a single meetup record', (done) => { // eslint-disable-line no-undef
      const id = 1;
      chai.request(app)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });

    it('should return error message for non-existing meetup', (done) => { // eslint-disable-line no-undef
      const id = 10000;
      chai.request(app)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('GET /api/v1/meetups/upcoming', () => { // eslint-disable-line no-undef
    it('should get all upcoming meetup record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /api/v1/meetups', () => { // eslint-disable-line no-undef
    const fields = ['title', 'location', 'happeningOn', 'tags', 'images'];
    it('should create a new meetup record', (done) => { // eslint-disable-line no-undef
      const meetup = {
        title: 'ConcatenateConf',
        location: 'Yaba, Lagos',
        happeningOn: 'Wed Dec 26 2018 08:18:30 GMT+0100 (WAT)',
        tags: ['lorem', 'lorem'],
        images: ['images1', 'images2'],
      };
      chai.request(app)
        .post('/api/v1/meetups')
        .send(meetup)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });

    fields.forEach((field) => {
      it(`should return a validation error message if ${field} is undefined`, (done) => { // eslint-disable-line no-undef
        const meetup = {
          title: 'ConcatenateConf',
          location: 'Yaba, Lagos',
          happeningOn: 'Wed Dec 26 2018 08:18:30 GMT+0100 (WAT)',
          tags: ['lorem', 'lorem'],
          images: ['images1', 'images2'],
        };
        meetup[field] = undefined;
        chai.request(app)
          .post('/api/v1/meetups')
          .send(meetup)
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
    });
  });

  describe('POST /api/v1/meetups/:id/rsvps', () => { // eslint-disable-line no-undef
    it('should create a new rsvp record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });
  });
});

describe('Question', () => { // eslint-disable-line no-undef
  describe('POST /api/v1/questions', () => { // eslint-disable-line no-undef
    const fields = ['createdBy', 'meetup', 'title', 'body'];
    it('should create a new question record', (done) => { // eslint-disable-line no-undef
      const question = {
        createdBy: 1,
        meetup: 1,
        title: 'Test Question',
        body: 'Test question body',
      };
      chai.request(app)
        .post('/api/v1/questions')
        .send(question)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });

    fields.forEach((field) => {
      it(`should return a validation error message if ${field} is undefined`, (done) => { // eslint-disable-line no-undef
        const question = {
          createdBy: 1,
          meetup: 1,
          title: 'Test Question',
          body: 'Test question body',
        };
        question[field] = undefined;
        chai.request(app)
          .post('/api/v1/questions')
          .send(question)
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
    });
  });

  describe('PATCH /api/v1/questions/:id/upvote', () => { // eslint-disable-line no-undef
    it('should upvote a question record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .patch('/api/v1/questions/2/upvote')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });
  });

  describe('PATCH /api/v1/questions/:id/upvote', () => { // eslint-disable-line no-undef
    it('should upvote a question record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .patch('/api/v1/questions/2/upvote')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });
  });

  describe('PATCH /api/v1/questions/:id/downvote', () => { // eslint-disable-line no-undef
    it('should downvote a question record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .patch('/api/v1/questions/2/downvote')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });
  });
});
