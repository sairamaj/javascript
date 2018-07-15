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

  it('should include host1', () => {
    return chai.request(app).get('/api/v1/admin/hosts')
      .then(res => {
        let host1 = res.body.find(host => host.name === 'host1');
        expect(host1).to.exist;
      });
  });

});

describe('GET api/v1/admin/hosts/:name', () => {

  it('responds with single JSON object', () => {
    return chai.request(app).get('/api/v1/admin/hosts/host1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should return host1', () => {
    return chai.request(app).get('/api/v1/admin/hosts/host1')
      .then(res => {
        expect(res.body.host.name).to.equal('host1');
      });
  });

  it('should return 404 for not available host', () => {
    return chai.request(app).get('/api/v1/admin/hosts/na')
      .then(res => {
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });

});
