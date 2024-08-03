import os
from flask import Flask, request
from pymongo import MongoClient
from dotenv import load_dotenv
from helpers.openAPICalls import openApiCall

class AtlasClient():

   def __init__ (self, altas_uri, dbname):
       self.mongodb_client = MongoClient(altas_uri)
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

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/testpayload/text', methods=['POST'])
def test_payload_text():
    collection = atlas_client.get_collection('test')
    collection.insert_one({'text': 'adasfsfds'})
    return "Success"

@app.route('/uploadImage', methods=['POST'])
def upload_image():
    key = os.environ.get("OPENAI_API_KEY")
    response = openApiCall(key)
    print(response)
    return "COOL!"

if __name__ == '__main__':
    app.run(debug=True)