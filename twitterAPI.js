const Twit = require('twit');
require('dotenv-safe').config({allowEmptyValues: true});

const tweet = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const tweeters = function (req, res) {
  tweet.get('friends/list', req.query)
    .then(showTweeters)
    .then((result) => {
      res.json(result)
    })
};

function showTweeters (result) {
  const {data} = result
  const friends = []
  for (let user of data['users']) {
    const friend = {}
    friend['name'] = user['screen_name']
    friend['followers_count'] = user['followers_count']
    friends.push(friend)
  };
  const friendsSorted = friends.sort(function (a, b) {
    return b.followers_count - a.followers_count
  });
  return friendsSorted.slice(0, 10)
};

const topicParams = {
  id: 1
};

const topics = function (req, res) {
  tweet.get('trends/place', topicParams)
    .then(showTopics)
    .then((result) => {
      res.json(result)
    });
};

function showTopics (result) {
  const {data} = result
  let topics = data[0]['trends']
  let topicsSorted = topics.sort(function (a, b) {
    return b.tweet_volume - a.tweet_volume
  });
  return topicsSorted.slice(0, 10)
};

const filteredFeed = function (req, res) {
  tweet.get('statuses/user_timeline', req.query)
    .then(showFeed)
    .then((result) => {
      res.json(result)
    });
};

function showFeed (result) {
  const {data} = result
  const statuses = []
  for (let status of data) {
    let feed = {}
    feed['status'] = status['text']
    statuses.push(feed)
  };
  return statuses
};

const userDetails = function (req, res) {
  tweet.get('users/show', req.query)
    .then(showUserDetails)
    .then((result) => {
      res.json(result)
    });
};

function showUserDetails (result) {
  const {data} = result
  const user = []
  const userDetails = {}
  userDetails['name'] = data['screen_name']
  userDetails['followers_count'] = data['followers_count']
  userDetails['friends_count'] = data['friends_count']
  userDetails['tweets'] = data['statuses_count']
  userDetails['location'] = data['location']
  user.push(userDetails)
  return user
};

function verify (result) {
  const {data} = result
  if (data['errors']) return false
  else return true
};

const verifyUser = function (req, res) {
  tweet.get('users/show', req.body)
    .then(verify)
    .then((result) => {
      res.json([result, req.body])
    })
};

module.exports = {
  tweeters: tweeters,
  topics: topics,
  filteredFeed: filteredFeed,
  userDetails: userDetails,
  verifyUser: verifyUser
};
