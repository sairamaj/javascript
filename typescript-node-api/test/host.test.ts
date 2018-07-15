import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST hosts', () => {

  it('responds with host1 hosts', () => {
    return chai.request(app).post('/host1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('host1 here')
      });
  });

  it('responds with host2 hosts', () => {
    return chai.request(app).post('/host2')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('host2 here')
      });
  });

});

