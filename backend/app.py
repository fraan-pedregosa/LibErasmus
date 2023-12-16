import datetime
import time
import requests
from flask import Flask, jsonify, request, render_template, session, redirect, url_for, flash
from pymongo import MongoClient 
from flask_pymongo import PyMongo
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_login import (
    LoginManager,
    login_required,
    login_user,
    current_user,
    logout_user,
    UserMixin
)

from flask_cors  import CORS 
from models import User, Experiencia, SignupForm, LoginForm, ExperienciaForm, Sesiones, Sesion
from werkzeug.urls import url_parse
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = '7110c8ae51a4b5af97be6534caef90e4bb9bdcb3380af008f90b23a5d1616bf319bc298105da20fe' ## No parece muy secreta aqui jijiji


# Configuración de la aplicación
app.config['MONGO_URI'] = "mongodb://mongodb:27017/"
app.config['MONGO_DBNAME'] = "liberamus"
app.config['MONGO_COLLECTION'] = "experiencias"
app.config['MONGO_COLLECTION_USUARIOS'] = "usuarios"
app.config['MONGO_COLLECTION_SESIONES'] = "sesiones"

mongo = PyMongo(app)

# Configuración de Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.init_app(app)

CORS(app, origins=["http://localhost:5173", "http://localhost", "*"], supports_credentials=True) # Para permitir peticiones desde el frontend

@app.route('/')
def index():
    return jsonify({"message": "¡La conexión a la base de datos fue exitosa!"})

# Ruta para obtener datos por _id
@app.route('/api/data/<string:item_id>', methods=['GET'])
def get_json(item_id):
    try:
        client = MongoClient(app.config['MONGO_URI'])

        # Conexión a MongoDB usando las variables de configuración
        collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]


        document = collection.find_one({"_id": item_id})
        # Resto del código...

        return jsonify(document)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})

    finally:
        client.close()

@app.route('/api/data/get_exps', methods=['GET'])
def get_exps():
    try:
        client = MongoClient(app.config['MONGO_URI'])

        # Conexión a MongoDB usando las variables de configuración
        collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]

        # Obtener todos los documentos en la colección
        documents = list(collection.find())
        
        # Convertir los documentos a un formato JSON
        result = [{"_id": str(doc["_id"]), "Autor": doc["autor"], "Pais": doc["paisDestino"], "Ciudad":doc["ciudadDestino"], "Anio": doc["anioMovilidad"], "Universidad": doc["universidadDestino"]} for doc in documents]

        return jsonify(result)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})

    finally:
        client.close()



@app.route('/api/add_item', methods=['POST'])
def add_item():
    try:
        data = request.get_json()

        name = data.get('name')
        description = data.get('description')

        # Resto del código...

        return jsonify({"message": "Item added successfully"})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})
    

# Implementación del registro de usuarios **********************************************************************************************************************


# MongoDB Configuration
mongo_uri = "mongodb://localhost:27017/"
database_name = "liberamus"
collection_name = "usuarios"

def get_usr_db():
    client = MongoClient(app.config['MONGO_URI'])
    collection_usuarios = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION_USUARIOS']]
    return collection_usuarios

def get_sesion_db():
    client = MongoClient(app.config['MONGO_URI'])
    collection_sesiones = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION_SESIONES']]
    return collection_sesiones
db = get_sesion_db()

app.config['SESSIONS'] = Sesiones(db)
#Funciones base
def get_user_by_email(email):
    user_data = get_usr_db().find_one({"email": email})
    if user_data:
        return User(str(user_data["_id"]), user_data["name"], user_data["email"], user_data["password"], user_data["is_admin"], user_data["favoritas"])
    else:
        return None

def get_user_by_id(id):
    
    user_data = get_usr_db.find_one({"_id": ObjectId(id)})
    if user_data:
        return User(str(user_data["_id"]), user_data["name"], user_data["email"], user_data["password"], user_data["is_admin"], user_data["favoritas"])
    else:
        return None

#Funciones de registro
def signup(name, email, password):
    # Verificar que no exista un usuario con el mismo correo

    collection_usuarios = get_usr_db()
    existing_user = collection_usuarios.find_one({"email": email})
    if existing_user:
        return None

    # Crear el nuevo usuario
    new_user_data = {
        "name": name,
        "email": email,
        "password": generate_password_hash(password),
        "is_admin": False, # Por defecto, los usuarios no son administradores
        "favoritas": [] # Lista de IDs de experiencias favoritas
    }
    
    result = collection_usuarios.insert_one(new_user_data)

    if result.inserted_id:
        user = User(str(result.inserted_id), name, email, password, favoritas=[])  # Crear el objeto User
        return user
    else:
        return None


#REQUESTS----------------------------------------------------------------------------------------------------------------------------
@app.route('/api/usr/login', methods=['POST'])
def login_usr():
    try: 
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        # Obtener el usuario de la base de datos

        
        user_data = get_usr_db().find_one({"email": email})

        if user_data and check_password_hash(user_data["password"], password):
            user = User(str(user_data["_id"]), user_data["name"], user_data["email"], user_data["password"], user_data["is_admin"], user_data["favoritas"])
            login_user(user)
            return jsonify({"id": user.id,"admin":user.is_admin}), 200
        else:
            return jsonify({"error": "Credenciales incorrectas"}), 401
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    

    
# Registro de usuarios por request
@app.route('/api/usr/signup', methods=['POST'])
def signup_usr():
    try:
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # Verificar que no exista un usuario con el mismo correo
        collection_usuarios = get_usr_db()
        existing_user = collection_usuarios.find_one({"email": email})
        if existing_user:
            return jsonify({"error": "El correo ya está registrado. Inicia sesión si ya tienes una cuenta."}), 409

        # Crear el nuevo usuario
        new_user_data = {
            "name": name,
            "email": email,
            "password": generate_password_hash(password),
            "is_admin": False, # Por defecto, los usuarios no son administradores
            "favoritas": [] # Lista de IDs de experiencias favoritas
        }
        
        result = collection_usuarios.insert_one(new_user_data)
    
        #return jsonify({"message": "Usuario creado exitosamente"})
        user = User(str(result.inserted_id), name, email, password, favoritas=[])  # Crear el objeto User
        login_user(user, duration=datetime.timedelta(hours=1))
        return jsonify({"message": "Usuario creado exitosamente"}), 201
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Logout de usuarios por request
@app.route('/api/usr/logout', methods=['POST'])
@login_required
def logout_usr():
    try:
        logout_user()
        return jsonify({"message": "Sesion cerrada"}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})

#FIN REQUETS----------------------------------------------------------------------------------------------------------------------------
# Ruta de login
@app.route('/login', methods=['POST'])
def login_form():

    if current_user.is_authenticated:
        return redirect(url_for('experiencias'))     # Redirigir al usuario a la página principal
    
    form = LoginForm()

    client = MongoClient(app.config['MONGO_URI'])

    # Conexión a MongoDB usando las variables de configuración
    collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION_USUARIOS']]

    if request.method == 'POST':
        email = form.email.data
        password = form.password.data

        # Obtener el usuario de la base de datos
        user_data = collection.find_one({"email": email})

        if user_data and check_password_hash(user_data["password"], password):
            user = User(str(user_data["_id"]), user_data["name"], user_data["email"], user_data["password"], user_data["is_admin"], user_data["favoritas"])
            login_user(user)

            return redirect(url_for('experiencias')) # Redirigir al usuario a la página principal
        else:
            flash("Usuario o contraseña incorrectos", "error")
            
    return render_template("login_form.html", form=form)


# Ruta de registro de usuarios
@app.route("/registro", methods=["GET", "POST"])
def registro():

    # Verificar si el usuario ya está autenticado
    if current_user.is_authenticated:
        return redirect(url_for('index'))     # Redirigir al usuario a la página principal

    form = SignupForm()

    client = MongoClient(app.config['MONGO_URI'])

    # Conexión a MongoDB usando las variables de configuración
    collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION_USUARIOS']]

    if request.method == 'POST':
        # Obtener los datos del formulario
        name = form.name.data
        email = form.email.data
        password = form.password.data

        
        # Verificar que no exista un usuario con el mismo correo
        existing_user = collection.find_one({"email": email})
        if existing_user:
            flash("El correo ya está registrado. Inicia sesión si ya tienes una cuenta.", "error")
            return redirect(url_for('registro'))
        
        # Crear el nuevo usuario
        new_user_data = {
            "name": name,
            "email": email,
            "password": generate_password_hash(password),
            "is_admin": False, # Por defecto, los usuarios no son administradores
            "favoritas": [] # Lista de IDs de experiencias favoritas
        }
        
        result = collection.insert_one(new_user_data)
    
        #return jsonify({"message": "Usuario creado exitosamente"})
        user = User(str(result.inserted_id), name, email, password, favoritas=[])  # Crear el objeto User
        login_user(user)
        return redirect(url_for('index')) # Redirigir al usuario a la página principal
            
    return render_template("signup_form.html", form=form)

# Cargar usuario por ID
@login_manager.user_loader
def load_user(user_id):
    user_data = get_usr_db().find_one({"_id": ObjectId(user_id)})
    if user_data:
        return User(str(user_data["_id"]), user_data["name"], user_data["email"], user_data["password"], user_data["is_admin"], user_data["favoritas"])
    else:
        return jsonify("Usuario no encontrado.", "error")
    return None

@app.route('/api/usr/is_admin', methods=['POST'])
@login_required
def is_admin():
    try:
        return jsonify({"isAdmin": current_user.is_admin})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})
    
@app.route('/logout')
def logout():
    """
    Clear the session and display a flash message to confirm the user has been logged out
    """
    logout_user()
    return jsonify({"message": "Sesion cerrada"})

@app.route('/check_auth')
def check_authentication():
    if current_user.is_authenticated:
        return jsonify(auth=True, nombre=current_user.name), 200
    else:
        return jsonify(auth=False, nombre=None)
    

# Nueva ruta para mostrar si el usuario está logeado
@app.route('/estado')
def estado():
    return render_template('estado.html', usuario=current_user)

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify(auth=False, nombre=None), 401

@app.route('/api/data/up_img', methods=['POST'])
@login_required
def up_img():
    try:
        # Obtener datos del formulario (incluyendo la imagen)
        experiencia_id = request.form.get('experiencia_id')
        img = request.files.get('img')

        if not experiencia_id or not img:
            return jsonify({"error": "Se requiere 'experiencia_id' que exista y 'img' en la solicitud"})
        
        # Verificar que la experiencia exista

        client = MongoClient(app.config['MONGO_URI'])

        # Conexión a MongoDB usando las variables de configuración

        collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]

        experiencia = collection.find_one({"_id": experiencia_id})

        if not experiencia:
            return jsonify({"error": f"La experiencia con id '{experiencia_id}' no existe"})
        

        num_imagenes = len(experiencia.get("imagenes", []))

        # Generar un nombre de archivo único con timestamp y número de imágenes
        timestamp = int(time.time())
        nombre_archivo = f"{experiencia_id}_{secure_filename(f'img{num_imagenes + 1}_{timestamp}')}.{img.content_type.split('/')[-1]}"

        # Directorio donde se guardarán las imágenes
        directorio_imagenes = f"/ruta/compartida/{experiencia_id}/"

        # Crear el directorio si no existe
        if not os.path.exists(directorio_imagenes):
            os.makedirs(directorio_imagenes)

        # Guardar la imagen en el directorio
        img.save(os.path.join(directorio_imagenes, nombre_archivo))


        # Actualizamos la experiencia en la base de datos

        client = MongoClient(app.config['MONGO_URI'])

        # Conexión a MongoDB usando las variables de configuración

        collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]

        # Actualizar la lista de imágenes en la experiencia en la base de datos
        collection.update_one({"_id": experiencia_id}, {"$push": {"imagenesDestino": nombre_archivo}})



        return jsonify({"message": "Imagen añadida a la experiencia correctamente"})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})

import os

@app.route('/api/data/delete_img', methods=['POST'])
@login_required
def delete_img():
    try:
        # Obtener datos del formulario (nombre del archivo y experiencia_id)
        nombre_archivo = request.form.get('nombre_archivo')
        experiencia_id = request.form.get('experiencia_id')

        if not nombre_archivo or not experiencia_id:
            return jsonify({"error": "Se requiere 'nombre_archivo' y 'experiencia_id' en la solicitud"})

        # Verificar que la experiencia exista
        client = MongoClient(app.config['MONGO_URI'])
        collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]
        experiencia = collection.find_one({"_id": experiencia_id})

        if not experiencia:
            return jsonify({"error": f"La experiencia con id '{experiencia_id}' no existe"})

        # Directorio donde se guardan las imágenes
        directorio_imagenes = f"/ruta/compartida/{experiencia_id}/"

        # Eliminar el archivo del directorio
        ruta_completa = os.path.join(directorio_imagenes, nombre_archivo)
        if os.path.exists(ruta_completa):
            os.remove(ruta_completa)
        else:
            return jsonify({"error": f"El archivo '{nombre_archivo}' no existe en la experiencia '{experiencia_id}'"})

        # Actualizar la lista de imágenes en la experiencia en la base de datos
        collection.update_one({"_id": experiencia_id}, {"$pull": {"imagenesDestino": nombre_archivo}})

        return jsonify({"message": "Imagen eliminada de la experiencia correctamente"})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})

@app.route('/api/data/up_pdf', methods=['POST'])
@login_required
def up_pdf():
    try:
        # Obtener datos del formulario (incluyendo el archivo PDF)
        experiencia_id = request.form.get('experiencia_id')
        pdf = request.files.get('pdf')

        if not experiencia_id or not pdf:
            return jsonify({"error": "Se requiere 'experiencia_id' y 'pdf' en la solicitud"})

        # Verificar que la experiencia exista
        client = MongoClient(app.config['MONGO_URI'])
        collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]
        experiencia = collection.find_one({"_id": experiencia_id})

        if not experiencia:
            return jsonify({"error": f"La experiencia con id '{experiencia_id}' no existe"})

        num_pdfs = len(experiencia.get("pdfs", []))

        # Generar un nombre de archivo único con timestamp y número de PDFs
        timestamp = int(time.time())
        nombre_archivo = f"{experiencia_id}_{secure_filename(f'pdf{num_pdfs + 1}_{timestamp}')}.pdf"

        # Directorio donde se guardarán los PDFs
        directorio_pdfs = f"/ruta/compartida/{experiencia_id}/"

        # Crear el directorio si no existe
        if not os.path.exists(directorio_pdfs):
            os.makedirs(directorio_pdfs)

        # Guardar el PDF en el directorio
        pdf.save(os.path.join(directorio_pdfs, nombre_archivo))

        # Actualizar la lista de PDFs en la experiencia en la base de datos
        collection.update_one({"_id": experiencia_id}, {"$push": {"pdfs": nombre_archivo}})

        return jsonify({"message": "PDF añadido a la experiencia correctamente"})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})


# Ruta para eliminar archivos PDF
@app.route('/api/data/delete_pdf', methods=['POST'])
@login_required
def delete_pdf():
    try:
        # Obtener datos del formulario (nombre del archivo y experiencia_id)
        nombre_archivo = request.form.get('nombre_archivo')
        experiencia_id = request.form.get('experiencia_id')

        if not nombre_archivo or not experiencia_id:
            return jsonify({"error": "Se requiere 'nombre_archivo' y 'experiencia_id' en la solicitud"})

        # Verificar que la experiencia exista
        client = MongoClient(app.config['MONGO_URI'])
        collection = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]
        experiencia = collection.find_one({"_id": experiencia_id})

        if not experiencia:
            return jsonify({"error": f"La experiencia con id '{experiencia_id}' no existe"})

        # Directorio donde se guardan los PDFs
        directorio_pdfs = f"/ruta/compartida/{experiencia_id}/"

        # Eliminar el archivo del directorio
        ruta_completa = os.path.join(directorio_pdfs, nombre_archivo)
        if os.path.exists(ruta_completa):
            os.remove(ruta_completa)
        else:
            return jsonify({"error": f"El archivo '{nombre_archivo}' no existe en la experiencia '{experiencia_id}'"})

        # Actualizar la lista de PDFs en la experiencia en la base de datos
        collection.update_one({"_id": experiencia_id}, {"$pull": {"pdfs": nombre_archivo}})

        return jsonify({"message": "PDF eliminado de la experiencia correctamente"})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})
# Gestión de experiencias ***************************************************************************************************************************************

# Ruta para listar experiencias
@app.route('/experiencias', methods=['GET'])
def experiencias():

    client = MongoClient(app.config['MONGO_URI'])

    # Conexión a MongoDB usando las variables de configuración
    collection_experiencias = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]

    experiencias = collection_experiencias.find()
    # Return the array of experiences as JSON
    return jsonify(experiencias)

    #return jsonify(current_user.favoritas)

    if experiencias:
        return render_template('experiencias.html', experiencias=experiencias)
    else:
        return jsonify("No hay experiencias registradas.", "error")
    
# Ruta para agregar una experiencia
@app.route('/agregar_experiencia', methods=['GET', 'POST'])
@login_required
def agregar_experiencia():
    
        form = ExperienciaForm()
    
        client = MongoClient(app.config['MONGO_URI'])
    
        # Conexión a MongoDB usando las variables de configuración
        collection_experiencias = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]
    
        if request.method == 'POST':
            # Obtener los datos del formulario
            autor = form.autor.data
            paisDestino = form.paisDestino.data
            ciudadDestino = form.ciudadDestino.data
            universidadDestino = form.universidadDestino.data
            anioMovilidad = form.anioMovilidad.data
            gradoPrincipal = form.gradoPrincipal.data
            cursoMovilidad = form.cursoMovilidad.data
            idiomaDestino = form.idiomaDestino.data
            idiomaClases = form.idiomaClases.data
            ambienteEstudiantil = form.ambienteEstudiantil.data
            becaPercibida = form.becaPercibida.data
            nivelEconomico = form.nivelEconomico.data
            gastoPromedioMensual = form.gastoPromedioMensual.data
            calidadConclusion = form.calidadConclusion.data
            imagenesDestino = form.imagenesDestino.data
    
            # Crear la nueva experiencia
            new_experiencia_data = {
                "autor": autor,
                "paisDestino": paisDestino,
                "ciudadDestino": ciudadDestino,
                "universidadDestino": universidadDestino,
                "anioMovilidad": anioMovilidad,
                "gradoPrincipal": gradoPrincipal,
                "cursoMovilidad": cursoMovilidad,
                "idiomaDestino": idiomaDestino,
                "idiomaClases": idiomaClases,
                "ambienteEstudiantil": ambienteEstudiantil,
                "becaPercibida": becaPercibida,
                "nivelEconomico": nivelEconomico,
                "gastoPromedioMensual": gastoPromedioMensual,
                "calidadConclusion": calidadConclusion,
                "imagenesDestino": imagenesDestino
            }

            new_experiencia_data["_id"] = str(ObjectId())
            
            # Subir la nueva experiencia a elasticsearch haciendo petición POST
            response = requests.post(f'http://localhost:9200/experiencias/_doc/{new_experiencia_data["_id"]}', json=new_experiencia_data)

            
            result = collection_experiencias.insert_one(new_experiencia_data)

            if result.inserted_id:
                return jsonify({"message": "Experiencia agregada exitosamente"})
            else:
                return jsonify({"error": "Error al agregar la experiencia"}), 500


            return redirect(url_for('experiencias'))
                
        return render_template("experiencia_form.html", form=form)

# Ruta para eliminar una experiencia
@app.route('/eliminar_experiencia/<experiencia_id>')
@login_required
def eliminar_experiencia(experiencia_id):
    
        client = MongoClient(app.config['MONGO_URI'])
        collection_experiencias = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]
    
        # Verificar si la experiencia existe
        experiencia = collection_experiencias.find({"_id": ObjectId(experiencia_id)})
    
        if experiencia:
            try:
                collection_experiencias.delete_one({"_id": ObjectId(experiencia_id)})
                # Eliminar la experiencia de elasticSearch
                response = requests.delete(f'http://localhost:9200/experiencias/_doc/{experiencia_id}')
            except Exception as e:
                return jsonify(f"Error al actualizar la base de datos: {str(e)}", "error")
        else:
            return jsonify("Experiencia no encontrada.", "error")
        
        return redirect(url_for('experiencias'))

# Gestión de experiencias favoritas ***************************************************************************************************************************************


# Ruta para agregar una experiencia a favoritas
@app.route('/add_favorita/<experiencia_id>')
@login_required
def add_favorita(experiencia_id):

    client = MongoClient(app.config['MONGO_URI'])
    collection_experiencias = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]

    # Verificar si la experiencia existe
    experiencia = collection_experiencias.find({"_id": ObjectId(experiencia_id)})
   
    if experiencia:
        current_user.favoritas.append(experiencia_id)
        collection_usuarios = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION_USUARIOS']]

        try:
            collection_usuarios.update_one(
                {"_id": ObjectId(current_user.id)},
                {"$addToSet": {"favoritas": experiencia_id}}
            )
        except Exception as e:
            return jsonify(f"Error al actualizar la base de datos: {str(e)}", "error")
        
        return jsonify(current_user.favoritas)

    else:
        return jsonify("Experiencia no encontrada.", "error")
    
    return redirect(url_for('experiencias'))


# Ruta para eliminar una experiencia de favoritas
@app.route('/remove_favorita/<experiencia_id>')
@login_required
def remove_favorita(experiencia_id):

    client = MongoClient(app.config['MONGO_URI'])
    collection_experiencias = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]

    # Verificar si la experiencia existe
    experiencia = collection_experiencias.find({"_id": ObjectId(experiencia_id)})
   
    if experiencia:
        current_user.favoritas.remove(experiencia_id) 
        collection_usuarios = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION_USUARIOS']]

        try:
            collection_usuarios.update_one(
                {"_id": ObjectId(current_user.id)},
                {"$pull": {"favoritas": experiencia_id}}
            )
        except Exception as e:
            return jsonify(f"Error al actualizar la base de datos: {str(e)}", "error")

        return redirect(url_for('experiencias'))
    else:
        return jsonify("Experiencia no encontrada.", "error")
    
    

# Ruta para listar experiencias favoritas del usuario actual
@app.route('/experiencias_favoritas')
@login_required
def experiencias_favoritas():

    client = MongoClient(app.config['MONGO_URI'])

    # Conexión a MongoDB usando las variables de configuración
    collection_experiencias = client[app.config['MONGO_DBNAME']][app.config['MONGO_COLLECTION']]

    id_favs = current_user.favoritas
    
    # Obtener las experiencias favoritas del usuario actual
    favoritas = collection_experiencias.find({"_id": {"$in": id_favs}})

    if favoritas:
        return render_template('experiencias.html', experiencias=favoritas)
    else:
        return jsonify("No hay experiencias favoritas.", "error")

# ***************************************************************************************************************************************************************

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
