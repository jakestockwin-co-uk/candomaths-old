var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.on('init', function (next) {
		// Find resources
		keystone.list('Resource').model.find().sort('sortOrder').exec(function (err, results) {
			if (err) {
				next(err);
			} else {
				// make resources available
				locals.resources = results;
			}
		}).then(function () {
			// Then find useful links
			keystone.list('UsefulLink').model.find().sort('sortOrder').exec(function (err, results) {
				if (err) {
					next(err);
				} else {
					// make links available
					locals.usefulLinks = results;
					next();
				}
			});
		}, function (err) {
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
