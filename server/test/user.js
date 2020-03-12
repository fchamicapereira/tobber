const mocha = require('mocha');
const expect = require('chai').expect;
const base = require('./base');
const server = base.server;

function containsUser(array, object) {
	let filtered = array.filter(obj => {
		return obj.name === object.name && 
				obj.pass === object.pass && 
				obj.token === object.token;
	});

	return filtered.length > 0;
}

beforeEach(async function() {
	await base.tearDown();
});

describe('/user', function() {

	it('get all users success', async function() {
		const user = await base.user();
		const admin = await base.admin();

		const res = await server.inject({
			url: '/user',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		expect(res.statusCode).to.equal(200);
		expect(res.result).to.be.an('array');
		expect(res.result.length).to.equal(2);
		expect(containsUser(res.result, user)).to.be.true;
		expect(containsUser(res.result, admin)).to.be.true;
	});

	it('get me success', async function() {
		const user = await base.user();
		const admin = await base.admin();

		const resUser = await server.inject({
			url: '/user/me',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		const resAdmin = await server.inject({
			url: '/user/me',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		expect(resUser.statusCode).to.equal(200);
		expect(resUser.result).to.be.an('object');
		expect(resUser.result.name).to.equal(user.name);
		expect(resUser.result.pass).to.equal(user.pass);
		expect(resUser.result.token).to.equal(user.token);

		expect(resAdmin.statusCode).to.equal(200);
		expect(resAdmin.result).to.be.an('object');
		expect(resAdmin.result.name).to.equal(admin.name);
		expect(resAdmin.result.pass).to.equal(admin.pass);
		expect(resAdmin.result.token).to.equal(admin.token);
	});

	it('promote success', async function() {
		const user = await base.user();
		const admin = await base.admin();

		const res1 = await server.inject({
			url: '/user/me',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		await server.inject({
			url: `/user/${user.name}/promote`,
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		const res2 = await server.inject({
			url: '/user/me',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		expect(res1.statusCode).to.equal(200);
		expect(res1.result).to.be.an('object');
		expect(res1.result.name).to.equal(user.name);
		expect(res1.result.pass).to.equal(user.pass);
		expect(res1.result.token).to.equal(user.token);
		expect(res1.result.scope.length).to.equal(1);
		expect(res1.result.scope[0]).to.equal('user');

		expect(res2.statusCode).to.equal(200);
		expect(res2.result).to.be.an('object');
		expect(res2.result.name).to.equal(user.name);
		expect(res2.result.pass).to.equal(user.pass);
		expect(res2.result.scope.length).to.equal(2);
		expect(res2.result.scope.includes('user')).to.be.true;
		expect(res2.result.scope.includes('admin')).to.be.true;
	});

	it('delete success', async function () {
		const user = await base.user();
		const admin = await base.admin();

		const res1 = await server.inject({
			url: `/user/${user.name}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		const res2 = await server.inject({
			url: '/user',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		expect(res1.statusCode).to.equal(200);
		expect(res1.result).to.an('object');
		expect(res1.result.name).to.equal(user.name);
		expect(res1.result.pass).to.equal(user.pass);
		expect(res1.result.token).to.equal(user.token);

		
		expect(res2.statusCode).to.equal(200);
		expect(res2.result).to.an('array');
		expect(res2.result.length).to.equal(1);
		expect(res2.result[0].name).to.equal(admin.name);
		expect(res2.result[0].pass).to.equal(admin.pass);
		expect(res2.result[0].token).to.equal(admin.token);
	});

	it('user cant get all users', async function () {
		const user = await base.user();

		const res = await server.inject({
			url: '/user',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		expect(res.statusCode).to.equal(403);
	});

	it('user can\'t promote', async function () {
		const user = await base.user();

		const res1 = await server.inject({
			url: `/user/${user.name}/promote`,
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		const res2 = await server.inject({
			url: '/user/me',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		expect(res1.statusCode).to.equal(403);
		expect(res2.statusCode).to.equal(200);
		expect(user.scope.length).to.equal(1);
		expect(user.scope[0]).to.equal('user');
	});

	it('get me with random token', async function () {
		const res = await server.inject({
			url: '/user/me',
			method: 'GET',
			headers: {
				Authorization: 'Bearer iqwudhuqwhdiuhqwd'
			}
		});

		expect(res.statusCode).to.equal(401);
	});

	it('get me with no token', async function () {
		const res = await server.inject({
			url: '/user/me',
			method: 'GET',
		});

		expect(res.statusCode).to.equal(401);
	});

	it('get all with random token', async function () {
		const res = await server.inject({
			url: '/user',
			method: 'GET',
			headers: {
				Authorization: 'Bearer iqwudhuqwhdiuhqwd'
			}
		});

		expect(res.statusCode).to.equal(401);
	});

	it('get all with no token', async function () {
		const res = await server.inject({
			url: '/user',
			method: 'GET',
		});

		expect(res.statusCode).to.equal(401);
	});

	it('promote with random token', async function () {
		const user = base.user();
		
		const res = await server.inject({
			url: `/user/${user.name}/promote`,
			method: 'PUT',
			headers: {
				Authorization: 'Bearer iqwudhuqwhdiuhqwd'
			}
		});

		expect(res.statusCode).to.equal(401);
	});

	it('get me with no token', async function () {
		const user = base.user();
		
		const res = await server.inject({
			url: `/user/${user.name}/promote`,
			method: 'PUT',
		});

		expect(res.statusCode).to.equal(401);
	});

	it('promote a non user', async function () {
		const admin = await base.admin();

		const res = await server.inject({
			url: '/user/thisrandomuser/promote',
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		expect(res.statusCode).to.equal(422);
	});

	it('delete user not registered', async function () {
		const user = await base.user();
		const admin = await base.admin();

		const res = await server.inject({
			url: '/user/somerandomuser',
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${admin.token}`
			}
		});

		expect(res.statusCode).to.equal(422);
	});

	it('delete user with user credentials', async function () {
		const user = await base.user();

		const res = await server.inject({
			url: '/user/somerandomuser',
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		});

		expect(res.statusCode).to.equal(403);
	});

	it('delete user with random token', async function () {
		const user = await base.user();

		const res = await server.inject({
			url: `/user/${user.name}`,
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer somerandomtoken'
			}
		});

		expect(res.statusCode).to.equal(401);
	});

	it('delete user with no token', async function () {
		const user = await base.user();

		const res = await server.inject({
			url: `/user/${user.name}`,
			method: 'DELETE'
		});

		expect(res.statusCode).to.equal(401);
	});
});