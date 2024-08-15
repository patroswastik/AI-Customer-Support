import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize the Google Gemini model with the API key from the environment variables
llm = ChatGoogleGenerativeAI(model='gemini-pro', temperature=0.9)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('userInput', '')

    # Send the user input to the Google Gemini model via LangChain
    response = llm.invoke(user_input)
    
    # Return the generated content as a JSON response
    return jsonify({'response': response.content})

if __name__ == '__main__':
    app.run(debug=True)
