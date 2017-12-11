const express = require('express')
const path = require('path')
const {tweeters} = require('./twitterAPI')

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.static(path.join(__dirname, 'public')))
app.get('/tweeters', tweeters)
app.listen(PORT, () => console.log('Express listening on port ', PORT))
