$(() => {
  console.log('Page loaded')
  $.get('/tweeters')
    .then((response) => {
      response.forEach((entry) => {
        $('#popular_tweeters').append(`<p><span><a href='https://twitter.com/${entry.name}'>${entry.name}</a>(${entry.followers_count})</span></p>`)
      })
    })
})
