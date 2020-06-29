const server = require('../src');
const User = require('../src/db/models/user');
const secret = require('../src/secret/secret');

if (process.argv.length < 4) {
	console.error(`
    Invalid arguments: missing name or password.
    Example: node addAdmin.js myName myPass
    `);
	process.exit(1);
}

const name = process.argv[2];
const pass = process.argv[3];

function createAdmin(name, pass) {
	let user;

	server.events.on('start', async () => {

		try {
			const s = await secret.refresh();

			console.log(`\n\t name: ${name} \n\t pass: ${pass} \n\t secret: ${s.secret} \n`);

			const res = await server.inject({
				url: '/signup',
				method: 'POST',
				payload: {
					name: name,
					pass: pass,
					secret: s.secret
				}
			});

			if (res.statusCode !== 200) {
				console.error(JSON.stringify(res.result, null, 2));
				process.exit(1);
			}

			user = res.result;

		} catch (e) {
			console.error(e);
			process.exit(1);
		}


		User.findOneAndUpdate(
			{
				name : user.name
			},
			{
				$addToSet: {
					scope: 'admin'
				}
			},
			{
				new: true
			}, (err, doc, res) => {
				if (err) return console.error(err);
				process.exit(0);
		});
	});
}

createAdmin(name, pass);
