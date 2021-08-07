from bs4 import BeautifulSoup
import requests
from detail_c import detail_crwl, desc_crwl, poster_crwl
from parse_date import parse_date
from pprint import pprint

THEATRE_LIST = ('예술의전당 오페라극장',
                '예술의전당 CJ 토월극장',
                '샤롯데씨어터',
                'LG아트센터',
                '블루스퀘어 신한카드홀 (구 인터파크홀)',
                '국립극장 해오름극장',
                '세종문화회관 대극장',
                '대학로 드림아트센터 1관',
                '두산아트센터 연강홀',
                '광림아트센터 BBCH홀',
                '홍익대 대학로 아트센터 대극장',
                '아트원씨어터 1관',
                '충무아트센터 대극장',
                '대성 디큐브아트센터',
                '우리금융아트홀',
                '서울 올림픽 공원 우리금융아트홀')


def musical(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    result = []

    for i in [1, 2]:
        address = url + '&Page={}'.format(i)

        data = requests.get(address, headers=headers)
        page = BeautifulSoup(data.text, 'html.parser')

        trs = page.select('#contents > div.container1 > table > tr')
        musical_table = trs[10]
        extract = musical_table.select('td > table > tr > td > table > tr > td > table > tr > td > table')

        try:
            for musical in extract:
                play = musical.select_one('tr > td > b > font > a')
                if play is not None:
                    play_no = [play['onclick'][10:16]]
                    text_strip = musical.text.strip()
                    info_parse = text_strip.split(':')

                    info_parse[0] = info_parse[0].rstrip('세부장르 \n\t\r')
                    info_parse[1] = info_parse[1].strip('일시 ')
                    info_parse[2] = info_parse[2].strip('장소 ')
                    info_parse[3] = info_parse[3].strip('출연 ')
                    info_parse[4] = info_parse[4].strip('Staff ')

                    if info_parse[3] in THEATRE_LIST:
                        date = parse_date(info_parse[2])  # 공연기간을 표시하는 string을 datetime 객체들로 변환
                        info = play_no + info_parse[0:2] + date + info_parse[3:]

                        num = info[0]
                        info = info + detail_crwl(num) + [desc_crwl(num)] + [poster_crwl(num)]
                        result.append(info)
        except IndexError:
            pass

    return result


musical_data = []

for i in range(2, 4):
    url = 'http://www.playdb.co.kr/playdb/playdblist.asp?sReqMainCategory=000001&sReqSubCategory=&sReqDistrict=&sReqTab=2&sPlayType={}'.format(
        i)
    musical_data.extend(musical(url))

if __name__ == "__main__":
    pprint(musical_data)
