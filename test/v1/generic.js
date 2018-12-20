const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../../src/app')

chai.use(chaiHttp)

describe('Generic tests', () => {
  it('should return 404', (done) => {
    chai.request(app)
      .get('/doesntexist')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
  })

  it('should return 404', (done) => {
    chai.request(app)
      .get('/v1/doesntexist')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
  })

  it('should return 200', (done) => {
    chai.request(app)
      .get('/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.empty
        done()
      })
  })
})
