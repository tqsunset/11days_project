from bs4 import BeautifulSoup
import requests
from pprint import pprint

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


#
def detail_crwl(num):
    url = 'http://www.playdb.co.kr/playdb/playdbDetail.asp?sReqPlayno={}'.format(num)

    data = requests.get(url, headers=headers)
    page = BeautifulSoup(data.text, 'html.parser')

    # 상세페이지 캐스트 정보 크롤링
    detail_contents = page.select(
        '#wrap > #contents > div.left > #detailcontents > #DivBasic > div.detail_contents > div.detail_contentsbox')
    cast_table = []

    for element in detail_contents:
        section_name = element.select_one('div.title > h4 > img')['alt']

        if section_name == '출연진':
            cast_table = element.select('div > table > tr')  # table[width="650"]

    detail_cast = list(map(actor_info_parse, cast_table))

    # 상세페이지 링크 크롤링
    links = page.select('#wrap > div.pddetail > div.pddetail_info > div.detaillist > p > a ')
    # select_one 사용시 에러 발생하는 뮤지컬 있음
    linked = ''

    for link in links:
        if link.select_one('a > img') is not None:
            linked = link['href']

    return [detail_cast, linked]


def actor_info_parse(tr):
    char_name = tr.select_one('tr > td >  table > tr > td > b').text
    aes = tr.select('td >  table > tr > td > a')
    actor_info = []

    for a in aes:
        img = a.select_one('img')
        if img is None:
            actor_info.append(a.text)
        else:
            actor_info.append(img['src'])

    pairs = partition(actor_info)

    return {char_name: pairs}


def partition(input):
    result = []
    pairs = int(len(input) / 2)
    for i in range(0, pairs):
        result.append([['name', input[2 * i + 1]], ['img', input[2 * i]]])

    return list(map(dict, result))


# 작품설명 크롤링
def desc_crwl(num):
    url = 'https://www.playdb.co.kr/playdb/playdbDetail_Content.asp?TabKind=2&PlayNo='
    data = requests.get(url + num, headers=headers)
    page = BeautifulSoup(data.text, 'html.parser')
    text = page.find("td", "news").text

    return text


# 포스터 크롤링
def poster_crwl(num):
    url = 'http://www.playdb.co.kr/playdb/playdbDetail.asp?sReqPlayno='
    data = requests.get(url + num, headers=headers)
    page = BeautifulSoup(data.text, 'html.parser')
    img_url = page.select_one('#wrap > div.pddetail > h2 > img')['src']

    return img_url



if __name__ == "__main__":
    test_numb = '165030'
    # pprint(detail_crwl(test_numb))

    poster_crwl(test_numb)