const User = require('../src/db/models/user');
const server = require('../src');
const secret = require('../src/secret/secret');

const PASS = 'userPass';
const ADMIN_PASS = 'adminPass';

module.exports.adminPass = ADMIN_PASS;
module.exports.pass = PASS;

module.exports.admin = async () => {
	try {
		let res = await server.inject({
			url: '/signup',
			method: 'POST',
			payload: {
				name: 'admin',
				pass: ADMIN_PASS,
				secret: secret.get().secret
			}
		});

		const user = res.result;

		return await User.findOneAndUpdate(
			{
				name : user.name
			},
			{
				$addToSet: {
					scope: 'admin'
				}
			},
			{
				new: true
			}).exec();
		
	} catch(e) {
		console.error('setUp error:', e);
	}
};

module.exports.user = async () => {
	try {
		let res = await server.inject({
			url: '/signup',
			method: 'POST',
			payload: {
				name: 'user',
				pass: PASS,
				secret: secret.get().secret
			}
		});

		return res.result;
	} catch(e) {
		console.error('setUp error:', e);
	}
};

module.exports.tearDown = async () => {
	try {
		return await User.remove();
	} catch (e) {
		console.error('tearDown error:', e);
	}
};

module.exports.server = server;