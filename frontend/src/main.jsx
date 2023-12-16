import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './css/index.css';
import './css/header.css';
import ObjetoDigital from './components/ObjetoDigital.jsx';
import InicioSesion from './components/InicioSesion.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';
import Mapa from './components/Mapa.jsx';

function App() {
  const [experiencias, setExperiencias] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Verificar si el usuario está conectado
        const responseAuth = await axios.get('http://localhost:5000/check_auth', { withCredentials: true });
        console.log('auth:', responseAuth.data.auth);
        setIsAuth(responseAuth.data.auth);

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
      const query = '' // Buscamos 3 experiencias
      console.log(JSON.stringify(query))
      fetch("http://localhost:9200/experiencias/_search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: query,
      })
      .then((response) => response.json())
      .then((data) => {
        const hits = data.hits.hits;
        const exps = hits.map(experience => ({
          ...experience._source,
          _id: experience._id
        }));
        console.log(exps);
        setExperiencias(exps);
      });


    }

    fetchData();
  }, []);


  return (
    <React.Fragment>
      <Header>
        <InicioSesion />
      </Header>
      <main role="main">
        <h1>MAPA</h1>
        <Mapa />
            <div className='searchResult'>
            <div>
              <h1>EXPERENCIAS ERASMUS</h1>
              <SearchBar onSearch={(results) => {
                window.location.href = "/experiencias.html"; // Estaria bien que cargara la busqueda en la otra pagina
      }}>
      </SearchBar>
              {experiencias.map((experiencia, index) => (
                <ObjetoDigital key={index} autor={experiencia["Autor"]} pais={experiencia["Pais"]} ciudad={experiencia["Ciudad"]} año={experiencia["Anio"]} universidad={experiencia["Universidad"]} _id={experiencia["_id"]} />
              ))}
            </div>
            <a href="/experiencias"><h3>Ver más</h3></a>
          </div>
        { isAuth && (
          <h1>Experiencias Favoritas</h1>)}


      </main>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
