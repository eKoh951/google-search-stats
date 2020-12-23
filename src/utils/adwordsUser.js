const AdwordsUser = require('node-adwords').AdwordsUser; //https://www.npmjs.com/package/node-adwords
const AdwordsConstants = require('node-adwords').AdwordsConstants;

const adwordsUser = () => {
	const user = new AdwordsUser({
		developerToken: 'SwrwK0MXsLvMJZA8lWm8kw',
		userAgent: 'Ninguna',
		clientCustomerId: '672-090-2931',
		client_id: '59425033883-jadufnjc6j68lul4bgvrociliigciguq.apps.googleusercontent.com',
		client_secret: 'o8v4s0WqHaSIKUF1R68toUMJ',
		refresh_token: '1//0fDP6sgDJuv9WCgYIARAAGA8SNwF-L9IrmsnQAUMu8-oBhASnih121dV02Ty1JNxhi3bMBTSmC4FzRYBIZw4Gq9XHSFsa5bkpHEg'
	});

	return user
};

// module.exports = adwordsUser
exports.adwordsUser = adwordsUser