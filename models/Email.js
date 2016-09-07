var keystone = require('keystone');
var Types = keystone.Field.Types;

var Email = new keystone.List('Email');

Email.add({
	name: { type: Types.Text, required: true, initial: true },
	email: { type: Types.Email, required: true, initial: true },
});

Email.track = true;
Email.defaultSort = '-createdAt';
Email.defaultColumns = 'name, email';
Email.register();
