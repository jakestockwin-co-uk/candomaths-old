var objectAssign = require('object-assign');
var fieldTestObjectsPath = require('keystone-nightwatch-e2e').fieldTestObjectsPath;
var path = require('path');
var TextFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'TextFieldTestObject'));
var UrlFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'UrlFieldTestObject'));
var HtmlFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'HtmlFieldTestObject'));

module.exports = function UsefulLinkModelTestConfig (config) {
	return {
		name: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'name' })),
		link: new UrlFieldTestObject(objectAssign({}, config, { fieldName: 'link' })),
		description: new HtmlFieldTestObject(objectAssign({}, config, { fieldName: 'description' })),
	};
};
