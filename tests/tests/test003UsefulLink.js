var UsefulLinkModelTestConfig = require('../modelTestConfig/usefulLinkModelTestConfig');

module.exports = {
	'before': function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIInitialForm = browser.page.adminUIInitialForm();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.app = browser.page.app();

		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForSigninScreen();
		browser.adminUISignin.signin('user@keystonejs.com', 'admin');
		browser.adminUIApp.waitForHomeScreen(60000); // Long timeout for first time adminUI loads.
	},
	'after': function (browser) {
		browser.end();
	},
	'Useful links should display properly in the initial form': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'UsefulLinks' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({
			modelTestConfig: UsefulLinkModelTestConfig,
			// Name excluded from below as assertFieldUIVisible can't cope with not having a label yet...
			fields: [{ name: 'link' }, { name: 'description' }],
		});
	},
	'User should be able to add a useful link': function (browser) {
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: UsefulLinkModelTestConfig,
			fields: {
				name: { value: 'Test link 1' },
				link: { value: 'http://www.example.com/' },
				description: { value: 'Test description 1' },
			},
		});

		// Check test inputs in intial form
		browser.adminUIInitialForm.assertFieldInputs({
			modelTestConfig: UsefulLinkModelTestConfig,
			fields: {
				name: { value: 'Test link 1' },
				link: { value: 'http://www.example.com/' },
				description: { value: 'Test description 1' },
			},
		});

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in intial form
		browser.adminUIItemScreen.assertFieldInputs({
			modelTestConfig: UsefulLinkModelTestConfig,
			fields: {
				name: { value: 'Test link 1' },
				link: { value: 'http://www.example.com/' },
				description: { value: 'Test description 1' },
			},
		});
	},

	'The added useful link should display correctly on the home page': function (browser) {
		browser.app.navigate();
		browser.app.waitForPageLoad();
		browser.app.assertUI();
		browser.app.assertNthUsefulLink(1, 'Test link 1', 'http://www.example.com/', 'Test description 1');
	},
};