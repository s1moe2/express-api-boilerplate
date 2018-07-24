process.env.NODE_ENV = 'test';

const requireRoot = require('app-root-path').require;
const app = requireRoot('/src/app');
const orm  = requireRoot('/src/data/domain-model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Authentication endpoint tests', () => {

  before(function(done) {
    orm.sequelize.sync({ force: true }).then(() => { done() });
  });


  it('should signup a new user', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        email: 'rick@sanchez.xx',
        password: 'morty',
        firstName: 'Rick',
        lastName: 'Sanchez'
      })
      .end((err, res) => {
        console.log(err);
        expect(err).to.be.null;
        expect(res.redirects.length).to.equal(0);
        expect(res.status).to.equal(201);
        expect(res.type).to.equal('application/json');
        done();
      });
  });

  it('should not signup an existing user', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        email: 'rick@sanchez.xx',
        password: 'morty',
        firstName: 'Rick',
        lastName: 'Sanchez'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.redirects.length).to.equal(0);
        expect(res.status).to.equal(409);
        expect(res.type).to.equal('application/json');
        done();
      });
  });

  it('should fail to signup because of bad params', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        email: 'rickblablabla',
        password: 'morty',
        firstName: 'Rick',
        lastName: 'Sanchez'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.redirects.length).to.equal(0);
        expect(res.status).to.equal(400);
        expect(res.type).to.equal('application/json');
        done();
      });
  });

  it('should fail to signup because of missing params', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        email: 'rick@sanchez.xx',
        firstName: 'Rick',
        lastName: 'Sanchez'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.redirects.length).to.equal(0);
        expect(res.status).to.equal(400);
        expect(res.type).to.equal('application/json');
        done();
      });
  });

  it('should login successfully and receive token', (done) => {
    chai.request(app)
      .post('/signin')
      .send({
        email: 'rick@sanchez.xx',
        password: 'morty'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.redirects.length).to.equal(0);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body.token).to.not.be.empty;
        done();
      });
  });
});