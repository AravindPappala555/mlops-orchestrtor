# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load your models
with open('vector.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('chatbot.pkl', 'rb') as f:
    chatbot_model = pickle.load(f)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    # Vectorize the message
    vector = vectorizer.transform([user_message])
    
    # Get response from chatbot model
    response = chatbot_model.predict(vector)[0]
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)