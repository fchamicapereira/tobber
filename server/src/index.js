const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require(__dirname + '/../package');
const env = require('node-env-file');

env(__dirname + '/../variables.env', {overwrite: true, raise: false});

const server = Hapi.server({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 8000,
	routes: {
		cors: true
	}
});

const reporters = process.env.NODE_ENV === 'test' ? {} : {
	myConsoleReporter: [{
		module: 'good-squeeze',
		name: 'Squeeze',
		args: [ { log: '*', response: { include: 'api' } }]
	}, {
		module: 'good-console'
	}, 'stdout'],
};

const init = async () => {
	try {
		await server.register([
			Inert,
			Vision,
			{
				plugin: require('./db/plugin'),
				options: {
					db: process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_TEST : process.env.MONGO_DB,
					host: process.env.MONGO_HOST,
					port: process.env.MONGO_PORT,
				}
			},
			{
				plugin: require('./db/methods/plugin'),
			},
			{
				plugin: require('./hash/plugin'),
			},
			{
				plugin: require('./engine/plugin'),
			},
			{
				plugin: require('./jwt/plugin'),
			},
			{
				plugin: require('./secret/plugin'),
			},
			{
				plugin: require('hapi-router'),
				options: {
					routes: 'src/routes/*.js'
				}
			},
			{
				plugin: require('hapijs-status-monitor'),
				options: {
					title: 'My Status Monitor',
					routeConfig: {
						auth: false
					}
				}
			},
			{
				plugin: require('good'),
				options: {
					ops: {
						interval: 1000
					},
					reporters: reporters
				}
			},
			{
				plugin: HapiSwagger,
				options: {
					info: {
						title: 'Tobber REST API Documentation',
						version: Pack.version,
						contact: {
							email: 'fchamicapereira@gmail.com'
						}
					},
				}
			},
		]);

		await server.start();
	} catch (err) {
		console.error(err);
	}

	console.log(`Server running at: ${server.info.uri}`);
};

init();

module.exports = server;