import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/admin/hosts', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/admin/hosts')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(6);
      });
  });

  it('should include datasafe', () => {
    return chai.request(app).get('/api/v1/admin/hosts')
      .then(res => {
        let datasafe = res.body.find(host => host.name === 'datasafe');
        expect(datasafe).to.exist;
      });
  });

});

describe('GET api/v1/admin/hosts/:name', () => {

  it('responds with single JSON object', () => {
    return chai.request(app).get('/api/v1/admin/hosts/datasafe')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should return datasafe', () => {
    return chai.request(app).get('/api/v1/admin/hosts/datasafe')
      .then(res => {
        expect(res.body.host.name).to.equal('datasafe');
      });
  });

});
