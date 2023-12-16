import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './css/index.css';
import './css/header.css';
import ObjetoDigital from './components/ObjetoDigital.jsx';
import ObjetoDigitalAdmin from './components/ObjetoDigitalAdmin.jsx';
import InicioSesion from './components/InicioSesion.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';

function App() {
  const [experiencias, setExperiencias] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
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
      const response = await axios.get('http://localhost:5000/api/data/get_exps');
      setExperiencias(response.data);
    }

    fetchData();
  }, []);


  return (
    <React.Fragment>
      <Header>
        <InicioSesion />
      </Header>
      <SearchBar onSearch={(results) => {
        console.log(results);
        setExperiencias(results);
      }}>
      </SearchBar>
      <main role="main">
        <div>
          {!isAdmin && (
            <div>
              <h1>EXPERENCIAS ERASMUS</h1>
              <h2>{experiencias.length} {experiencias.length == 1 ? "resultado" : "resultados"}:</h2>
              {experiencias.map((experiencia, index) => (
                <ObjetoDigital key={index} autor={experiencia["Autor"]} pais={experiencia["Pais"]} ciudad={experiencia["Ciudad"]} año={experiencia["Anio"]} universidad={experiencia["Universidad"]} _id={experiencia["_id"]} />
              ))}
            </div>
          )}

          {isAdmin && (
            <div>
              <a className="añadirExp" href="añadirExperiencia.html"><h3>Añadir nuevas experiencias</h3></a>
              <h1>EXPERENCIAS ERASMUS</h1>
              {experiencias.map((experiencia, index) => (
                <ObjetoDigitalAdmin key={index} autor={experiencia["Autor"]} pais={experiencia["Pais"]} ciudad={experiencia["Ciudad"]} año={experiencia["Anio"]} universidad={experiencia["Universidad"]} _id={experiencia["_id"]} />

              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
