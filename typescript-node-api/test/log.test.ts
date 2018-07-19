import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('logs', () => {

    it.only('should get logs', () => {
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
                        expect(res.body).to.have.length(1);
                    })
            });
    });

    it('should clear logs', () => {
        return chai.request(app).post('/service1').send(' this is request_1 data')
            .then(res => {
                return chai.request(app).del('/api/v1/admin/services/service1/processedrequests')
                    .then(res => {
                        return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
                            .then(res => {
                                expect(res.status).to.equal(200);
                                expect(res).to.be.json;

                                expect(res.body).to.be.an('array');
                                expect(res.body).to.have.length(0);
                            })

                    })
            });
    });

});