$(() => {
  console.log('Page loaded')
  init()
})

function init () {
  $(".page-dashboard").hide()
}

function handleSubmit () {
  let screenName = $('#screen').val()
  $.post('/', {screenName})
    .done(() => {
      $(".login").hide()
      $(".page-dashboard").show()
      $('#screen_name').empty().append(`<span><a href='https://twitter.com/${screenName}'>${screenName}</a>`)
      $.get('/tweeters', {screen_name: screenName})
        .then((response) => {
          response.forEach((entry) => {
            $('#popular_tweeters').append(`<p><span><a href='https://twitter.com/${entry.name}'>${entry.name}</a>(${entry.followers_count})</span></p>`)
          })
        })
      $.get('/topics')
      .then((response) => {
        response.forEach((entry) => {
          $('#trending_topics').append(`<p><span><a href='${entry.url}'>${entry.name}</a>(${entry.tweet_volume})</span></p>`)
        })
      })
      $.get('/feed', {screen_name: screenName})
      .then((response) => {
        response.forEach((entry) => {
          $('#twitter_feed').append(`<div class="message-body">${entry.status}</div>`)
        })
      })
      $.get('/user', {screen_name: screenName})
        .then((response) => {
          response.forEach((entry) => {
            $('#tweets').empty().append(`${entry.tweets}`)
            $('#followers').empty().append(`${entry.followers_count}`)
            $('#friends').empty().append(`${entry.friends_count}`)
          })
        })
    })
}
