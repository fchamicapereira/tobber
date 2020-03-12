const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	pass: {
		type: String,
		required: true
	},
	preferences: {
		limit: {
			type: Number,
			default: -1
		},
		skip: {
			type: [String],
			default: []
		},
		omdb: {
			type: Boolean,
			default: false
		},
		sort: {
			type: Boolean,
			default: true
		},
		anime: {
			type: Boolean,
			default: false
		},
		top: {
			type: Number,
			default: 10
		}
	},
	rules: mongoose.Schema.Types.Mixed,
	token: {
		type: String,
		required: true
	},
	scope: {
		type: [String],
		default: ['user']
	},
	top: {
		type: mongoose.Schema.Types.Mixed,
		default: []
	}
});


module.exports = mongoose.model('User', userSchema);