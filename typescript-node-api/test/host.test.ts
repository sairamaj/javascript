import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST hosts', () => {

  it('responds with host1-request1', () => {
    return chai.request(app).post('/host1').send(' this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('host1_response_1')
      });
  });

  it('responds with host1-request2', () => {
    return chai.request(app).post('/host1').send(' this is request_2 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('host1_response_2')
      });
  });

  it('responds with host1-request99 with 404', () => {
    return chai.request(app).post('/host1').send('request_99')
      .then(res => {
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      })
  });

  it('responds with host2 hosts', () => {
    return chai.request(app).post('/host2').send('this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('host2_response_1')
      });
  });

});

