from pymongo import MongoClient
import main

client = MongoClient('localhost', 27017)
db = client.dbsparta

with_staff = ['num', 'title','genre', 'start_date', 'end_date', 'location', 'cast', 'staff', 'cast_detail' , 'link', 'desc', 'img_url'] #DB입력을 위한 키 생성 (스태프 정보 있을 시)
without_staff = ['num', 'title','genre', 'start_date', 'end_date', 'location', 'cast', 'cast_detail' , 'link', 'desc', 'img_url'] #DB입력을 위한 키 생성 (스태프 정보 없을 시)

lists = main.musical_data  #app.py에서 공연중+공연예정 리스트가 저장된 musical_data 가져옴

for list in lists:
    keys = []
    if len(list) < 12:
        keys = without_staff
    else:
        keys = with_staff

    list = dict(zip(keys, list))        # 같은 인덱스를 가지는 keys와 list의 값끼리 묶어 딕셔너리 생성
    print(list)
    db.musicals.insert_one(list)        # musicals 컬렉션에 하나씩 추가