from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta #dbsparta에 db를 넣는다.


def musical():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

    for i in range(2, 4):
        data = requests.get(
            'http://www.playdb.co.kr/playdb/playdblist.asp?sReqMainCategory=000001&sReqSubCategory=&sReqDistrict=&sReqTab=2&sPlayType={}&sStartYear=&sSelectType={}'.format(
                i, i), headers=headers)

        page = BeautifulSoup(data.text, 'html.parser')

        # print(page)
        trs = page.select('#contents > div.container1 > table > tr')
        movieTable = trs[10]
        extract = movieTable.select('td > table > tr > td > table > tr > td > table > tr > td > table')
        try:
            for table in extract:
                playName = table.select_one('tr > td > b > font > a')
                if playName is not None:  #
                    info = table.text.strip()
                    infoParse = info.split(':')
                    #                 print(len(infoParse))

                    infoParse[0] = infoParse[0].rstrip('세부장르 \n\t\r')
                    infoParse[1] = infoParse[1].strip('일시 ')
                    infoParse[2] = infoParse[2].strip('장소 ')
                    infoParse[3] = infoParse[3].strip('출연 ')

                    infoParse[4] = infoParse[4].strip('Staff ')
                    print(infoParse[0])
                    print(infoParse[3])
                    print(infoParse[4])

                    #                 title.join(infoParse[0])
                    #                 location = infoParse[3]
                    #                 date = infoParse[1]
                    #                 character = infoParse[4]

                    doc = {
                        'title': infoParse[0],
                        'location': infoParse[3],
                        'date': infoParse[2],
                        'character': infoParse[4]

                    }

                    db.newtickets.insert_one(doc)


        except IndexError:
            pass

if __name__ == "__main__":
    print()
