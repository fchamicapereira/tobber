const User = require('../models/user');

module.exports.add = async (name, pass, token, rules) => {
	const user = new User({
		name: name,
		pass: pass,
		token: token,
		rules: rules,
	});

	return await user.save();
};

module.exports.getById = async (id) => {
	return await User.findById(id).exec();
};

module.exports.getByName = async (name) => {
	try {
		const user = await User.findOne({ name: name }).exec();
		return user;
	} catch (e) {
		return null;
	}
};

module.exports.get = async () => {
	return await User.find().exec();
};

module.exports.updateJWT = async (name, jwt) => {
	return await User.findOneAndUpdate(
		{
			name: name
		},
		{
			$set: {
				token: jwt
			}
		},
		{
			new: true
		}).exec();
};

module.exports.promote = async (name) => {
	return await User.findOneAndUpdate(
		{
			name : name
		},
		{
			$addToSet: {
				scope: 'admin'
			}
		},
		{
			new: true
		}).exec();
};

module.exports.demote = async (name) => {
	return await User.findOneAndUpdate(
		{
			name : name
		},
		{
			$set: {
				scope: ['user']
			}
		},
		{
			new: true
		}).exec();
};

module.exports.remove = async (name) => {
	return await User.findOneAndRemove({ name: name }).exec();
};

module.exports.modifyRules = async (name, rules) => {
	return await User.findOneAndUpdate(
		{
			name: name
		},
		{
			$set: {
				rules: rules
			}
		},
		{
			new: true
		}).exec();
};

module.exports.modifyPass = async (name, pass) => {
	return await User.findOneAndUpdate(
		{
			name: name
		},
		{
			$set: {
				pass: pass
			}
		},
		{
			new: true
		}).exec();
};

module.exports.modifyPreferences = async (name, preferences) => {
	const user = await User.findOne({ name: name }).exec();

	if (user.preferences.top !== preferences.top) {
		user.top.splice(preferences.top);
	}

	return await User.findOneAndUpdate(
		{
			name: name
		},
		{
			$set: {
				preferences: preferences,
				top: user.top
			}
		},
		{
			new: true
		}).exec();
};

module.exports.updateTop = async (name, torrents) => {
	try {
		const user = await User.findOne({ name: name }).exec();
		let top = user.top || [];
		
		top = top.concat(torrents);

		top.sort((t1, t2) => {
			if (t1.score < t2.score) { return 1; }
			if (t1.score > t2.score) { return -1; }
			return 0;
		});

		top.splice(user.preferences.top);

		await User.findOneAndUpdate(
			{
				name: name
			},
			{
				$set: {
					top: top
				}
			},
			{
				new: true
			}).exec();

	} catch (e) {
		return null;
	}
};

module.exports.removeFromTop = async (name, id) => {
	try {
		const user = await User.findOne({ name: name }).exec();
		let top = user.top;

		if (id !== undefined) {
			for (let i = 0; i < top.length; i++) {
				if (top[i].id === id) {
					top.splice(i, 1);
					break;
				}
			}
		} else {
			top = [];
		}
		
		return await User.findOneAndUpdate(
			{
				name: name
			},
			{
				$set: {
					top: top
				}
			},
			{
				new: true
			}).exec();

	} catch (e) {
		return null;
	}
};