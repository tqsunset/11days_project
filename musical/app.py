from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta

# @app.route('/')
# def home():
#     return render_template('index.html')

@app.route('/')
def home():
    return render_template('idx.html')


@app.route('/musicals', methods=['GET'])
def read_musicals():
    musicals = list(db.dbmusicals.find({}, {'_id':False}))
    # print(musicals)
    carousel = list(db.future.find({}, {'_id':False}))
    return jsonify({'musicals': musicals}, {'carousels':carousel})

@app.route('/detail')
def home1():
    return render_template('05_ghm.html')

@app.route('/carousel_ex')
def home2():
    return render_template('1_ex.html')

@app.route('/carousel_billy')
def home3():
    return render_template('2_billy.html')

@app.route('/carousel_hades')
def home4():
    return render_template('3_hades.html')



@app.route('/detail', methods=['GET'])
def show_detail():
    details = list(db.dbmusicals.find({}, {'_id':False}))
    # print(musicals)
    return jsonify({'db': details})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)