import '../css/index.css';
import '../css/principal.css';
import { useState } from 'react';
import axios from 'axios';

const RegistroUsuario = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/usr/signup', {
        nombre: username,
        email: email,
        password: password,
      });

      console.log('Respuesta del backend:', response.data);
      window.location.replace("http://localhost/");
    } catch (error) {
      console.error('Error al enviar solicitud al backend:', error);
    }
  };

  return (
    <form className="form_reg" onSubmit={handleSubmit}>
        <section className="form_reg_secciones">
        <div className="form-control">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Nombre de Usuario</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Correo Electrónico</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Contraseña</span>
          </label>
        </div>
        <button type="submit" className="form-button">
          Registrarse
        </button>
        </section>
    </form>

  );
};

export default RegistroUsuario;
