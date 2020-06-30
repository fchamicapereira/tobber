const handlers = require('../handlers');
const Joi = require('joi');

const preGenHash = async (request) => {
	return await request.server.methods.hash.generate(request.payload.new_pass);
};

module.exports = [
	{
		method: 'GET',
		path: '/api/user',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['admin']
			},
			handler: handlers.user.get,
			description: 'Get all users',
			notes: 'Returns array of users',
			tags: ['api', 'user'],
			validate: {
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	},
	{
		method: 'GET',
		path: '/api/user/me',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.user.getMe,
			description: 'Get my info',
			notes: 'Returns a user',
			tags: ['api', 'user'],
			validate: {
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'PUT',
		path: '/api/user/{name}/promote',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['admin']
			},
			handler: handlers.user.promote,
			description: 'Promotes user to admin',
			tags: ['api', 'user', 'admin'],
			validate: {
				params: {
					name: Joi.string()
						.max(30)
						.required()
						.description('username'),
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'PUT',
		path: '/api/user/{name}/demote',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['admin']
			},
			handler: handlers.user.demote,
			description: 'Demote admin to user',
			tags: ['api', 'user', 'admin'],
			validate: {
				params: {
					name: Joi.string()
						.max(30)
						.required()
						.description('username'),
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'DELETE',
		path: '/api/user/me/top/{id}',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.user.removeFromTop,
			description: 'Removes torrent associated with the id from user\'s top',
			tags: ['api', 'user'],
			validate: {
				params: {
					id: Joi.string()
						.required()
						.description('id'),
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'DELETE',
		path: '/api/user/me/top',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.user.removeFromTop,
			description: 'Removes all torrents from user\'s top',
			tags: ['api', 'user'],
			validate: {
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'PUT',
		path: '/api/user/me/rules',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.user.rules,
			description: 'Change my rules',
			tags: ['api', 'user'],
			validate: {
				payload: {
					rules: Joi.object()
						.pattern(/^/, Joi.array()
							.items(Joi.object().keys({
								key: Joi.string().min(1).max(20),
								keywords: Joi.array().items(
									Joi.string().min(1).max(30)
								),
								score: Joi.number()
							}))
						)
						.required()
						.description('rules'),
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'PUT',
		path: '/api/user/me/preferences',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.user.preferences,
			description: 'Change my preferences',
			tags: ['api', 'user'],
			validate: {
				payload: {
					preferences: Joi.object()
						.keys({
							limit: Joi.number().min(-1).max(1000),
							skip: Joi.array().items(Joi.string()),
							omdb: Joi.boolean(),
							sort: Joi.boolean(),
							anime: Joi.boolean(),
							top: Joi.number().min(0).max(100)
						})
						.required()
						.description('preferences'),
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'PUT',
		path: '/api/user/me/pass',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			pre: [
				{
					method: preGenHash,
					assign: 'new_pass'
				}
			],
			handler: handlers.user.changePass,
			description: 'Change my password',
			tags: ['api', 'user'],
			validate: {
				payload: {
					old_pass: Joi.string()
						.min(8)
						.max(20)
						.required()
						.description('old pass'),
					new_pass: Joi.string()
						.min(8)
						.max(20)
						.required()
						.description('new pass'),
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		},
	},
	{
		method: 'DELETE',
		path: '/api/user/{name}',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['admin']
			},
			handler: handlers.user.remove,
			description: 'Removes user',
			notes: 'Returns array of users after deletion',
			tags: ['api', 'user'],
			validate: {
				params: {
					name: Joi.string()
						.max(30)
						.required()
						.description('username')
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	}
];
