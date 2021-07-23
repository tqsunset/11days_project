from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta

searching = db.musicals.find({ 'title': {'$regex': '광화문'} })

for musical in searching:
    print(musical['title'])


# 몽고DB 모든 필드를 범위로 검색하는 검색식, '광화문' 자리에 '검색창 입력값'을 불러오도록 연결해야한다.



musicals = list(db.musicals.find({}, {'_id': False}))
    return jsonify({'all_musicals':musicals})

# 앱파이 POST 에서 잘 돌아가는 find 문법