from pymongo import MongoClient
import app

client = MongoClient('localhost', 27017)
db = client.dbsparta

keys = ['num','title','genre', 'date', 'location', 'cast', 'staff', ] #DB입력을 위한 키 생성

lists = app.musical_data  #app.py에서 공연중+공연예정 리스트가 저장된 musical_data 가져옴

for list in lists:
    list = dict(zip(keys, list))        # 같은 인덱스를 가지는 keys와 list의 값끼리 묶어 딕셔너리 생성
    print(list)
    # db.musicals.insert_one(list)        # musicals 컬렉션에 하나씩 추가