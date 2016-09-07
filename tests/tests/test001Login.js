module.exports = {
	'before': function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForSigninScreen();
	},
	'after': function (browser) {
		browser.end();
	},
	'Signin page should initially display correctly': function (browser) {
		browser.adminUISignin.assertUI();
	},
	'Signin page should allow users to log in': function (browser) {
		browser.adminUISignin.signin('user@keystonejs.com', 'admin');
		browser.adminUIApp.waitForHomeScreen(60000); // Long timeout for first time adminUI loads.
	},
};