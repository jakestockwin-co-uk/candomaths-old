var EmailModelTestConfig = require('../modelTestConfig/emailModelTestConfig');

module.exports = {
	'before': function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.app = browser.page.app();

		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForSigninScreen();
		browser.adminUISignin.signin({ user: 'user@keystonejs.com', password: 'admin', wait: false });
		browser.adminUIApp.waitForHomeScreen({ timeout: 60000 }); // Long timeout for first time adminUI loads.

		browser.adminUIListScreen.setDefaultModelTestConfig(EmailModelTestConfig);
		browser.adminUIItemScreen.setDefaultModelTestConfig(EmailModelTestConfig);
	},
	'after': function (browser) {
		browser.end();
	},
	'Anyone should be able to add their name and email via the home page': function (browser) {
		browser.app.navigate();
		browser.app.fillContactForm('Test Name', 'test@example.com');
		browser.app.assertContactFormSuccess();
	},
	'Name and email should now appear in the admin UI': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.openList({ section: 'emails', list: 'Email' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickItemFieldValue({
			fields: [{
				row: 1,
				column: 2,
				name: 'name',
			}],
		});
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.assertFieldInputs({
			fields: [{
				name: 'name',
				input: { value: 'Test Name' },
			}, {
				name: 'email',
				input: { value: 'test@example.com' },
			}],
		});
	},
};
