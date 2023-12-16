import requests

def agregar_imagen_a_experiencia(experiencia_id, ruta_imagen):
    url_api = "http://localhost:5000/api/data/up_img"  # Reemplaza con la URL de tu API
    archivos = {'img': ('nombre_archivo.jpg', open(ruta_imagen, 'rb'), 'image/jpeg')}
    datos = {'experiencia_id': experiencia_id}

    try:
        response = requests.post(url_api, files=archivos, data=datos)
        response_data = response.json()
        if response.status_code == 200:
            print(f"Imagen agregada correctamente: {response_data['message']}")
        else:
            print(f"Error al agregar imagen: {response_data['error']}")
    except Exception as e:
        print(f"Error de conexión: {str(e)}")

def borrar_imagen(experiencia_id,nombre_imagen):
    url_api = "http://localhost:5000/api/data/delete_img"  # Reemplaza con la URL de tu API
    datos = {'experiencia_id': experiencia_id,'nombre_imagen':nombre_imagen}

    try:
        response = requests.post(url_api, data=datos)
        response_data = response.json()
        if response.status_code == 200:
            print(f"Imagen borrada correctamente: {response_data['message']}")
        else:
            print(f"Error al borrar imagen: {response_data['error']}")
    except Exception as e:
        print(f"Error de conexión: {str(e)}")


# Uso de la función
experiencia_id = "6576d6610d02e0a2fb0af0b7"
ruta_imagen = "./datos_prueba/WhatsApp Image 2019-07-23 at 12.10.14.jpeg"  # Reemplaza con la ruta de tu imagen
agregar_imagen_a_experiencia(experiencia_id, ruta_imagen)

# Pulsar espacio para continuar
input("\nPresiona la tecla espacio para continuar...")
# --------------------------------------------------------------------------------

#Borrar imagen 
borrar_imagen(experiencia_id,"6576d6610d02e0a2fb0af0b7_img5_1702291532.jpeg")
