from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index-1.html')

@app.route('/musicals', methods=['GET'])
def read_musicals():
    musicals = list(db.musicals.find({}, {'_id':False}))
    # print(musicals)
    return jsonify({'musicals': musicals})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)