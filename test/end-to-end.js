process.env.NODE_ENV = 'test';

const requireRoot = require('app-root-path').require;
const app = requireRoot('/src/app');
const orm  = requireRoot('/src/core/domain-model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Generic tests', () => {
  it('should return 404', (done) => {
    chai.request(app)
      .get('/doesntexist')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return 404', (done) => {
    chai.request(app)
      .get('/v1/doesntexist')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return 200', (done) => {
    chai.request(app)
      .get('/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.empty;
        done();
      });
  });
});


describe('Companies endpoint tests', () => {

  before(function(done) {
    orm.sequelize.sync({ force: true }).then(() => { done() });
  });

  it('should list 0 companies', (done) => {
    chai.request(app)
      .get('/v1/companies')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.eql([]);
        done();
      });
  });

  it('should add a new company', (done) => {
    chai.request(app)
      .post('/v1/companies')
      .send({ "name": "Multiverse Coders" })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should find the new company', (done) => {
    chai.request(app)
      .get('/v1/companies/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.eql('1');
        done();
      });
  });

  it('should not find a company', (done) => {
    chai.request(app)
      .get('/v1/companies/123')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should reject invalid request', (done) => {
    chai.request(app)
      .get('/v1/companies/abc')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should not create another company with the same name', (done) => {
    chai.request(app)
      .post('/v1/companies')
      .send({ "name": "Multiverse Coders" })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });
});