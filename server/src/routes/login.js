const Joi = require('joi');
const handlers = require('../handlers');

module.exports = [
	{
		method: ['PUT'],
		path: '/login',
		config: {
			auth: {
				strategy: 'jwt',
				mode: 'try'
			},
			handler: handlers.login,
			description: 'Login',
			notes: 'Returns a JWT',
			tags: ['api', 'user'],
			validate: {
				payload: {
					name: Joi.string()
						.max(30)
						.required()
						.description('username'),
					pass: Joi.string()
						.max(30)
						.required()
						.description('password')
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	}
];
