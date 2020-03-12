const jwt = require('jsonwebtoken');

module.exports.gen = async (name) => {
	return await jwt.sign(
		{
			name: name,
			iat: Math.floor(Date.now() / 1000)
		},
		process.env.JWT_SECRET,
		{
			algorithm: 'HS256',
			expiresIn: '30 days'
		});
};

module.exports.validate = async function (decoded, request) {
	const user = await request.server.methods.user.getByName(decoded.name);
	if (user === null) {
		return {
			credentials: false,
			isValid: false
		};
	}	else {
		return {
			isValid: true,
			credentials: {
				name: user.name,
				scope: user.scope
			}
		};
	}
};