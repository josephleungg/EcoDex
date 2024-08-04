import os
import json
from bson import ObjectId
from datetime import datetime
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
from PIL import Image
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
        image = Image.open(file)
        if image.format != 'JPEG' or image.format != 'JPG':
            image = image.convert('RGB')
            file_path = os.path.join('/tmp', file.filename.rsplit('.', 1)[0] + '.jpeg')
            image.save(file_path, 'JPEG')
        else:
            if os.name == 'nt':  # Windows
                file_path = os.path.join('.', file.filename)
            else:  # Unix-based systems (like Linux and macOS)
                file_path = os.path.join('/tmp', file.filename)
            file.save(file_path)

        image = imgurUpload(file_path)
        print('got image file')
        today = str(datetime.today().date())

        response = openApiCall(key, image)

        print(response.message.content)

        try:
            #Parsing the response into a dictionary
            responseTemp = response.message.content
            response.message.content = response.message.content.replace('\n', '').replace('*','').split('content=', 1)[-1].split(', role=',1)[0]
            if(response.message.content == responseTemp):
                return jsonify({"error": "Invalid photo content"}), 400
            substrings = ['Description', 'Type of Waste', 'Biodegradable', 'Decompose Time', 'Approximate Weight', 'Dimensions', 'Amount of Liters of Water to Produce']

            #adds double quotes around the fields
            for substring in substrings:
                response.message.content = response.message.content.replace(substring, ', \"' + substring + '\"')
            response.message.content = response.message.content.replace(', \"', '\", \"').replace(': ', ': \"')
            response.message.content = response.message.content.replace('Title', '\"Title\"')
            response.message.content = '{\"' + response.message.content[1:-1] + '\" , \"image\": \"' + image + '\", \"date\": \"' + today + '\"}'
        except json.JSONDecodeError as e:
            print(f"JSONDecodeError: {e}")
            return jsonify({"error": "Invalid photo content"}), 400
        except Exception as e:
            print(f"Unexpected error: {e}")
            return jsonify({"error": "An unexpected error occurred"}), 500
        
        collection = atlas_client.get_collection('Tokens')
        token_id = ObjectId("66aebc350f395a956c3c050b")
        token_doc = collection.find_one({'_id': token_id})

        print(token_doc)

        if token_doc is not None and 'balance' in token_doc:
            new_balance = int(token_doc['balance']) + 1
            collection.update_one({'_id': token_id}, {'$set': {'balance': new_balance}})
        else:
            print("Token document not found or 'balance' field is missing")

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


@app.route('/fetchbalance', methods=['GET'])
def fetch_balance():
    collection = atlas_client.get_collection('Tokens')
    token_id = ObjectId("66aebc350f395a956c3c050b")
    token_doc = collection.find_one({'_id': token_id})

    print(token_doc)

    if token_doc is not None and 'balance' in token_doc:
        new_balance = int(token_doc['balance']) + 1
        collection.update_one({'_id': token_id}, {'$set': {'balance': new_balance}})
    else:
        print("Token document not found or 'balance' field is missing")
    
    return jsonify({"balance": new_balance})

if __name__ == '__main__':
    app.run(debug=True)