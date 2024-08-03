import os
from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv

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

ATLAS_URI = "mongodb+srv://" + os.getenv('MOGNOUSERNAME') + ":" + os.getenv('MONGOPASSWORD') + "@test.f0kzruq.mongodb.net/?retryWrites=true&w=majority&appName=TEST"
DB_NAME = 'TEST'


atlas_client = AtlasClient (ATLAS_URI, DB_NAME)
atlas_client.ping()
print ('Connected to Atlas instance! We are good to go!')

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)