import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST services', () => {

  it('responds with service1-request1', () => {
    return chai.request(app).post('/service1').send(' this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect('<xml>service1_response_1</xml>').equal(res['text'])
      });
  });

  it('responds with service1-request2', () => {
    return chai.request(app).post('/service1').send(' this is request_2 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect('<xml>service1_response_2</xml>').equal(res['text'])
      });
  });

  it('responds with service1-request99 with 404', () => {
    return chai.request(app).post('/service1').send('request_99')
      .then(res => {
      })
      .catch(err => {
        expect(404).to.equal(err.status);
      })
  });

  it('responds with service2 service', () => {
    return chai.request(app).post('/service2').send('this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect('<xml>service2_response_1</xml>').equal(res['text'])
      });
  });

  it('responds with service2 service with multiple matches', () => {
    return chai.request(app).post('/service2').send('this is request_1 with input1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect('<xml>service2_response_1_with_input1</xml>').equal(res['text'])
      });
  });

});

describe('POST services', () => {

  it.only('service1-request1 should log request', () => {
    return chai.request(app).post('/service1').send(' this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect('<xml>service1_response_1</xml>').equal(res['text'])

        console.log('getting logs.')
        return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
          .then(res => {
            console.log('logs response:.' + res)
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(6);
          })
      });
  });
});