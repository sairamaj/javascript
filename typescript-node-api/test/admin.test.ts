import * as chai from 'chai'
import chaiHttp = require('chai-http')

import app from '../src/App'

chai.use(chaiHttp)
const expect = chai.expect

describe('GET api/v1/admin/services', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/admin/services')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length(6)
      })
  })

  it('should include service1', () => {
    return chai.request(app).get('/api/v1/admin/services')
      .then(res => {
        console.log(res.body)
        let serivce1 = res.body.find(service => service.name === 'service1')
        expect(serivce1).to.exist
      })
  })

})

describe('GET api/v1/admin/services/:name', () => {

  it('responds with single JSON object', () => {
    return chai.request(app).get('/api/v1/admin/services/service1')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('object')
      })
  })

  it('should return service1', () => {
    return chai.request(app).get('/api/v1/admin/services/service1')
      .then(res => {
        expect(res.body.name).to.equal('service1');
      })
  })

  it('should return 404 for not available service', () => {
    return chai.request(app).get('/api/v1/admin/services/na')
      .catch(err => {
        expect(err.status).to.equal(404)
      })
  })
})
