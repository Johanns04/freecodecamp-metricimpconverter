const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
	this.timeout(50000);
	test("Valid Input 10L:GET /api/convert", (done)=>{
		chai.request(server)
			.get("/api/convert?input=10L")
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				done();
			});
	});
	
	test("Invalid input 32g: GET /api/convert", (done)=>{
		chai.request(server)		
			.get("/api/convert?input=32g")
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isString(res.body);
				assert.equal(res.body, 'invalid unit');
				done();
			})
	});
	
	test("Invalid number 3/7.2/4kg: GET /api/convert", (done)=>{
		chai.request(server)
			.get("/api/convert?input=3/7.2/4kg")
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isString(res.body);
				assert.equal(res.body, 'invalid number');
				done();		
			});
	});

	test("Invalid number 3/7.2/4kilomegagram: GET /api/convert", (done)=>{
		chai.request(server)
			.get("/api/convert?input=3/7.2/4kilomegagram")
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isString(res.body);
				assert.equal(res.body, 'invalid number and unit');
				done();		
			});
	});
	
	test("Valid Input kg:GET /api/convert", (done)=>{
		chai.request(server)
			.get("/api/convert?input=kg")
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				done();
			});
	});
});
