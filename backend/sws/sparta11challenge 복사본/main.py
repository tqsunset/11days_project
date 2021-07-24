from pymongo import MongoClient
import main

client = MongoClient('localhost', 27017)
db = client.dbsparta #dbsparta에 db를 넣는다.