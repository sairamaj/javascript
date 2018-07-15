import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST services', () => {

  it.only('responds with service1-request1', () => {
    return chai.request(app).post('/service1').send(' this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('service1_response_1')
      });
  });

  it('responds with service1-request2', () => {
    return chai.request(app).post('/service1').send(' this is request_2 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('service1_response_2')
      });
  });

  it('responds with service1-request99 with 404', () => {
    return chai.request(app).post('/service1').send('request_99')
      .then(res => {
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      })
  });

  it('responds with service2 service', () => {
    return chai.request(app).post('/service2').send('this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('service2_response_1')
      });
  });

});

