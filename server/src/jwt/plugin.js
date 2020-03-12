const jwt = require('./jwt');

module.exports = {
	name: 'jwt',
	version: '1.0.0',
	register: async (server) => {

		await server.register(require('hapi-auth-jwt2'));

		server.auth.strategy('jwt', 'jwt', {
			key: process.env.JWT_SECRET,
			validate: jwt.validate,
			verifyOptions: { algorithms: [ 'HS256' ] }
		});

		server.method({
			name: 'jwt.gen',
			method: jwt.gen
		});
	
	}
};
