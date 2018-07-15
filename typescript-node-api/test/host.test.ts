import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST hosts', () => {

  it('responds with datasafe hosts', () => {
    return chai.request(app).post('/datasafe')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('datasafe here')
      });
  });

  it('responds with xp2 hosts', () => {
    return chai.request(app).post('/xp2')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res["text"]).equal('xp2 here')
      });
  });

});

