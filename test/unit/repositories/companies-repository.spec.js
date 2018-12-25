const requireRoot = require('app-root-path').require
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect


const fakeORM = {
  Company: {
    findByPk: (id) => {
      return Promise.resolve({
        id,
        name: 'fake',
      })
    },

    findOne: (name) => {
      return Promise.resolve({
        id: 1,
        name,
      })
    },

    findAll: () => {
      return Promise.resolve([
        { id: 1, name: 'fake' },
        { id: 2, name: 'fake2' },
      ])
    },

    create: ({ id, name }) => {
      return Promise.resolve({
        id,
        name,
      })
    },
  },
}

const repo = requireRoot('/src/data/repositories/companies-repository')(fakeORM)

describe('Companies repository tests', () => {
  it('find a company by id', (done) => {
    const companyPromise = repo.findByID(1)
    expect(companyPromise).to.be.fulfilled
    expect(companyPromise).to.eventually.deep.equal({
      id: 1,
      name: 'fake',
    })
    done()
  })
})
