const mongoose = require('mongoose');

module.exports = {
	name: 'mongoose',
	version: '1.0.0',
	register: async (server, options) => {
		mongoose.connect(`mongodb://${options.host}:${options.port}/${options.db}`);
		console.log(`Connected to db 'mongodb://${options.host}:${options.port}/${options.db}'`);
	}
};