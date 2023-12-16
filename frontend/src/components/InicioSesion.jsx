import '../css/index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const InicioSesion = () => {
  // Estado para almacenar el nombre de usuario y la contraseña
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [auth, setAuth] = useState(false);

  // useEffect para llamar a test_login después de la renderización inicial
  useEffect(() => {
    test_login();
  }, []); // El array vacío asegura que se ejecute solo una vez, similar a componentDidMount


  axios.defaults.withCredentials = true;

  //Probamos si estamos conectados
  const test_login = async () => {
    try {
      const response = await axios.get('http://localhost:5000/check_auth');
      if (response.status === 200) {
        setAuth(response.data.auth);
        setNombre(response.data.nombre);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  // Manejamos salir de la sesión
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/usr/logout', {
        withCredentials: true
      });
      if (response.status === 200) {
        console.log('Sesión cerrada');
        setAuth(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Manejador de cambios para actualizar el estado cuando se escriba en los campos
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  // Manejador de envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Aquí deberías realizar la lógica de autenticación, por ejemplo, usando fetch o axios
    try {
      const response = await axios.post('http://localhost:5000/api/usr/login', {
        email: email,
        password: contrasena,
      });

      if (response.status === 200) {
        // La autenticación fue exitosa, puedes redirigir o realizar otras acciones
        console.log('Inicio de sesión exitoso');
        setAuth(true);
        window.location.reload();
      } else {
        // La autenticación falló, puedes mostrar un mensaje de error
        console.error('Error al iniciar sesión');
        console.log(response);
      }
    } catch (error) {
      console.log('Error en la solicitud:', error);
    }
  };
  if (!auth) {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-control">
        <input type="text" value={email} onChange={handleEmailChange} required />
        <label>
          <span style={{ transitionDelay: '0ms' }}>U</span>
          <span style={{ transitionDelay: '50ms' }}>s</span>
          <span style={{ transitionDelay: '100ms' }}>u</span>
          <span style={{ transitionDelay: '150ms' }}>a</span>
          <span style={{ transitionDelay: '200ms' }}>r</span>
          <span style={{ transitionDelay: '250ms' }}>i</span>
          <span style={{ transitionDelay: '300ms' }}>o</span>
        </label>
      </div>
      <div className="form-control">
        <input type="password" value={contrasena} onChange={handleContrasenaChange} required />
        <label>
          <span style={{ transitionDelay: '0ms' }}>C</span>
          <span style={{ transitionDelay: '50ms' }}>o</span>
          <span style={{ transitionDelay: '100ms' }}>n</span>
          <span style={{ transitionDelay: '150ms' }}>t</span>
          <span style={{ transitionDelay: '200ms' }}>r</span>
          <span style={{ transitionDelay: '250ms' }}>a</span>
          <span style={{ transitionDelay: '300ms' }}>s</span>
          <span style={{ transitionDelay: '350ms' }}>e</span>
          <span style={{ transitionDelay: '400ms' }}>ñ</span>
          <span style={{ transitionDelay: '450ms' }}>a</span>
        </label>
      </div>
      <button type="submit">Iniciar sesión</button>
      <a href="registro.html"><p>Regístrate</p><p>aquí</p></a>
    </form>
  );
  } else {
    return(
    <form onSubmit={handleLogout}>
      <div className="form-control">
      <b>Bienvenido {nombre}</b>
      </div>
      <button type="submit">Cerrar sesión</button>
    </form>
    );
  }
};

export default InicioSesion;
