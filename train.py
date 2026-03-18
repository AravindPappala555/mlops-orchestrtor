import pandas as pd
data = pd.read_csv('dataset/chatbot.csv')

x = data['text']
y = data['intent']

from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer()
x_vec = cv.fit_transform(x)

from sklearn.naive_bayes import MultinomialNB
mnb = MultinomialNB()
mnb.fit(x_vec,y)
print('Training completed successfully!')

import joblib
joblib.dump(mnb,"model/chatbot.pkl")
print("ML Model saved as chatbot.pkl")
joblib.dump(cv,"model/vector.pkl")
print("Vector model is saved as Vector.pkl")

import joblib
mnb = joblib.load('model/chatbot.pkl')
cv = joblib.load('model/vector.pkl')
print("Chatbot is started")
while True:
    user = input("User: ")
    if user.lower()=="exit":
        break
    user_vec = cv.transform([user])
    predict = mnb.predict(user_vec)[0]
    print(f"Bot: {predict}")
