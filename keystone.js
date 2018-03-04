// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Testing stuff
var test = (process.argv.indexOf('--test') > -1);

if (test) {
// Rquire keystone-nightwatch-e2e
	var keystoneNightwatchE2e = require('keystone-nightwatch-e2e');
	var async = require('async');
	var moment = require('moment');
	var mongoose = require('mongoose');
	var request = require('superagent');

	// Set app-specific env for nightwatch session
	process.env.KNE_TEST_PATHS = 'tests/tests';
	process.env.KNE_PAGE_OBJECT_PATHS = 'tests/pages';
}

// determine the mongo uri and database name
var dbName = test ? '/test' : '/candomaths';
var mongoUri = test ? 'mongodb://' + (keystone.get('host') || 'localhost') + dbName : process.env.MONGO_URI || 'mongodb://' + (keystone.get('host') || 'localhost') + dbName;


function configureKeystone () {
	keystone.init({

		'name': 'CanDoMaths',
		'brand': 'CanDoMaths',

		'sass': 'public',
		'static': 'public',
		'favicon': 'public/favicon.ico',
		'views': 'templates/views',
		'view engine': 'jade',

		'mongo': mongoUri,
		'mongo options': { server: { keepAlive: 1 } },

		'auto update': true,
		'session': true,
		'auth': true,
		'user model': 'User',

		'cookie secret': process.env.COOKIE_SECRET,

		'model prefix': 'candomaths',

	});

	if (keystone.get('env') === 'production') {
		keystone.set('session store', 'connect-mongo');
	}

	keystone.import('models');

	keystone.set('locals', {
		_: require('underscore'),
		env: keystone.get('env'),
		utils: keystone.utils,
		editable: keystone.content.editable,
	});

	keystone.set('routes', require('./routes'));

	keystone.set('host', process.env.IP || 'localhost');
	keystone.set('port', process.env.PORT || '3000');


	keystone.set('nav', {
		users: 'users',
		content: ['resources', 'useful-links', 'files'],
		emails: 'emails',
		blog: 'posts',
	});

	if (keystone.get('env') === 'production') {
		keystone.set('session store', 'connect-mongo');
	}
}

if (!test) {
	configureKeystone();
	keystone.start();
} else {
	runTests();
}

// Function that drops the test database before starting testing
function dropTestDatabase (done) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: dropping test database');

	mongoose.connect(mongoUri, function (err) {
		if (!err) {
			mongoose.connection.db.dropDatabase(function (err) {
				mongoose.connection.close(function (err) {
					done(err);
				});
			});
		} else {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: failed to connect to mongo: ' + err);
			done(err);
		}
	});
}

// Function that checks if keystone is ready before starting testing
function checkKeystoneReady (done) {
	async.retry({
		times: 10,
		interval: 3000,
	}, function (done, result) {
		console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: checking if KeystoneJS ready for request');
		request
			.get('http://' + keystone.get('host') + ':' + keystone.get('port') + '/keystone')
			.end(done);
	}, function (err, result) {
		if (!err) {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS Ready!');
			done();
		} else {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS does not appear ready!');
			done(err);
		}
	});
}

// Function that starts the e2e common framework
function runE2E (options, done) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: starting tests...');

	keystoneNightwatchE2e.startE2E(options, done);
}

// Function that starts keystone
function runKeystone (cb) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: starting KeystoneJS...');

	keystone.start({
		onMount: function () {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS mounted Successfuly');
		},
		onStart: function () {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS Started Successfully');
			cb();
		},
	});
}

// Function that bootstraps the e2e test service
function runTests () {
	var runTests = process.argv.indexOf('--notest') === -1;
	var dropDB = process.argv.indexOf('--nodrop') === -1;

	async.series([

		function (cb) {
			if (dropDB) {
				dropTestDatabase(cb);
			}	else {
				cb();
			}
		},

		function (cb) {
			configureKeystone();
			cb();
		},

		function (cb) {
			runKeystone(cb);
		},

		function (cb) {
			checkKeystoneReady(cb);
		},

		function (cb) {
			if (runTests) {
				runE2E({
					keystone: keystone,
				}, cb);
			} else {
				cb();
			}
		},

	], function (err) {
		var exitProcess = false;
		var exitCode = 0;
		if (err) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: ' + err);
			exitProcess = true;
			exitCode = 1;
		}
		if (runTests) {
			exitProcess = true;
		}
		if (exitProcess) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: exiting');
			process.exit(exitCode);
		}
	});
}
