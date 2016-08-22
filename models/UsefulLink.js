var keystone = require('keystone');
var Types = keystone.Field.Types;

var UsefulLink = new keystone.List('UsefulLink');

UsefulLink.add({
	name: { type: String, required: true, index: true },
	link: { type: Types.Url, initial: true, required: true, index: true },
});

UsefulLink.defaultColumns = 'name';
UsefulLink.register();
