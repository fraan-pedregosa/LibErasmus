import json
from jsonschema import validate
import sys

# Definir el esquema JSON
schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "experiencias": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "autor": {"type": "string"},
                    "paisDestino": {"type": "string"},
                    "ciudadDestino": {"type": "string"},
                    "universidadDestino": {"type": "string"},
                    "anioMovilidad": {"type": "integer"},
                    "gradoPrincipal": {"type": "string"},
                    "cursoMovilidad": {"type": "string"},
                    "idiomaDestino": {"type": "string"},
                    "idiomaClases": {"type": "string"},
                    "ambienteEstudiantil": {"type": "array","items": {"type": "string", "enum": ["Viajes", "Fiesta", "Tranquilo", "Internacional", "Cultural", "Deportivo", "Natural", "Histórico"]},    },
                    "nivelEconomico": {"type": "string", "enum": ["bajo", "medio", "alto"]},
                    "becaPercibida": {"type": "number"},
                    "gastoPromedioMensual": {"type": "number"},
                    "calidadConclusion": {"type": "string", "enum": ["muy buena", "buena", "mejorable", "mala"]},
                    "imagenesDestino": {"type": "array","items": {"type": "string", "format": "uri"}
          }
                
                },
                "required": [
                    "autor",
                    "paisDestino",
                    "ciudadDestino",
                    "universidadDestino",
                    "anioMovilidad",
                    "gradoPrincipal",
                    "idiomaDestino",
                    "idiomaClases",
                    "ambienteEstudiantil",
                ]
            }
        }
    },
    "required": ["experiencias"]
}

# Verificar si se proporciona un nombre de archivo como argumento
if len(sys.argv) != 2:
    print("Por favor, proporciona el nombre del archivo JSON como argumento.")
    sys.exit(1)

archivo_json = sys.argv[1]

# Cargar el archivo JSON que quieres validar
try:
    with open(archivo_json, "r") as file:
        data = json.load(file)
except FileNotFoundError:
    print(f"El archivo {archivo_json} no fue encontrado.")
    sys.exit(1)
except json.JSONDecodeError:
    print(f"Error al decodificar el archivo JSON: {archivo_json}")
    sys.exit(1)

# Validar el JSON con el esquema
try:
    validate(data, schema)
    print(f"El archivo JSON {archivo_json} sigue el esquema.")
except Exception as e:
    print(f"Error al validar el archivo JSON {archivo_json}: {e}")
    sys.exit(1)
