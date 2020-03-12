const hash = require('./hash');

module.exports = {
	name: 'helpers',
	version: '1.0.0',
	register: async (server) => {

		server.method({
			name: 'hash.generate',
			method: hash.generate
		});

		server.method({
			name: 'hash.validate',
			method: hash.validate
		});
	}
	
};