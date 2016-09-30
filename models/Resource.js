var keystone = require('keystone');
var Types = keystone.Field.Types;

var Resource = new keystone.List('Resource', {
	sortable: true,
});

Resource.add({
	name: { type: Types.Text, required: true, index: true },
	description: { type: Types.Html, wysiwyg: true, initial: true },
});

Resource.defaultColumns = 'name';
Resource.defaultSort = 'sortOrder';
Resource.register();
