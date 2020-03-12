const crypto = require('crypto');
let CronJob = require('cron').CronJob;
let converter = require('cron-converter');

const CRON_PATTERN = '*/10 * * * *';

let auth;
var cronInstance = new converter();
cronInstance.fromString(CRON_PATTERN);

function generate(cb) {
	crypto.randomBytes(12, cb);
}

function callback(err, buf) {
	auth = buf.toString('hex');
	
	if (process.env.NODE_ENV === 'watch') {
		console.log(`Secret: ${auth}`);
	}
}

generate(callback);

function refresh (resolve, reject) {
	generate((err, buf) => {
		if (err) {
			reject(err);
		} else {
			auth = buf.toString('hex');
			resolve({
				secret: buf.toString('hex'),
				next: cronInstance.schedule().next().toString()
			});
		}
	});
}

// every 10 minutes
new CronJob('0 ' + CRON_PATTERN, () => {
	generate(callback);
}, null, true, 'Europe/London');


module.exports.refresh = async () => { return new Promise(refresh); };
module.exports.get = () => { return { secret: auth, next: cronInstance.schedule().next().toString() }; };
