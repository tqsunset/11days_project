import datetime
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
# client = MongoClient('mongodb://test:test@localhost', 27017)

db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/musicals/page', methods=['GET'])
def musical_detail():
    num_receive = request.args.get('num')
    print('received musical id:', num_receive)
    return render_template('detail.html', num=num_receive)

# API

@app.route('/musicals/detail', methods=['GET'])
def show_musical_detail():
    num_receive = request.args.get('num')
    musical = db.musicals.find_one({'num': num_receive}, {'_id': False})
    return jsonify({'musical': musical})

@app.route('/musicals', methods=['GET'])
def read_musicals():
    type_receive = request.args.get('type')
    print('requested musical type: ', type_receive)
    now = datetime.datetime.now()

    if type_receive == 'coming':
        # musicals = 'coming'
        musicals = list(db.musicals.find({'start_date': {"$gt": now}}, {'_id': False}))
    elif type_receive == 'onshow':
        # musicals = 'onshow'
        musicals = list(db.musicals.find({}, {'_id': False}))
    else:
        # musicals = 'else'
        musicals = list(db.musicals.find({}, {'_id': False}))

    print('musicals: ', musicals)
    return jsonify({'musicals': musicals})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)










