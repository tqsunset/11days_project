$(document).ready(function () {
    getDetails(id)
});

// 차트 데이터 연결
function getDetails(id) {
    // console.log('getDetails() 실행됨')
    $('.title').empty()
    $('.content').empty()
    $('#cast-list').empty()
    $('#cast-list').append('<span class="casting"><p>캐스팅</p></span>')

    $.ajax({
        type: "GET",
        url: `/musicals/detail?num=${id}`,
        data: {},
        success: function (response) {
            // console.log(response['musical'])
            let musical = response['musical']

            let title = musical['title']
            let genre = musical['genre']
            let startDate = new Date(musical['start_date'])
            let endDate = new Date(musical['end_date'])
            let loc = musical['location']
            let cast = musical['cast']
            let staff = musical['staff']
            let castDetail = musical['cast_detail']
            let link = musical['link']
            let desc = musical['desc']
            let img_url = musical['img_url']
            let startDateStr = startDate.getFullYear() + '.' + (startDate.getMonth() + 1) + '.' + startDate.getDate()
            let endDateStr = endDate.getFullYear() + '.' + (endDate.getMonth() + 1) + '.' + endDate.getDate()

            let temp_content = `<p>${loc}</p>
                        <p>${startDateStr} ~ ${endDateStr}</p>
                        <p>${genre}</p>`

            console.log(img_url)
            document.title = title
            $('.title').append(title)
            $('.image').css("background-image", `url(${img_url})`)
            $('.content').append(temp_content)
            $('#musical-desc').append(desc)
            $('#to-interpark').click(function () {
                window.open(link)
            })


            for (let i = 0; i < castDetail.length; i++) {
                cast = castDetail[i]
                let castStr = Object.keys(cast)[0]

                let actors = cast[castStr]

                for (let k = 0; k < actors.length; k++) {
                    let actor = actors[k]
                    // console.log(actor['img'], actor['name'],castStr)

                    let photo_url = actor['img']
                    let actorStr = actor['name']

                    temp_actor = `<li><img class="img-thumbnail"
                                        src="${photo_url}"><br>${castStr}<br/><span
                                        class="actor">${actorStr}</span></li>`

                    // console.log(temp_actor)
                    $('#cast-list').append(temp_actor)

                }

            }

        }

    })

}
