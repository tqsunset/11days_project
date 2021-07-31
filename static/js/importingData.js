$(document).ready(function () {
    getWholeMusicals()
});


function getWholeMusicals() {
    console.log('getWholeMusicals() 실행됨')
    $('#owl-example').empty()

    $.ajax({
        type: "GET",
        url: "/musicals",
        data: {},
        success: function (response) {
            musicals = response['musicals']
            console.log(musicals)

            for (let i = 0; i < musicals.length; i++) {
                musical = musicals[i]

                title = musical['title']
                genre = musical['genre']
                startDate = musical['start_date']
                endDate = musical['end_date']
                loc = musical['location']
                cast = musical['cast']
                staff = musical['staff']
                castDetail = JSON.stringify(musical['cast_detail'])  // 현 html페이지에서 내용을 볼 수 있게 dict을 string으로 변환
                link = musical['link']
                desc = musical['desc']

                temp_html = `<div class="item">
                            <img class="item-img"
                                 src=""
                                 alt="">
                        </div>`
            }


            alert("get works!")
        }

    })
}
