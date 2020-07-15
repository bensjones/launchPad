from flask import Flask, jsonify
import simplejson as json
import fetchdata 

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

if __name__ == "__main__":
    app.run()
