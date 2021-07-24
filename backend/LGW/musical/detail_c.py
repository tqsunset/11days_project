from bs4 import BeautifulSoup
import requests
from pprint import pprint

test_numb = '165030'
url = 'http://www.playdb.co.kr/playdb/playdbDetail.asp?sReqPlayno={}'.format(test_numb)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get(url, headers=headers)
page = BeautifulSoup(data.text, 'html.parser')
detail_contents = page.select('#wrap > #contents > div.left > #detailcontents > #DivBasic > div.detail_contents > div.detail_contentsbox')
cast_table = []

for element in detail_contents:
    section_name = element.select_one('div > h4 > img')['alt']

    if section_name == '출연진':
        cast_table = element.select('table > tr')


def actor_info_parse(tr):
    char_name = tr.select_one('td >  table > tr > td > b').text
    aes = tr.select('td >  table > tr > td > a')
    actor_info = []

    for a in aes:
        img = a.select_one('img')
        if img is None:
            actor_info.append(a.text)
        else:
            actor_info.append(img['src'])
    return actor_info

for tr in cast_table:
    print(actor_info_parse(tr))