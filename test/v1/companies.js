const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../../src/app')

chai.use(chaiHttp)

describe('Companies endpoint tests', () => {
  let token = ''

  before(function (done) {
    chai.request(app)
      .post('/v1/auth/signin')
      .send({
        email: 'rick@sanchez.xx',
        password: 'morty',
      })
      .then((res) => {
        token = res.body.token
        done()
      })
  })

  it('should list 0 companies', (done) => {
    chai.request(app)
      .get('/v1/companies')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.eql([])
        done()
      })
  })

  it('should add a new company', (done) => {
    console.log(token)
    chai.request(app)
      .post('/v1/companies')
      .set('Authorization', token)
      .send({ 'name': 'Multiverse Coders' })
      .end((err, res) => {
        console.error(err)
        expect(res.status).to.equal(201)
        done()
      })
  })

  it('should fail to add a new company', (done) => {
    console.log(token)
    chai.request(app)
      .post('/v1/companies')
      .set('Authorization', token)
      .send({ 'name': 12345 })
      .end((err, res) => {
        console.error(err)
        expect(res.status).to.equal(500)
        done()
      })
  })

  it('should find the new company', (done) => {
    chai.request(app)
      .get('/v1/companies/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.id).to.eql('1')
        done()
      })
  })

  it('should not find a company', (done) => {
    chai.request(app)
      .get('/v1/companies/123')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
  })

  it('should not create another company with the same name', (done) => {
    chai.request(app)
      .post('/v1/companies')
      .set('Authorization', token)
      .send({ 'name': 'Multiverse Coders' })
      .end((err, res) => {
        expect(res.status).to.equal(409)
        done()
      })
  })
})
