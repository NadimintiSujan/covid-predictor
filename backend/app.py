from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict

app = Flask(__name__)
CORS(app)  # allows frontend (React) to access this backend

@app.route("/predict", methods=["POST"])
def predict_covid():
    data = request.get_json()
    result = predict(data)
    return jsonify({"severity": result})

if __name__ == "__main__":
    #app.run(debug=True)
    app.run(host="0.0.0.0", port=5000)

