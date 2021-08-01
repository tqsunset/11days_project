$(document).ready(function () {
    getMusicals()
});

// 차트 데이터 연결
function getMusicals() {
    console.log('getMusicals() 실행됨')
    $('#tbody').empty()

    $.ajax({
        type: "GET",
        url: "/musicals",
        data: {},
        success: function (response) {
            musicals = response['musicals']
            // console.log(musicals)

            for (let i = 0; i < musicals.length; i++) {
                musical = musicals[i]

                let url = '/musicals/page?num='+ musical['num']
                let title = musical['title']
                // genre = musical['genre']
                let startDate = new Date(musical['start_date'])
                let endDate = new Date(musical['end_date'])
                // loc = musical['location']
                // cast = musical['cast']
                // staff = musical['staff']
                // castDetail = JSON.stringify(musical['cast_detail'])  // 현 html페이지에서 내용을 볼 수 있게 dict을 string으로 변환
                // link = musical['link']
                // desc = musical['desc']
                let img_url = musical['img_url']

                console.log(url)

                let temp_html = `<div class="chart-row">
                            <div class="chart-row-item">${title}</div>
                            <ul class="chart-row-bars">
                                <li class="chart-li-${i}">
                                    ${startDate.getMonth() + 1}. ${startDate.getDate()} ~ ${endDate.getMonth() + 1}. ${endDate.getDate()}
                                </li>
                            </ul>
                        </div>`

                $('#tbody').append(temp_html)
                $(`.chart-li-${i}`).css("background-color", `${getRandomColor(i)}`)
                $(`.chart-li-${i}`).css("grid-column", `${getStartNumb(startDate)}/${getEndNumb(endDate)}`)
                $(`.chart-li-${i}`).click(function () {
                    window.open(url, title, 'width=1200,height=700,location=no,status=no,scrollbars=yes')
                })

            }

        }

    })
}


function getStartNumb(date) {
    let day = new Date(2021, 6, 5)
    let week

    if (day >= date) {
        return 1
    } else {
        for (let i = 0; i < 30; i++) {
            if (day < date) {
                // console.log(day, i)
                day.setDate(day.getDate() + 7)
            } else {
                week = i
                break
            }
        }
        return week + 1
    }
}

function getEndNumb(date) {
    let day = new Date(2021, 6, 5)
    let week

    for (let i = 0; i < 30; i++) {
        if (day < date) {
            // console.log(day, i)
            day.setDate(day.getDate() + 7)
        } else {
            week = i
            break
        }
    }
    return week
}

function getRandomColor(i) {
    let colors = ['#DC8665',
        '#138086',
        '#534666',
        '#CD7672',
        '#EEB462',
        '#9a972b',
        '#0080FF',
        '#168046']

    // numb = Math.floor(Math.random() * colors.length)
    numb = i % colors.length
    return colors[numb]
}


// todo - 한 칸을 일별로
//
//     let temp_html = `<span>7월</span>`
//     for (let i=0; i < 31 - 1; i++){
//      temp_html = temp_html + '<span></span>'
//     }
//     console.log(temp_html)
//
//     $('.chart-period').empty()
//     let head_html = '<div class="chart-row-item"></div>'
//     $('.chart-period').append(head_html+temp_html)
//     console.log('works')
