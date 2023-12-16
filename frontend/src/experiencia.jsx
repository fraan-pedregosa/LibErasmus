import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/header.css';
import ObjetoExperiencia from './components/ObjetoExperiencia.jsx';
import ObjetoExperienciaAdmin from './components/ObjetoExperienciaAdmin.jsx';
import InicioSesion from './components/InicioSesion.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [experiencia, setExperiencia] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {

        const urlParams = new URLSearchParams(window.location.search);
        const experienciaId = urlParams.get('id');
        const response = await axios.get(`http://localhost:5000/api/data/${experienciaId}`);
        setExperiencia(response.data);
        
        // Verificar si el usuario está conectado
        const responseAuth = await axios.get('http://localhost:5000/check_auth', { withCredentials: true });
        console.log('auth:', responseAuth.data.auth);

        if (responseAuth.status === 200 && responseAuth.data.auth) {
          // Si el usuario está autenticado, entonces verificamos si es administrador
          const isAdminResponse = await axios.post('http://localhost:5000/api/usr/is_admin');
          setIsAdmin(isAdminResponse.data.isAdmin);
          console.log('isAdmin:', isAdminResponse.data.isAdmin);
        } else {
          // Si la solicitud no fue exitosa o el usuario no está autenticado, establecemos isAdmin en false
          setIsAdmin(false);
        }
        
      } catch (error) {
        console.error('Error al obtener datos:', error);

        // Manejar el error específico UNAUTHORIZED (código 401)
        if (error.response && error.response.status === 401) {
          // Puedes realizar acciones específicas en respuesta a un error UNAUTHORIZED aquí
          console.log('El usuario no está autorizado. Redirigiendo a la página de inicio de sesión, por ejemplo.');
        } else {
          // Loguea otros errores en la consola sin lanzar excepciones
          console.log('Otro tipo de error:', error.message);
        }
      }
      // Resto de tu lógica para obtener las experiencias si es necesario

    }

    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Header>
        <InicioSesion />
      </Header>
  
      <main role="main">
        <div>
          {isAdmin && (
            <ObjetoExperienciaAdmin
              autor={experiencia["autor"]}
              paisDestino={experiencia["paisDestino"]}
              ciudadDestino={experiencia["ciudadDestino"]}
              anioMovilidad={experiencia["anioMovilidad"]}
              universidadDestino={experiencia["universidadDestino"]}
              _id={experiencia["_id"]}
              gradoPrincipal={experiencia["gradoPrincipal"]}
              cursoMovilidad={experiencia["cursoMovilidad"]}
              idiomaDestino={experiencia["idiomaDestino"]}
              idiomaClases={experiencia["idiomaClases"]}
              ambienteEstudiantil={experiencia["ambienteEstudiantil"]}
              becaPercibida={experiencia["becaPercibida"]}
              nivelEconomico={experiencia["nivelEconomico"]}
              gastoPromedioMensual={experiencia["gastoPromedioMensual"]}
              calidadConclusion={experiencia["calidadConclusion"]}
              imagenesDestino={experiencia["imagenesDestino"]}
            />
          )}
          {!isAdmin && (
            <ObjetoExperiencia
              autor={experiencia["autor"]}
              paisDestino={experiencia["paisDestino"]}
              ciudadDestino={experiencia["ciudadDestino"]}
              anioMovilidad={experiencia["anioMovilidad"]}
              universidadDestino={experiencia["universidadDestino"]}
              _id={experiencia["_id"]}
              gradoPrincipal={experiencia["gradoPrincipal"]}
              cursoMovilidad={experiencia["cursoMovilidad"]}
              idiomaDestino={experiencia["idiomaDestino"]}
              idiomaClases={experiencia["idiomaClases"]}
              ambienteEstudiantil={experiencia["ambienteEstudiantil"]}
              becaPercibida={experiencia["becaPercibida"]}
              nivelEconomico={experiencia["nivelEconomico"]}
              gastoPromedioMensual={experiencia["gastoPromedioMensual"]}
              calidadConclusion={experiencia["calidadConclusion"]}
              imagenesDestino={experiencia["imagenesDestino"]}
            />
          )}
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
