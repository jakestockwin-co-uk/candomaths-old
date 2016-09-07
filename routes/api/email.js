var keystone = require('keystone');
var Email = keystone.list('Email');

exports.create = function (req, res) {
	var item = new Email.model();
	var data = (req.method === 'POST') ? req.body : req.query;

	console.log(data);
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) return res.apiError('error', err);

		res.apiResponse({
			post: item,
		});
	});
};
