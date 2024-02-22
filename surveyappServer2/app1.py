import sys
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
@cross_origin()
def hello_world():
    print('server on', file=sys.stderr)
    return '<p>testing server</p>'

@app.route('/data',methods=['POST'])
@cross_origin()
def receive_data():
    # content = request.json
    # print(content,file=sys.stderr)
    data = request.json
    print(data,file=sys.stderr)
    return jsonify(data),200

if __name__ == '__main__':
    app.run(debug=True)