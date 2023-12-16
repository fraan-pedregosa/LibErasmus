
import datetime
import hashlib
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId, Timestamp

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, Length

class SignupForm(FlaskForm):
    name = StringField('Nombre', validators=[DataRequired(), Length(max=64)])
    password = PasswordField('Password', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Registrar')
    
class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Recuérdame')
    submit = SubmitField('Login')
    

class ExperienciaForm(FlaskForm):
    autor = StringField('Autor', validators=[DataRequired()])
    paisDestino = StringField('País de Destino', validators=[DataRequired()])
    ciudadDestino = StringField('Ciudad de Destino', validators=[DataRequired()])
    universidadDestino = StringField('Universidad de Destino', validators=[DataRequired()])
    anioMovilidad = IntegerField('Año de Movilidad', validators=[DataRequired()])
    gradoPrincipal = StringField('Grado Principal', validators=[DataRequired()])
    cursoMovilidad = StringField('Curso de Movilidad', validators=[DataRequired()])
    idiomaDestino = StringField('Idioma de Destino', validators=[DataRequired()])
    idiomaClases = StringField('Idioma de Clases', validators=[DataRequired()])
    
   # Campo desplegable para ambienteEstudiantil
    ambienteEstudiantil = SelectField('Ambiente Estudiantil', choices=[
        ('Fiesta', 'Fiesta'),
        ('Deportivo', 'Deportivo'),
        ('Internacional', 'Internacional'),
        ('Tranquilo', 'Tranquilo'),
        ('Cultural', 'Cultural'),
        ('Natural', 'Natural'),
        ('Histórico', 'Histórico'),
        ('Viajes', 'Viajes')
    ], validators=[DataRequired()])

    # Campo desplegable para nivel económico
    nivelEconomico = SelectField('Nivel Económico', choices=[
        ('bajo', 'Bajo'),
        ('medio', 'Medio'),
        ('alto', 'Alto')
    ], validators=[DataRequired()])

    becaPercibida = IntegerField('Beca Percibida')
    gastoPromedioMensual = IntegerField('Gasto Promedio Mensual')
    
    # Campo desplegable para calidad de conclusión
    calidadConclusion = SelectField('Calidad de Conclusión', choices=[
        ('muy buena', 'Muy Buena'),
        ('buena', 'Buena'),
        ('mejorable', 'Mejorable'),
        ('mala', 'Mala')
    ], validators=[DataRequired()])

    imagenesDestino = TextAreaField('Imágenes de Destino (separadas por coma)')
    submit = SubmitField('Agregar Experiencia')


class User(UserMixin):
    def __init__(self, id, name, email, password, is_admin=False, favoritas=None):
        self.id = id
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)
        self.is_admin = is_admin
        self.favoritas = favoritas
        
    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def agregar_favorita(self, experiencia_id):
        self.favoritas.append(experiencia_id)

    def obtener_favoritas(self):
        return self.favoritas
    
    def get_id(self):
        return str(self.id)

class Sesiones:
    def __init__(self,db):
        db.create_index("expireAt", expireAfterSeconds=3600)

    def agregar_sesion(self, db, sesion):
        db.insert_one({
            "id": sesion.id,
            "usuario": sesion.usuario.get_id(),
            "cod_sesion": sesion.cod_sesion,
            "expireAt": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        })

    def obtener_sesiones(self, db):
        sesiones = db.find({})
        self.sesiones_activas = []
        for sesion in sesiones:
            self.sesiones_activas.append(sesion)
        return self.sesiones_activas
    
    def eliminar_sesion(self, db, sesion):
        db.delete_one({"cod_sesion": sesion["cod_sesion"]})
        return True
    
    def obtener_sesion(self, db, sesion_cod):
        sesion = db.find_one({"cod_sesion": sesion_cod})
        if sesion:
            return sesion
        else:
            return None
    
    def crear_sesion(self, db, usuario):
        id = len(self.obtener_sesiones(db)) + 1
        sesion = Sesion(id, usuario)
        db.insert_one({
            "id": sesion.id,
            "usuario": sesion.usuario.get_id(),
            "cod_sesion": sesion.cod_sesion,
            "expireAt": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        })
        return sesion

class Sesion:
    def __init__(self, id, usuario, cod_sesion=0):

        self.id = id
        self.usuario = usuario
        if(cod_sesion != 0):
            user_id = usuario.get_id()
            timestamp = datetime.datetime.now()
            timestamp_str = str(int(timestamp.timestamp()))

            # Concatenar timestamp y user_id
            session_data = timestamp_str + "_" + user_id

            # Encriptar usando SHA-256
            hashed_session = hashlib.sha256(session_data.encode()).hexdigest()

            self.cod_sesion = hashed_session
        else:
            self.cod_sesion = cod_sesion

    def get_id(self):
        return str(self.id)

    def get_usuario(self):
        return self.usuario
    
    def get_cod_sesion(self):
        return self.cod_sesion


class Experiencia:
    def __init__(self, id, autor, paisDestino, ciudadDestino, universidadDestino,
                 anioMovilidad, gradoPrincipal, cursoMovilidad, idiomaDestino,
                 idiomaClases, ambienteEstudiantil, becaPercibida,
                 nivelEconomico, calidadConclusion, imagenesDestino):
        self.id = id
        self.autor = autor
        self.paisDestino = paisDestino
        self.ciudadDestino = ciudadDestino
        self.universidadDestino = universidadDestino
        self.anioMovilidad = anioMovilidad
        self.gradoPrincipal = gradoPrincipal
        self.cursoMovilidad = cursoMovilidad
        self.idiomaDestino = idiomaDestino
        self.idiomaClases = idiomaClases
        self.ambienteEstudiantil = ambienteEstudiantil
        self.becaPercibida = becaPercibida
        self.nivelEconomico = nivelEconomico
        self.calidadConclusion = calidadConclusion
        self.imagenesDestino = imagenesDestino



