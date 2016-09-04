module.exports = {
	'before': function (browser) {
		browser.app = browser.page.app();
		browser.app.navigate();
	},
	'after': function (browser) {
		browser.end();
	},
	'Home page should initially display correctly': function (browser) {
		browser.app.assertUI();
	},
};
