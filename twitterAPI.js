const Twit = require('twit')

const tweet = new Twit({
  consumer_key: 'p9smvhLm9SXh9z2EUNYyakFe7',
  consumer_secret: 'Fu6f5YWPyEfrUwpGS02Ojm2eMSxanySYzvkhP7ypVLtlCvIvgy',
  access_token: '809287937351249920-2S2imOpJVEy0oxDlGwVADh3wM2WPVpY',
  access_token_secret: 'EkF2JQx9jcsBOyyMU4UsZYgFqLWJ1UH0W8NCDPL7Axnbs'
})

const params = {
  screen_name: 'sherylsandberg'
}

const tweeters = function (req, res) {
  tweet.get('friends/list', params)
    .then(showTweeters)
    .then((result) => {
      res.json(result)
    })
}

function showTweeters (result) {
  const {data} = result
  const friends = []
  for (let user of data['users']) {
    const friend = {}
    friend['name'] = user['screen_name']
    friend['followers_count'] = user['followers_count']
    friends.push(friend)
  }
  const friendsSorted = friends.sort(function (a, b) {
    return b.followers_count - a.followers_count
  })
  return friendsSorted.slice(0, 10)
}

module.exports = {
  tweeters: tweeters
}
