const Joi = require('joi');
const handlers = require('../handlers');

const preGenHash = async (request) => {
	return await request.server.methods.hash.generate(request.payload.pass);
};

const preGenToken = async (request) => {
	return await request.server.methods.jwt.gen(request.payload.name);
};

const preGetSecret = (request) => {
	return request.server.methods.secret.get();
};

module.exports = [
	{
		method: ['POST'],
		path: '/signup',
		config: {
			auth: false,
			pre: [
				{
					method: preGenHash,
					assign: 'pass'
				},
				{
					method: preGenToken,
					assign: 'token'
				},
				{
					method: preGetSecret,
					assign: 'secret'
				}
			],
			handler: handlers.user.add,
			description: 'Create a user',
			notes: 'Returns a user',
			tags: ['api', 'user'],
			validate: {
				payload: {
					name: Joi.string()
						.min(1)
						.max(20)
						.required()
						.description('username'),
					pass: Joi.string()
						.min(8)
						.max(30)
						.required()
						.description('password'),
					secret: Joi.string()
						.max(30)
						.required()
						.description('secret')
				}
			}
		}
	},
];
