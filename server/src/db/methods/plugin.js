const user = require('./user');

module.exports = {
	name: 'mongoose-methods',
	version: '1.0.0',
	register: async (server) => {

		server.method({
			name: 'user.add',
			method: user.add
		});

		server.method({
			name: 'user.get',
			method: user.get
		});

		server.method({
			name: 'user.getByName',
			method: user.getByName
		});

		server.method({
			name: 'user.getById',
			method: user.getById
		});

		server.method({
			name: 'user.updateJWT',
			method: user.updateJWT
		});

		server.method({
			name: 'user.promote',
			method: user.promote
		});

		server.method({
			name: 'user.demote',
			method: user.demote
		});

		server.method({
			name: 'user.remove',
			method: user.remove
		});

		server.method({
			name: 'user.modifyRules',
			method: user.modifyRules
		});

		server.method({
			name: 'user.modifyPreferences',
			method: user.modifyPreferences
		});

		server.method({
			name: 'user.modifyPass',
			method: user.modifyPass
		});

		server.method({
			name: 'user.updateTop',
			method: user.updateTop
		});

		server.method({
			name: 'user.removeFromTop',
			method: user.removeFromTop
		});
	}
};