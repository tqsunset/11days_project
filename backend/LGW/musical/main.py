from bs4 import BeautifulSoup
import requests
from pprint import pprint   # print의 읽기 쉬운 버전

# 대극장 리스트
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

# 현재 공연 중 리스트 1페이지 & 2페이지 주소
open_url1 = 'http://www.playdb.co.kr/playdb/playdblist.asp?sReqMainCategory=000001&sReqSubCategory=&sReqDistrict=&sReqTab=2&sPlayType=2&sStartYear=&sSelectType=2'
open_url2 = 'http://www.playdb.co.kr/playdb/playdblist.asp?Page=2&sReqMainCategory=000001&sReqSubCategory=&sReqDistrict=&sReqTab=2&sPlayType=2&sStartYear=&sSelectType='

# 개막예정 리스트 1페이지 & 2페이지 주소
coming_url1 = 'http://www.playdb.co.kr/playdb/playdblist.asp?Page=1&sReqMainCategory=000001&sReqSubCategory=&sReqDistrict=&sReqTab=2&sPlayType=3&sStartYear=&sSelectType=1'
coming_url2 = 'http://www.playdb.co.kr/playdb/playdblist.asp?Page=2&sReqMainCategory=000001&sReqSubCategory=&sReqDistrict=&sReqTab=2&sPlayType=3&sStartYear=&sSelectType=1'


def parse_musicals(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url, headers=headers)
    page = BeautifulSoup(data.text, 'html.parser')
    result = []

    trs = page.select('#contents > div.container1 > table > tr')
    musical_table = trs[10]
    musical_extract = musical_table.select('td > table > tr > td > table > tr > td > table > tr > td > table')

    for musical in musical_extract:
        play_name = musical.select_one('tr > td > b > font > a')
        if play_name is not None:
            info = musical.text.strip()
            info_parsed = info.split(':')

            info_parsed[0] = info_parsed[0].rstrip('세부장르 \n\t\r')
            info_parsed[1] = info_parsed[1].strip('일시 ')
            info_parsed[2] = info_parsed[2].strip('장소 ')
            info_parsed[3] = info_parsed[3].strip('출연 ')

            if len(info_parsed) > 4:
                info_parsed[4] = info_parsed[4].strip('Staff ')
            elif len(info_parsed) > 5:
                info_parsed[5] = info_parsed[5].strip()

            if info_parsed[3] in THEATRE_LIST:  # if 1 in (1, 2, 3, 4): "(1, 2, 3, 4)의 원소 중 1이 있으면", 대극장에 속하지 않는 공연 필터링
                result.append(info_parsed)

    return result


list1 = parse_musicals(open_url1)
list2 = parse_musicals(open_url2)
list1.extend(list2)         # 공연중 리스트 1페이지와 2페이지를 합침
full_list = list1

if __name__ == "__main__":  # 다른 모듈에서 이 모듈을 import할 때에는 본문을 실행하지 않는다
    pprint(full_list)









