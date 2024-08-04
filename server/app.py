import os
import json
from bson import ObjectId
from datetime import datetime
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
from helpers.openAPICalls import openApiCall
from helpers.imgurAPIUpload import imgurUpload
import certifi

class AtlasClient():

   def __init__ (self, altas_uri, dbname):
       self.mongodb_client = MongoClient(altas_uri, tlsCAFile=certifi.where())
       self.database = self.mongodb_client[dbname]

   ## A quick way to test if we can connect to Atlas instance
   def ping (self):
       self.mongodb_client.admin.command('ping')

   def get_collection (self, collection_name):
       collection = self.database[collection_name]
       return collection

   def find (self, collection_name, filter = {}, limit=0):
       collection = self.database[collection_name]
       items = list(collection.find(filter=filter, limit=limit))
       return items

load_dotenv(".env")

ATLAS_URI = os.getenv('MONGOURL')
DB_NAME = 'TEST'

atlas_client = AtlasClient (ATLAS_URI, DB_NAME)
atlas_client.ping()
print ('Connected to Atlas instance! We are good to go!')

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/uploadImage', methods=['PUT'])
def upload_image():
    key = os.environ.get("OPENAI_API_KEY")
    if 'file' not in request.files:
        return "No file part", 400

    file = request.files['file']

    if file.filename == '':
        return "No selected file", 400

    if file:
        if os.name == 'nt':  # Windows
            file_path = os.path.join('.', file.filename)
        else:  # Unix-based systems (like Linux and macOS)
            file_path = os.path.join('/tmp', file.filename)

    file.save(file_path)
    image = imgurUpload(file_path)
    print('got image file')
    today = str(datetime.today().date())
    response = openApiCall(key, image)
    
    #Parsing the response into a dictionary
    response.message.content = response.message.content.replace('\n', '').replace('*','').split('content=', 1)[-1].split(', role=',1)[0]
    substrings = ['Description', 'Type of Waste', 'Biodegradable', 'Decompose Time', 'Approximate Weight', 'Dimensions', 'Amount of Liters of Water to Produce']
    
    #adds double quotes around the fields
    for substring in substrings:
        response.message.content = response.message.content.replace(substring, ', \"' + substring + '\"')
    
    #adds double quotes around the values
    response.message.content = response.message.content.replace(', \"', '\", \"').replace(': ', ': \"')
    response.message.content = response.message.content.replace('Title', '\"Title\"')
    response.message.content = '{\"' + response.message.content[1:-1] + '\" , \"image\": \"' + image + '\", \"date\": \"' + today + '\"}'

    collection = atlas_client.get_collection('Image Attributes')
    result = collection.insert_one(json.loads(response.message.content))

    # Create a response object
    response_data = {
        "inserted_id": str(result.inserted_id),
        "ok": True
    }

    print(response_data)

    # Return the response as JSON
    return jsonify(response_data)

@app.route('/fetchhistory', methods=['GET'])
def fetch_history():
    collection = atlas_client.get_collection('Image Attributes')
    items = list(collection.find())

    # Convert ObjectId to string and strip trailing spaces from each field
    for item in items:
        item['_id'] = str(item['_id'])
        for key, value in item.items():
            if isinstance(value, str):
                item[key] = value.rstrip()

    return jsonify(items)

@app.route('/getitem', methods=['POST'])
def fetch_item():
    data = request.json  # Or request.form if sending form data
    id_str = data.get('id')
    if not id_str:
        return jsonify({"error": "No ID provided"}), 400
    
    try:
        # Convert id_str to ObjectId
        item_id = ObjectId(id_str)
    except Exception as e:
        return jsonify({"error": f"Invalid ID format: {e}"}), 400

    try:
        item = atlas_client.get_collection('Image Attributes').find_one({'_id': item_id})
        if not item:
            return jsonify({"error": "Item not found"}), 404

        # Convert ObjectId to string
        item['_id'] = str(item['_id'])
        
        return jsonify(item)
    except Exception as e:
        return jsonify({"error": f"Database error: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)