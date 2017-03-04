var UsefulLinkModelTestConfig = require('../modelTestConfig/usefulLinkModelTestConfig');

module.exports = {
	'@disabled': true, // Disabled until tests can support wysiwyg fields.
	'before': function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIInitialForm = browser.page.adminUIInitialForm();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.app = browser.page.app();

		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForSigninScreen();
		browser.adminUISignin.signin({ user: 'user@keystonejs.com', password: 'admin', wait: false });
		browser.adminUIApp.waitForHomeScreen({ timeout: 60000 }); // Long timeout for first time adminUI loads.

		browser.adminUIInitialForm.setDefaultModelTestConfig(UsefulLinkModelTestConfig);
		browser.adminUIItemScreen.setDefaultModelTestConfig(UsefulLinkModelTestConfig);
		browser.adminUIListScreen.setDefaultModelTestConfig(UsefulLinkModelTestConfig);
	},
	'after': function (browser) {
		browser.end();
	},
	'Useful links should display properly in the initial form': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'UsefulLinks' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({
			// Name excluded from below as assertFieldUIVisible can't cope with not having a label yet...
			fields: [{ name: 'link' }, { name: 'description' }],
		});
	},
	'User should be able to add a useful link': function (browser) {
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			fields: [
				{ name: 'name', input: { value: 'Test link 1' } },
				{ name: 'link', input: { value: 'http://www.example.com/' } },
				{ name: 'description', input: { value: 'Test description 1' } },
			],
		});

		// Check test inputs in intial form
		browser.adminUIInitialForm.assertFieldInputs({
			fields: [
				{ name: 'name', input: { value: 'Test link 1' } },
				{ name: 'link', input: { value: 'http://www.example.com/' } },
				{ name: 'description', input: { value: 'Test description 1' } },
			],
		});

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in intial form
		browser.adminUIItemScreen.assertFieldInputs({
			fields: [
				{ name: 'name', input: { value: 'Test link 1' } },
				{ name: 'link', input: { value: 'http://www.example.com/' } },
				{ name: 'description', input: { value: 'Test description 1' } },
			],
		});
	},

	'The added useful link should display correctly on the home page': function (browser) {
		browser.app.navigate();
		browser.app.waitForPageLoad();
		browser.app.assertUI();
		browser.app.assertNthUsefulLink(1, 'Test link 1', 'http://www.example.com/', 'Test description 1');
	},
};
