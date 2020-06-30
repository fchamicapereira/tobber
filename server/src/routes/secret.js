const handlers = require('../handlers');
const Joi = require('joi');

module.exports = [
	{
		method: ['GET'],
		path: '/api/secret',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['admin']
			},
			handler: handlers.secret.get,
			description: 'Get the signup secret',
			notes: 'Returns a secret',
			tags: ['api', 'secret'],
			validate: {
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	},

	{
		method: ['PUT'],
		path: '/api/secret',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['admin']
			},
			handler: handlers.secret.refresh,
			description: 'Force the refresh of the signup secret',
			notes: 'Returns the new secret',
			tags: ['api', 'secret'],
			validate: {
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	},
];
