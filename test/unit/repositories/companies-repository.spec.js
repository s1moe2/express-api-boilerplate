const requireRoot = require('app-root-path').require
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const returnObj = {
  id: 1,
  name: 'fake',
}

const fakeORM = {
  Company: {
    findByPk: () => {
      return Promise.resolve(returnObj)
    },

    findOne: () => {
      return Promise.resolve(returnObj)
    },

    findAll: () => {
      return Promise.resolve([
        { id: 1, name: 'fake' },
        { id: 2, name: 'fake2' },
      ])
    },

    create: () => {
      return Promise.resolve(returnObj)
    },
  },
}

const repo = requireRoot('/src/data/repositories/companies-repository')(fakeORM)

describe('Companies repository tests', () => {
  it('find a company by id', async () => {
    const companyPromise = repo.findByID(1)
    await expect(companyPromise).to.be.fulfilled
    await expect(companyPromise).to.eventually.deep.equal(returnObj)
  })

  it('find all companies', async () => {
    const companyPromise = repo.getAllCompanies()
    await expect(companyPromise).to.be.fulfilled
    await expect(companyPromise).to.eventually.be.an('array')
    await expect(companyPromise).to.eventually.deep.equal([
      { id: 1, name: 'fake' },
      { id: 2, name: 'fake2' },
    ])
  })

  it('find a company by name', async () => {
    const companyPromise = repo.findByName('acme')
    await expect(companyPromise).to.be.fulfilled
    await expect(companyPromise).to.eventually.deep.equal(returnObj)
  })

  it('fails to create an existing company', async () => {
    const companyPromise = repo.createCompany('fake')
    await expect(companyPromise).to.be.rejected
  })

  it('create a new company', async () => {
    fakeORM.Company.findOne = () => {
      return Promise.resolve()
    }

    const companyPromise = repo.createCompany('acme')
    await expect(companyPromise).to.be.fulfilled
    await expect(companyPromise).to.eventually.deep.equal(returnObj)
  })
})
