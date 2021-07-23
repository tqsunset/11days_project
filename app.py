# # API 설계
# # 리스팅API - 저장된 정보 보여주기
# #
# # A. 요청정보
# # 요청 url = user/, 요청방식 = Get
# # B. 서버가 제공할 기능
# # 요청 데이터 없음 : DB가 제공하는 정보 모두 다 표시
# # C.응답데이터
# # 뮤지컬을 대신한 가상정보(이름 나이) -> 검색결과 간단하게 단, 정확하게 나오는지 확인
# # (jason형식) 몽고디비 이용
#
# !!! 검색결과 보기 버튼에 Ajax를 call 하면 됨!!!

from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta

## HTML을 주는 부분
@app.route('/')
def home():
   return render_template('main_search.html')

@app.route('/info', methods=['GET'])
def listing():
    musicals = list(db.musicals.find({}, {'_id': False}))
    return jsonify({'all_musicals': musicals})

## API 역할을 하는 부분
@app.route('/memo', methods=['POST'])
def saving():
    title_receive = request.form['title_give']
    theater_receive = request.form['theater_give']
    acter_receive = request.form['acter_give']
    url_receive = request.form['url_give']
    img_receive = request.form['img_give']

    # headers = {
    #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    # data = requests.get(url_receive, headers=headers)
    #
    # soup = BeautifulSoup(data.text, 'html.parser')
    #
    # title = soup.select_one('meta[]')
    # theater = soup.select_one('meta[]')
    # acter = soup.select_one('meta[]')
    #
    # doc = {
    #     'image':image,
    #     'title':title,
    #     'theater':theater,
    #     'acter':acter
    # }
    #
    # db.musicals.insert_one(doc)
    #
    # return jsonify({'msg': '저장이 완료되었습니다!'})



if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)