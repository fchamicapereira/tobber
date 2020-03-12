const mocha = require('mocha');
const expect = require('chai').expect;
const base = require('./base');
const server = base.server;

beforeEach(async function() {
	await base.tearDown();
});

describe('/login', function() {

	it('success', async function() {
		const user = await base.user();

		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				name: user.name,
				pass: base.pass
			}
		});

		expect(res.statusCode).to.equal(200);
		expect(res.result).to.be.an('object');
		expect(res.result.name).to.equal(user.name);
		expect(res.result.pass).to.equal(user.pass);
	});

	it('wrong pass', async function() {
		const user = await base.user();

		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				name: user.name,
				pass: 'wrong pass'
			}
		});

		expect(res.statusCode).to.equal(401);
	});

	it('no pass', async function() {
		const user = await base.user();

		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				name: user.name
			}
		});

		expect(res.statusCode).to.equal(400);
	});

	it('empty pass', async function() {
		const user = await base.user();

		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				name: user.name,
				pass: ''
			}
		});

		expect(res.statusCode).to.equal(400);
	});

	it('pass too big', async function() {
		const user = await base.user();

		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				name: user.name,
				pass: 'a' * 31
			}
		});

		expect(res.statusCode).to.equal(400);
	});

	it('no username', async function() {

		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				pass: base.pass
			}
		});

		expect(res.statusCode).to.equal(400);
	});

	it('empty username', async function() {

		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				name: '',
				pass: base.pass
			}
		});

		expect(res.statusCode).to.equal(400);
	});

	it('user not registered', async function() {
		const res = await server.inject({
			url: '/login',
			method: 'PUT',
			payload: {
				name: 'somerandomuser',
				pass: base.pass
			}
		});

		expect(res.statusCode).to.equal(401);
	});

});