const targetingIdea = async ( user, keywords ) => {
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
	
	const result = await targetingIdeaService.get({selector}, (error, res) => {
		//console.log(error);
		//console.log(result);
		//res.status(res.statusCode).send(res)
		
		return res
		//console.log(finalResult)
	})

};

exports.targetingIdea = targetingIdea;