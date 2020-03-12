const Boom = require('boom');

module.exports.get = async (request) => {
	try {
		const user = await request.server.methods.user.get();
		return user === null ? Boom.badData('No users found') : user;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.getByName = async (request) => {
	const name = request.params.username;
	
	try {
		const user = await request.server.methods.user.getByName(name);
		return user === null ? Boom.badData('User not found') : user;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.getMe = async (request) => {
	const name = request.auth.credentials.name;

	try {
		const user = await request.server.methods.user.getByName(name);
		return user === null ? Boom.badData('User not found') : user;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.add = async (request) => {
	const name = request.payload.name;
	const secret = request.payload.secret;

	const pass = request.pre.pass;
	const token = request.pre.token;
	const actualSecret = request.pre.secret.secret;

	if (secret !== actualSecret) {
		return Boom.unauthorized();
	}

	const rules = request.server.methods.engine.getScoreRules();

	try {
		const user = await request.server.methods.user.add(name, pass, token, rules);
		return user;
	} catch (e) {
		return Boom.conflict('Username already taken', { username: name });
	}
};

module.exports.changePass = async (request) => {
	const name = request.auth.credentials.name;
	const old_pass = request.payload.old_pass;
	const new_pass = request.pre.new_pass;

	const user = await request.server.methods.user.getByName(name);

	// validate password
	try {
		const result = await request.server.methods.hash.validate(old_pass, user.pass);
		if (!result) {
			return Boom.unauthorized();
		}
	} catch (e) {
		return Boom.unauthorized();
	}

	try {
		const user = await request.server.methods.user.modifyPass(name, new_pass);
		return user;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.promote = async (request) => {
	const name = request.params.name;

	try {
		const user = await request.server.methods.user.promote(name);
		return user === null ? Boom.badData('User not found') : user;
	} catch(e) {
		return Boom.boomify(e);
	}
};

module.exports.demote = async (request) => {
	const name = request.params.name;

	try {
		const user = await request.server.methods.user.demote(name);
		return user === null ? Boom.badData('User not found') : user;
	} catch(e) {
		return Boom.boomify(e);
	}
};

module.exports.remove = async (request) => {
	const name = request.params.name;

	try {
		const user = await request.server.methods.user.remove(name);
		return user === null ? Boom.badData('User not found') : user;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.rules = async (request) => {
	const name = request.auth.credentials.name;
	const rules = request.payload.rules;

	try {
		const user = await request.server.methods.user.modifyRules(name, rules);
		return user;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.preferences = async (request) => {
	const name = request.auth.credentials.name;
	const preferences = request.payload.preferences;

	try {
		const user = await request.server.methods.user.modifyPreferences(name, preferences);
		return user;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.removeFromTop = async (request) => {
	const name = request.auth.credentials.name;
	const id = request.params.id;

	try {
		const user = await request.server.methods.user.removeFromTop(name, id);
		return user;
	} catch (e) {
		return Boom.boomify(e);
	}
};