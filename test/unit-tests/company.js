/*process.env.NODE_ENV = 'test';

const requireRoot = require('app-root-path').require;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const getCompanyController  = requireRoot('/core/controllers').companies;


chai.use(chaiHttp);


describe('Company controller tests', () => {

  it('gets all companies', async (done) => {
    const companyList = [{ id: 1, companyName: "ACME Barreiro" }, { id: 2, companyName: "ACME Moita" }];
    const Company = {
      getAll: () => { companyList }
    };

    const companyController = getCompanyController(Company);

    const getAllResult = await companyController.getAll();

    console.log(getAllResult);

    expect(getAllResult).to.have.lengthOf(2);

    done();
  });

});*/