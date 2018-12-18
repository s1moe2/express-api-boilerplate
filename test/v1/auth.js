const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const orm = require('../../src/data/domain-model')
const app = require('../../src/app')

chai.use(chaiHttp)

//process.env.MAILER_ENABLED = false

describe('Authentication endpoint tests', () => {

  before(function(done) {
    orm.sequelize.sync({ force: true }).then(() => { done() })
  })


  it('should signup a new user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send({
        email: 'rick@sanchez.xx',
        password: 'morty',
        confirmPassword: 'morty',
        firstName: 'Rick',
        lastName: 'Sanchez',
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.equal(201)
        expect(res.type).to.equal('application/json')
        done()
      })
  })

  it('should not signup an existing user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send({
        email: 'rick@sanchez.xx',
        password: 'morty',
        confirmPassword: 'morty',
        firstName: 'Rick',
        lastName: 'Sanchez',
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.redirects.length).to.equal(0)
        expect(res.status).to.equal(409)
        expect(res.type).to.equal('application/json')
        done()
      })
  })

  it('should fail to signup because of bad params', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send({
        email: 'rickblablabla',
        password: 'm',
        confirmPassword: 'morty',
        firstName: 'Rick',
        lastName: 'Sanchez',
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.redirects.length).to.equal(0)
        expect(res.status).to.equal(400)
        expect(res.type).to.equal('application/json')
        done()
      })
  })

  it('should fail to signup because of missing params', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send({
        email: 'rick@sanchez.xx',
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.redirects.length).to.equal(0)
        expect(res.status).to.equal(400)
        expect(res.type).to.equal('application/json')
        done()
      })
  })

  it('should login successfully and receive token', (done) => {
    chai.request(app)
      .post('/v1/auth/signin')
      .send({
        email: 'rick@sanchez.xx',
        password: 'morty',
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.redirects.length).to.equal(0)
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.body.token).to.not.be.empty
        done()
      })
  })
})
