const AdwordsUser = require('node-adwords').AdwordsUser; //https://www.npmjs.com/package/node-adwords
const AdwordsConstants = require('node-adwords').AdwordsConstants;

const adwordsUser = () => {
	const user = new AdwordsUser({
		developerToken: process.env.DEVELOPER_TOKEN,
		userAgent: process.env.USER_AGENT,
		clientCustomerId: process.env.CLIENT_CUSTOMER_ID,
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		refresh_token: process.env.REFRESH_TOKEN
	});

	return user
};

// module.exports = adwordsUser
exports.adwordsUser = adwordsUser