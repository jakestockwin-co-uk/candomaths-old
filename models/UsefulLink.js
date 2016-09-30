var keystone = require('keystone');
var Types = keystone.Field.Types;

var UsefulLink = new keystone.List('UsefulLink', {
	sortable: true,
});

UsefulLink.add({
	name: { type: Types.Text, required: true, index: true },
	link: { type: Types.Url, initial: true, required: true, index: true },
	description: { type: Types.Html, wysiwyg: true, initial: true },
});

UsefulLink.defaultColumns = 'name';
UsefulLink.defaultSort = 'sortOrder';
UsefulLink.register();
