var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';


module.exports = {
	url: 'http://' + host + ':' + port,
	elements: {
		fiveEssentials: '#fiveEssentials',
		coreIdeas: '#coreIdeas',
		resources: '#resources',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@fiveEssentials').to.be.present;
			this.expect.element('@coreIdeas').to.be.present;
			this.expect.element('@resources').to.be.present;
			return this;
		},
		assertNthUsefulLink: function (n, title, href, description) {
			this.assertNthUsefulLinkTitle(n, title);
			this.assertNthUsefulLinkLink(n, href);
			this.assertNthUsefulLinkDescription(n, description);
			return this;
		},
		assertNthUsefulLinkLink: function (n, href) {
			this.expect.element(getNthUsefulLinkLinkSelector(n)).to.have.attribute('href', href);
			return this;
		},
		assertNthUsefulLinkTitle: function (n, title) {
			this.expect.element(getNthUsefulLinkTitleSelector(n)).text.to.equal(title);
			return this;
		},
		assertNthUsefulLinkDescription: function (n, description) {
			this.expect.element(getNthUsefulLinkDescriptionSelector(n)).text.to.equal(description);
			return this;
		},
		assertNthResource: function (n, title, href, description) {
			this.assertNthResourceTitle(n, title);
			this.assertNthResourceLink(n, href);
			this.assertNthResourceDescription(n, description);
			return this;
		},
		assertNthResourceLink: function (n, href) {
			this.expect.element(getNthResourceLinkSelector(n)).to.have.attribute('href', href);
			return this;
		},
		assertNthResourceTitle: function (n, title) {
			this.expect.element(getNthResourceTitleSelector(n)).text.to.equal(title);
			return this;
		},
		assertNthResourceDescription: function (n, description) {
			this.expect.element(getNthResourceDescriptionSelector(n)).text.to.equal(description);
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementPresent('@fiveEssentials');
			return this;
		},
		verifyPageLoad: function () {
			this.expect.element('@fiveEssentials').to.be.present;
			return this;
		},
	}],
};

function getNthUsefulLinkLinkSelector (n) {
	return '#resources > ul:nth-of-type(1) > .cardLink:nth-of-type(' + n + ')';
}
function getNthUsefulLinkTitleSelector (n) {
	return '#resources > ul:nth-of-type(1) > .cardLink:nth-of-type(' + n + ') .linkTitle';
}
function getNthUsefulLinkDescriptionSelector (n) {
	return '#resources > ul:nth-of-type(1) > .cardLink:nth-of-type(' + n + ') .linkDescription';
}


function getNthResourceLinkSelector (n) {
	return '#resources > ul:nth-of-type(2) > .cardLink:nth-of-type(' + n + ')';
}
function getNthResourceTitleSelector (n) {
	return '#resources > ul:nth-of-type(2) > .cardLink:nth-of-type(' + n + ') .linkTitle';
}
function getNthResourceDescriptionSelector (n) {
	return '#resources > ul:nth-of-type(2) > .cardLink:nth-of-type(' + n + ') .linkDescription';
}