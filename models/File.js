var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Model
 * ==========
 */

var File = new keystone.List('File', {
	autokey: { path: 'slug', from: 'name', unique: true },
});

var storage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-s3'),
	s3: {
		path: process.env.S3_BUCKET,
		region: process.env.S3_REGION,
		headers: {
			'x-amz-acl': 'public-read',
		},
	},
	schema: {
		bucket: true, // optional; store the bucket the file was uploaded to in your db
		etag: true, // optional; store the etag for the resource
		path: true, // optional; store the path of the file in your db
		url: true, // optional; generate & store a public URL
	},
	filename: function (item, file) {
		return encodeURI(item.name);
	},
});

File.add({
	name: { type: String, required: true },
	file: {
		type: Types.File,
		storage: storage,
		filename: function (item, file) {
			return encodeURI(item.name);
		},
	},
	link: { type: Types.Text, note: 'This will be autopopulated as the url at which your uploaded file is available.' },
});

File.schema.pre('save', function (next) {
	this.link = this.file.url;
	next();
});

File.defaultColumns = 'name';
File.register();
