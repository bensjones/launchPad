from flask import Flask, jsonify, request
import simplejson as json
import fetchdata
from vote import Vote

app = Flask(__name__)


@app.route("/")
def index():
    return "flask working"


@app.route("/fetch")
def fetch_data():
    x = fetchdata.main()
    response = app.response_class(
        response=json.dumps(x),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/vote', methods=['GET', 'POST'])
def vote():
    data = request.json
    x = {'submission': 'successful'}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    vote = Vote()
    vote.cast(data['session'], data['email'], data['framework'])
    return response


@app.route('/tally', methods=['GET', 'POST'])
def tally():
    votes = Vote()
    data = votes.tally()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == "__main__":
    app.run()
