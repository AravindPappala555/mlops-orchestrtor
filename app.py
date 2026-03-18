from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__)

# Load ML model
mnb = joblib.load('model/chatbot.pkl')
cv = joblib.load('model/vector.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_msg = request.json['message']
    vec = cv.transform([user_msg])
    prediction = mnb.predict(vec)[0]
    return jsonify({'response': prediction})

if __name__ == '__main__':
    app.run(debug=True)
