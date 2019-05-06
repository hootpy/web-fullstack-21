let nextPageToken = null;
let currentKeyWord = null;
let onSearch = false;


$("form#search").submit(function (event) {
    $('#result-list').empty()
    const keyword = currentKeyWord =  $('#keyword').val()
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: 'GET',
        success: function (data) {
            nextPageToken = data['nextPageToken']
            if(data.items.length !== 0){
                const listVideo = data.items
                for (let i = 0; i < listVideo.length; i++) {
                    let videoData = listVideo[i]
                    const videoLink = `https://www.youtube.com/watch?v=${videoData['id']['videoId']}?autoplay=true`
                    const thumbnails = `${videoData['snippet']['thumbnails']['default']['url']}`
                    const videoTitle = `${videoData['snippet']['title']}`
                    const videoDescription = `${videoData['snippet']['description']}`

                    const video = `
                                    <a class="result col-md-12" href=${videoLink} target="_blank">
                                        <img src=${thumbnails} alt="">
                                        <div class="video_info">
                                            <h2 class="title">${videoTitle}</h2>
                                            <p class="description">${videoDescription}</p>
                                            <span>View >></span>
                                        </div>
                                    </a>
                `
                    $('#result-list').append(video)
            }

        } else {
                $('#result-list').append(`
                <div>
                <h3 style="color: crimson">We can't find anything match your keyword</h3>
                </div>
                `)
            }},
        error: function (err) {
            console.log(err)
        }
    })
    event.preventDefault()
})

$('#keyword').on('input',function () {
    onSearch = true
})

setInterval(function () {
    if (onSearch){
        $('#result-list').empty()
        const keyword = $('#keyword').val()
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
            type: 'GET',
            success: function (data) {
                nextPageToken = data['nextPageToken']
                onSearch = false
                if(data.items.length !== 0){
                    const listVideo = data.items
                    for (let i = 0; i < listVideo.length; i++) {
                        let videoData = listVideo[i]
                        const videoLink = `https://www.youtube.com/watch?v=${videoData['id']['videoId']}?autoplay=true`
                        const thumbnails = `${videoData['snippet']['thumbnails']['default']['url']}`
                        const videoTitle = `${videoData['snippet']['title']}`
                        const videoDescription = `${videoData['snippet']['description']}`

                        const video = `
                                    <a class="result col-md-12" href=${videoLink} target="_blank">
                                        <img src=${thumbnails} alt="">
                                        <div class="video_info">
                                            <h2 class="title">${videoTitle}</h2>
                                            <p class="description">${videoDescription}</p>
                                            <span>View >></span>
                                        </div>
                                    </a>
                `
                        $('#result-list').append(video)
                    }

                } else {
                    $('#result-list').append(`
                <div>
                <h3 style="color: crimson">We can't find anything match your keyword</h3>
                </div>
                `)
                }},
            error: function (err) {
                console.log(err)
            }
        })
    }
},1000)

$(window).on("scroll", function() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
       $.ajax({
           url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${currentKeyWord}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
           type: 'get',
           success: function (data) {
               nextPageToken = data['nextPageToken']
               const listVideo = data.items
               for (let i = 0; i < listVideo.length; i++) {
                   let videoData = listVideo[i]
                   const videoLink = `https://www.youtube.com/watch?v=${videoData['id']['videoId']}?autoplay=true`
                   const thumbnails = `${videoData['snippet']['thumbnails']['default']['url']}`
                   const videoTitle = `${videoData['snippet']['title']}`
                   const videoDescription = `${videoData['snippet']['description']}`

                   const video = `
                                    <a class="result col-md-12" href=${videoLink} target="_blank">
                                        <img src=${thumbnails} alt="">
                                        <div class="video_info">
                                            <h2 class="title">${videoTitle}</h2>
                                            <p class="description">${videoDescription}</p>
                                            <span>View >></span>
                                        </div>
                                    </a>
                `
                   $('#result-list').append(video)
               }},
           error: function (err) {
               console.log(err)
           }
       })
    }
});