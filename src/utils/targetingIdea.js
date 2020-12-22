const targetingIdea = ( user, keywords ) => {
	let targetingIdeaService = user.getService('TargetingIdeaService', 'v201809')
	
	let selector = {
		ideaType: 'KEYWORD',
		requestType: 'STATS',
		requestedAttributeTypes: [
			'KEYWORD_TEXT',
			'SEARCH_VOLUME',
			'CATEGORY_PRODUCTS_AND_SERVICES'
		],
		localeCode: 'en_US',
		currencyCode: 'USD',
		paging: {
			startIndex: '0',
			numberResults: '10'
		},
		searchParameters: [
			{
				xsi_type: 'RelatedToQuerySearchParameter',
				queries: keywords
			}
		]
	}
	
	const result = targetingIdeaService.get({selector}, (error, result) => {
		console.log(error);
		//res.status(result.statusCode).send(error)
		return result
	})

	return result

};

exports.targetingIdea = targetingIdea;