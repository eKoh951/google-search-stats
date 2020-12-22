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

//app.use((req, res, next) => { //Middleware to use adwords User
//	user = adwordsUser()
//	console.log(user)
//	next()
//})

app.get('/', async (req, res) => {
	//const keywords = ['ice', 'drop']
	//const result = await targetingIdea( user, keywords )
	//console.log(result)
	res.render('index', {
		title: 'Search for google keywords statistics',
		name: 'Erick Ponce'
	})
})

app.post('/search', async (req, res) => {
	console.log('from test endpoint')
	const keywords = req.body.keywords
	console.log(keywords)
	let lastMonth = new Date();
	lastMonth.setDate(1);
	lastMonth.setMonth(lastMonth.getMonth()-1)
	googleTrends.interestOverTime({
		keyword: keywords,
		startTime: lastMonth,
		geo: 'MX'
	})
	.then(function(results){
		let averages = JSON.parse( results ).default.averages;
		console.log('These results are awesome', averages);
		res.set('Content-Type', 'application/json');
		res.status(201).send({ averages });
	})
	.catch(function(err){
		console.error('Oh no there was an error', err);
	});	
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})