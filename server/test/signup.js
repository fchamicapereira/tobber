const mocha = require('mocha');
const expect = require('chai').expect;
const base = require('./base');
const secret = require('../src/secret/secret');
const server = base.server;

const NAME = 'myName';
const PASS = 'mySuperSecretPass';

function request(payload) {
	return {
		url: '/signup',
		method: 'POST',
		payload: payload
	};
}

beforeEach(async function() {
	await base.tearDown();
});

describe('/signup', function() {

	it('success', async function() {
		const res = await server.inject(request({
			name: NAME,
			pass: PASS,
			secret: secret.get()
		}));

		const user = res.result;

		expect(res.statusCode).to.equal(200);
		expect(user).to.be.an('object');
		expect(user.name).to.equal(NAME);
		expect(user.token).to.be.a('string');
	});

	it('conflict username', async function() {
		await server.inject({
			url: '/signup',
			method: 'POST',
			payload: {
				name: NAME,
				pass: PASS,
				secret: secret.get()
			}
		});

		const res = await server.inject(request({
			name: NAME,
			pass: PASS,
			secret: secret.get()
		}));

		expect(res.statusCode).to.equal(409);
	});

	it('wrong secret', async function() {
		const res = await server.inject(request({
			name: NAME,
			pass: PASS,
			secret: '123'
		}));

		expect(res.statusCode).to.equal(401);
	});

	it('no secret', async function() {
		const res = await server.inject(request({
			name: NAME,
			pass: PASS
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('no username', async function() {
		const res = await server.inject(request({
			pass: PASS,
			secret: secret.get()
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('no pass', async function() {
		const res = await server.inject(request({
			name: NAME,
			secret: secret.get()
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('small pass', async function() {
		const res = await server.inject(request({
			name: NAME,
			pass: '1' * 7,
			secret: await secret.get()
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('empty username', async function() {
		const res = await server.inject(request({
			name: '',
			pass: '1' * 7,
			secret: await secret.get()
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('empty pass', async function() {
		const res = await server.inject(request({
			name: NAME,
			pass: '',
			secret: await secret.get()
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('pass too big', async function() {
		const res = await server.inject(request({
			name: NAME,
			pass: '1' * 31,
			secret: await secret.get()
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('username too big', async function() {
		const res = await server.inject(request({
			name: 'a' * 21,
			pass: PASS,
			secret: await secret.get()
		}));

		expect(res.statusCode).to.equal(400);
	});

	it('secret too big', async function() {
		const res = await server.inject(request({
			name: NAME,
			pass: PASS,
			secret: 'a' * 31
		}));

		expect(res.statusCode).to.equal(400);
	});
});