var keystone = require('keystone');
var Types = keystone.Field.Types;

var Resource = new keystone.List('Resource', {
	sortable: true,
});

Resource.add({
	name: { type: Types.Text, required: true, index: true },
	link: { type: Types.Url, initial: true, required: true, index: true },
	description: { type: Types.Html, initial: true },
});

Resource.defaultColumns = 'name';
Resource.defaultSort = 'sortOrder';
Resource.register();
