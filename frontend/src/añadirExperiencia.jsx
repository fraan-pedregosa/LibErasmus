import React, {} from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';
import './css/header.css';
import './css/principal.css';
import InicioSesion from './components/InicioSesion.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FormularioAñadir from './components/FormularioAñadir.jsx';

function App() {

  

  return (
    <React.Fragment>
      <Header>
      <InicioSesion/>
      </Header>

      <main role="main">
          <div>
          <h1>AÑADE UNA NUEVA EXPERIENCIA, ADMIN</h1>
          <FormularioAñadir/>
        </div>
      </main>
      <Footer/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
