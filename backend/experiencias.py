import json
from pymongo import MongoClient
from bson import ObjectId

## SCRIPT PARA AÑADIR EXPERIENCIAS A MANO DESDE JSON

# MongoDB Configuration
mongo_uri = "mongodb://localhost:27017/"
database_name = "liberamus"
collection_name = "experiencias"

# MongoDB Connection
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

def agregar_id_y_insertar(elemento):
    for experiencia in elemento.get("experiencias", []):
        # Add an "_id" field with a unique ObjectId
        experiencia["_id"] = str(ObjectId())
        # Insert the document into the database
        collection.insert_one(experiencia)

def procesar_json(nombre_archivo):
    with open(nombre_archivo, 'r') as archivo:
        datos_json = json.load(archivo)
        agregar_id_y_insertar(datos_json)

if __name__ == "__main__":
    # Replace "archivo.json" with the name of your JSON file
    nombre_archivo_json = "datos_prueba/experiencias.json"
    procesar_json(nombre_archivo_json)

    print("Data inserted into MongoDB.")
