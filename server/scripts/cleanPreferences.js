const mongoose = require('mongoose');
const User = require('../src/db/models/user');

mongoose.connect('mongodb://localhost/tobber');

const defaultPreferences = {
	limit: -1,
	skip: [],
	omdb: false,
	sort: true,
	anime: false,
	top: 10
};

function showDiff(p1, p2) {
	let changes = false;
	console.log('Changes:');

	for (const key of Object.keys(p1)) {
		if (p2[key] === undefined) {
			console.log('-', key);
			changes = true;
		}
	}

	for (const key of Object.keys(p2)) {
		if (p1[key] === undefined) {
			console.log('+', key);
			changes = true;
		}
	}

	if (!changes) { console.log('None'); }

	return changes;
}

function clean(preferences) {
	let newPref = JSON.parse(JSON.stringify(preferences));

	for (const key of Object.keys(defaultPreferences)) {
		if (newPref[key] === undefined) {
			newPref[key] = defaultPreferences[key];
		}
	}

	for (const key of Object.keys(newPref)) {
		if (defaultPreferences[key] === undefined) {
			newPref[key] = undefined;
			newPref = JSON.parse(JSON.stringify(newPref));
		}
	}

	return newPref;
}

function updatePreferences(name, preferences, close) {
	console.log('Updating...');

	User.findOneAndUpdate( { name: name }, {
		$set: { preferences: preferences }
	}, (err) => {
		if (err) {
			console.error(err);
			if (close) { process.exit(1); }
		}
				
		console.log(`Updating ${name}: finished!`);
				
		if (close) {
			process.exit(1);
		}
	});
}

function cleanPreferences() {
	

	User.find({}, (err, users) => {
		let i = 0;
		let close = false;

		for (let user of users) {
			console.log('\n=======================');
			console.log('User:', user.name);

			let preferences = clean(user.preferences.toJSON());
			const changes = showDiff(user.preferences.toJSON(), preferences);

			close = i === users.length - 1;

			if (changes) {
				updatePreferences(user.name, preferences, close);
			} else {
				if (i + 1 === users.length) { return process.exit(1); }	
			}

			i += 1;
		}

		
	});
}

cleanPreferences();
