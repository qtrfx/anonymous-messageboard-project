const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const expect = chai.expect;
let mappedArr;
let threadId;
let threadDeletePassword;

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Create a Thread', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .post("/api/threads/testing")
      .type('form')
      .send({text: 'testing text', delete_password: 'test'})
      .end((err, res) => {
        console.log(res)
        assert.equal(res.status, '200')
        expect(res).to.redirectTo(`http://localhost:3001/b/testing/`)
        done();
      
      })
      })
      test('View the 10 most recent threads', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .get("/api/threads/testing")
      .end((err, res) => {
        assert.equal(res.status, '200')
        assert.isAtMost(res.body.length, 10)
        done();
      
      })


      })
      test('View the 10 most recent threads', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .get("/api/threads/testing")
      .end((err, res) => {
        const yepper = res.body.map(e => e.replies.length)
        res.body.forEach(e => assert.isAtMost(e.replies.length, 3))
        assert.equal(res.status, '200')
        done();
      
      })


      })
      test('Delete Thread with incorrect Password', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .delete("/api/threads/testing")
      .end((err, res) => {
        const yepper = res.body.map(e => e.replies.length)
        res.body.forEach(e => assert.isAtMost(e.replies.length, 3))
        assert.equal(res.status, '200')
        done();
      
      })


      })

  

});
