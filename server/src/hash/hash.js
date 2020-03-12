const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.CRYPT_SALT_ROUNDS);
const Boom = require('boom');

module.exports.generate = async (pass) => {
	try {
		return await bcrypt.hash(pass, saltRounds);
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.validate = async (pass, hash) => {
	return await bcrypt.compare(pass, hash);
};