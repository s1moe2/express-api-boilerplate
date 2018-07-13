process.env.NODE_ENV = 'test';

const app = require('../app');
const orm  = require('../core/domain-model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Developer hiring tests', () => {

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
});