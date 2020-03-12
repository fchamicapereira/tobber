module.exports.get = async (request) => {
	return request.server.methods.secret.get();
};

module.exports.refresh = async (request) => {
	return await request.server.methods.secret.refresh();
};