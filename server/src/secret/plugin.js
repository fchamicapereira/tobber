const secret = require('./secret');

module.exports = {
	name: 'secret',
	version: '1.0.0',
	register: async (server) => {

		server.method({
			name: 'secret.get',
			method: secret.get
		});

		server.method({
			name: 'secret.refresh',
			method: secret.refresh
		});

	}
};