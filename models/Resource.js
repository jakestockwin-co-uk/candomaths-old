var keystone = require('keystone');
var Types = keystone.Field.Types;

var Resource = new keystone.List('Resource');

Resource.add({
	name: { type: Types.Text, required: true, index: true },
	link: { type: Types.Url, initial: true, required: true, index: true },
	description: { type: Types.Html, initial: true },
	displayOrder: { type: Types.Number, initial: true },
});

Resource.defaultColumns = 'name, displayOrder|20%';
Resource.defaultSort = 'displayOrder';
Resource.register();
