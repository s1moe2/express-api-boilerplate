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
  User: {
    findByPk: () => {
      return Promise.resolve(returnObj)
    },

    findOne: () => {
      return Promise.resolve(returnObj)
    },

    create: () => {
      return Promise.resolve(returnObj)
    },
  },
}

const repo = requireRoot('/src/data/repositories/users-repository')(fakeORM)

describe('Users unit tests', () => {
  it('find a user by id', async () => {
    const usersPromise = repo.findByID(1)
    await expect(usersPromise).to.be.fulfilled
    await expect(usersPromise).to.eventually.deep.equal(returnObj)
  })

  it('find a user by email', async () => {
    const usersPromise = repo.findByEmail('email@email.com')
    await expect(usersPromise).to.be.fulfilled
    await expect(usersPromise).to.eventually.deep.equal(returnObj)
  })

  it('find a user by confirm token', async () => {
    const usersPromise = repo.findByConfirmationToken('asdjfkhgasdkjhfga')
    await expect(usersPromise).to.be.fulfilled
    await expect(usersPromise).to.eventually.deep.equal(returnObj)
  })

  it('find a user by recovery token', async () => {
    const usersPromise = repo.findByRecoveryToken('asdjfkhgasdkjhfga')
    await expect(usersPromise).to.be.fulfilled
    await expect(usersPromise).to.eventually.deep.equal(returnObj)
  })

  it('fails to create an existing user', async () => {
    const usersPromise = repo.createUser({
      email: 'someemail@bla.foo',
    })
    await expect(usersPromise).to.be.rejected
  })

  it('create a new user', async () => {
    fakeORM.User.findOne = () => {
      return Promise.resolve()
    }

    const usersPromise = repo.createUser({
      email: 'someemail@bla.foo',
    })
    await expect(usersPromise).to.be.fulfilled
    await expect(usersPromise).to.eventually.deep.equal(returnObj)
  })
})
