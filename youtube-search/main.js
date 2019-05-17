let nextPageToken = null;
let currentKeyWord = null;
let enableLoad = true;



$("form#search").submit(function (event) {
    event.preventDefault();
    $('#result-list').empty();
    const keyword = currentKeyWord =  $('#keyword').val();
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: 'GET',
        success: function (data) {
            nextPageToken = data['nextPageToken'];
            if(data.items.length !== 0){
                const {items} = data;
                for (item of items){
                    const videoLink = `https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`
                    $('#result-list').append(
                        `
                            <a class="result col-md-12" href=${videoLink}>
                                <img src=${item.snippet.thumbnails.high.url}>
                                <div class="video_info">
                                    <h2 class="title">${item.snippet.title}</h2>
                                    <p class="description">${item.snippet.description}</p>
                                </div>
                            </a>
                            
                        `
                    )
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
    });
});


let debounce;
$("#keyword").on("input", function () {
    if(debounce){
        clearTimeout(debounce)
    }

    debounce = setTimeout(function () {
        console.log("search");
        $('#result-list').empty();
        const keyword = currentKeyWord =  $('#keyword').val();
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
            type: 'GET',
            success: function (data) {
                nextPageToken = data['nextPageToken'];
                if(data.items.length !== 0){
                    const {items} = data;
                    for (item of items){
                        const videoLink = `https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`
                        $('#result-list').append(
                            `
                            <a class="result col-md-12" href=${videoLink}>
                                <img src=${item.snippet.thumbnails.high.url}>
                                <div class="video_info">
                                    <h2 class="title">${item.snippet.title}</h2>
                                    <p class="description">${item.snippet.description}</p>
                                </div>
                            </a>
                            
                        `
                        )
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
    },500)
})







$(window).on("scroll", function() {
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    if (enableLoad && nextPageToken != null && (scrollHeight - scrollPosition) < 400) {
        console.log(nextPageToken);
        enableLoad = false;
       $.ajax({
           url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${currentKeyWord}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
           type: 'get',
           success: function (data) {
               nextPageToken = data['nextPageToken'];
               if(data.items.length !== 0){
                   const {items} = data;
                   for (item of items){
                       const videoLink = `https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`
                       $('#result-list').append(
                           `
                            <a class="result col-md-12" href=${videoLink}>
                                <img src=${item.snippet.thumbnails.high.url}>
                                <div class="video_info">
                                    <h2 class="title">${item.snippet.title}</h2>
                                    <p class="description">${item.snippet.description}</p>
                                </div>
                            </a>
                            
                        `
                       )
                   }
                   enableLoad = true;
               }},
           error: function (err) {
               console.log(err)
           }
       })
    }
});