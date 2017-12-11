const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {tweeters, topics, filteredFeed, userDetails, verifyUser} = require('./twitterAPI')

const app = express()
const PORT = process.env.PORT || 8081

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.get('/tweeters', tweeters)
app.get('/topics', topics)
app.get('/feed', filteredFeed)
app.get('/user', userDetails)
app.post('/', verifyUser)
app.listen(PORT, () => console.log('Express server listening on port ' + PORT + ', use the link localhost:' + PORT + ' to view your dashboard'))
