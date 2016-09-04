var keystone = require('keystone');
var Types = keystone.Field.Types;

var UsefulLink = new keystone.List('UsefulLink');

UsefulLink.add({
	name: { type: Types.Text, required: true, index: true },
	link: { type: Types.Url, initial: true, required: true, index: true },
	description: { type: Types.Html, initial: true },
});

UsefulLink.defaultColumns = 'name';
UsefulLink.register();
