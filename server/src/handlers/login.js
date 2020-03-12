const Boom = require('boom');

module.exports = async (request) => {
	const name = request.payload.name;
	const pass = request.payload.pass;

	const user = await request.server.methods.user.getByName(name);

	// get the user
	if (user === null) {
		return Boom.unauthorized();
	}

	// validate password
	try {
		const result = await request.server.methods.hash.validate(pass, user.pass);
		if (!result) {
			return Boom.unauthorized();
		}
	} catch (e) {
		return Boom.unauthorized();
	}

	// generate new JWT
	const newJWT = await request.server.methods.jwt.gen(name);
	
	// update user's JWT
	const newUser = await request.server.methods.user.updateJWT(name, newJWT);

	if (newUser === null) {
		return Boom.unauthorized();
	} return newUser;
};