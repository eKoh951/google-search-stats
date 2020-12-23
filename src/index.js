const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express()
const port = process.env.PORT || 8030
const dotenv = require('dotenv');
const googleTrends = require('google-trends-api');
dotenv.config({ path: './config.env' });

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

const { adwordsUser } = require('./utils/adwordsUser')
const { targetingIdea } = require('./utils/targetingIdea')

let user;

app.use(express.json()); //Middleware (app.use) to parse JSON to req.body

app.use((req, res, next) => { //Middleware to use adwords User
	user = adwordsUser()
	//console.log(user)
	next()
})

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Search for google keywords statistics',
		name: 'Erick Ponce'
	})
})

app.post('/search', async (req, res) => {
	console.log('from test endpoint')
	const keywords = req.body.keywords
	console.log(keywords)

	if( !keywords ) res.status(400).send('No keywords were defined')

	let targetingIdeaService = user.getService('TargetingIdeaService', 'v201809')
	
	let selector = {
		searchParameters: [
			{
				'xsi:type': 'RelatedToQuerySearchParameter',
				queries: keywords
				//queries: ['man', 'woman']
			}
		],
		ideaType: 'KEYWORD',
		requestType: 'STATS',
		requestedAttributeTypes: [
			'KEYWORD_TEXT',
			'TARGETED_MONTHLY_SEARCHES',
			'SEARCH_VOLUME'
		],
		paging: {
			startIndex: 0,
			numberResults: 10
		},
		localeCode: "es_MX",
		currencyCode: "MXN"
	}
	
	targetingIdeaService.get({selector: selector}, (error, result) => {
		//console.log({ entries: result.entries[0].data[0].value.value })
		//console.log({ entries: result.entries[0].data[0].value.value })
		//res.status(200).send(result)
		let searchesResult = []
		//let average = (array) => array.reduce((a, b) => a + b) / array.length;
		for( const entry of result.entries ) {
			let monthlySearchesKeyword = entry.data.filter( attribute => attribute.key === 'KEYWORD_TEXT' )[0].value.value
			let monthlySearchesValue = entry.data.filter( attribute => attribute.key === 'SEARCH_VOLUME' )[0].value.value
			searchesResult.push({
				keyword: monthlySearchesKeyword,
				value: monthlySearchesValue
			})
			searchesResult.sort((a, b) => a.keyword.localeCompare(b.keyword));
			console.log(searchesResult)

		}
		res.status( result.statusCode || 200 ).send({ searchesResult });
	})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})