const handlers = require('../handlers');
const Joi = require('joi');

function options(request) {
	let opt = {};

	Object.keys(request.query).forEach(option => {
		opt[option] = request.query[option];
	});

	return opt;
}

module.exports = [
	{
		method: 'GET',
		path: '/engine/rules',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.engine.getRules,
			description: 'Get the default rules',
			notes: 'Returns the default rules',
			tags: ['api', 'engine'],
			validate: {
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	},
	{
		method: 'GET',
		path: '/engine/sites',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.engine.getSites,
			description: 'Get all sites available by the engine',
			notes: 'Returns an array of strings',
			tags: ['api', 'engine'],
			validate: {
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	},
	{
		method: 'GET',
		path: '/engine/crawl/{search}',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.engine.crawl,
			description: 'Crawl with tobber',
			notes: 'Returns list of torrents',
			tags: ['api', 'engine'],
			pre: [
				{
					method: options,
					assign: 'opt'
				}
			],
			validate: {
				params: {
					search: Joi.string()
						.max(100)
						.required()
						.description('search'),
				},
				query: {
					limit: Joi.number()
						.min(-1)
						.max(1e4)
						.description('how many torrents will be returned'),
					skip: Joi.array()
						.items(Joi.string())
						.description('sites to skip'),
					getRaw: Joi.boolean()
						.description('get raw torrents (without going through pipeline'),
					sort: Joi.boolean()
						.description('sort the results'),
					episode: Joi.number()
						.min(0)
						.max(1000)
						.description('get the specific episode'),
					season: Joi.number()
						.min(0)
						.max(100)
						.description('get the specific season'),
					anime: Joi.boolean()
						.description('use anime sites')
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	},
	{
		method: 'PUT',
		path: '/engine/info',
		config: {
			auth: {
				strategy: 'jwt',
				scope: ['user']
			},
			handler: handlers.engine.getInfo,
			description: 'Get info about this torrent\'t url',
			notes: 'Returns torrent\'s info',
			tags: ['api', 'engine'],
			validate: {
				payload: {
					url: Joi.string()
						.required()
						.description('url'),
				},
				headers: Joi.object({
					'Authorization': Joi.string()
				}).unknown()
			}
		}
	}
];
