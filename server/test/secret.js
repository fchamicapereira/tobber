const mocha = require('mocha');
const expect = require('chai').expect;
const base = require('./base');
const secret = require('../src/secret/secret');
const server = base.server;

beforeEach(async function() {
	await base.tearDown();
});

describe('/secret', function() {

	it('admin gets secret', async function() {
		const admin = await base.admin();

		const res = await server.inject({
			url: '/secret',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		expect(res.statusCode).to.equal(200);
		expect(res.result.secret).to.equal(secret.get().secret);
		expect(res.result.next).to.equal(secret.get().next);
	});

	it('admin refreshes ticket', async function() {
		const admin = await base.admin();

		const res1 = await server.inject({
			url: '/secret',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		const res2 = await server.inject({
			url: '/secret',
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		const res3 = await server.inject({
			url: '/secret',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		expect(res1.statusCode).to.equal(200);
		expect(res2.statusCode).to.equal(200);
		expect(res3.statusCode).to.equal(200);

		expect(res1.result.secret).to.not.equal(res2.result.secret);
		expect(res1.result.secret).to.not.equal(res3.result.secret);
		expect(res2.result.secret).to.equal(res3.result.secret);
	});

	it('user fails to get ticket', async function() {
		const user = await base.user();

		const res = await server.inject({
			url: '/secret',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		expect(res.statusCode).to.equal(403);
	});

	it('user fails to refresh ticket', async function() {
		const user = await base.user();

		const res = await server.inject({
			url: '/secret',
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		expect(res.statusCode).to.equal(403);
	});

	it('get ticket without giving token', async function() {
		const res = await server.inject({
			url: '/secret',
			method: 'GET',
		});

		expect(res.statusCode).to.equal(401);
	});

	it('refresh ticket without giving token', async function() {
		const res = await server.inject({
			url: '/secret',
			method: 'PUT',
		});

		expect(res.statusCode).to.equal(401);
	});
});