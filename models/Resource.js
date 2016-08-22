var keystone = require('keystone');
var Types = keystone.Field.Types;

var Resource = new keystone.List('Resource');

Resource.add({
	name: { type: String, required: true, index: true },
	link: { type: Types.Url, initial: true, required: true, index: true },
	description: { type: Types.Html, wysiwyg: true },
});

Resource.defaultColumns = 'name';
Resource.register();
