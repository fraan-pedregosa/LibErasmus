import '../css/index.css';
import '../css/principal.css';
import { useState } from 'react';
import axios from 'axios';
import FileUploader from './FileUploader';

const NuevoFormularioExperiencia = () => {
  const [autor, setAutor] = useState('');
  const [paisDestino, setPaisDestino] = useState('');
  const [ciudadDestino, setCiudadDestino] = useState('');
  const [anioMovilidad, setAnioMovilidad] = useState(0);
  const [gradoPrincipal, setGradoPrincipal] = useState('');
  const [cursoMovilidad, setCursoMovilidad] = useState('');
  const [idiomaDestino, setIdiomaDestino] = useState('');
  const [idiomaClases, setIdiomaClases] = useState('');
  const [ambienteEstudiantil, setAmbienteEstudiantil] = useState([]);
  const [becaPercibida, setBecaPercibida] = useState(0);
  const [nivelEconomico, setNivelEconomico] = useState('');
  const [calidadConclusion, setCalidadConclusion] = useState('');
  const [gastoPromedioMensual, setGastoPromedioMensual] = useState(0);
  const [imagenesDestinoLink, setImagenesDestinoLink] = useState([]);

  const handleAutorChange = (e) => {
    setAutor(e.target.value);
  };

  const handlePaisDestinoChange = (e) => {
    setPaisDestino(e.target.value);
  };

  const handleCiudadDestinoChange = (e) => {
    setCiudadDestino(e.target.value);
  };

  const handleAnioMovilidadChange = (e) => {
    setAnioMovilidad(e.target.value);
  };

  const handleGradoPrincipalChange = (e) => {
    setGradoPrincipal(e.target.value);
  };

  const handleCursoMovilidadChange = (e) => {
    setCursoMovilidad(e.target.value);
  };

  const handleIdiomaDestinoChange = (e) => {
    setIdiomaDestino(e.target.value);
  };

  const handleIdiomaClasesChange = (e) => {
    setIdiomaClases(e.target.value);
  };

  const handleAmbienteEstudiantilChange = (e) => {
    //No se muy bien como esta en el backend hecho 
    setAmbienteEstudiantil(e.target.value.split(','));
  };

  const handleBecaPercibidaChange = (e) => {
    setBecaPercibida(e.target.value);
  };

  const handleNivelEconomicoChange = (e) => {
    setNivelEconomico(e.target.value);
  };

  const handleCalidadConclusionChange = (e) => {
    setCalidadConclusion(e.target.value);
  };

  const handleGastoPromedioMensualChange = (e) => {
    setGastoPromedioMensual(e.target.value);
  };

  const handleImagenesDestinoLinkChange = (e) => {
    setImagenesDestinoLink(e.target.value.split(','));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí deberías enviar los datos al backend, por ejemplo, usando fetch o axios
    const nuevaExperiencia = {
      autor,
      paisDestino,
      ciudadDestino,
      anioMovilidad,
      gradoPrincipal,
      cursoMovilidad,
      idiomaDestino,
      idiomaClases,
      ambienteEstudiantil,
      becaPercibida,
      nivelEconomico,
      calidadConclusion,
      gastoPromedioMensual,
      imagenesDestinoLink,

    };

    try {
        //a que url la mando a una nuev
      const response = await axios.post('URL_DEL_BACKEND', nuevaExperiencia);

      if (response.ok) {
        console.log('Experiencia añadida exitosamente');
      } else {
        console.error('Error al añadir la experiencia');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <form className="form_add" onSubmit={handleSubmit}>
      <section className="form_reg_secciones">
        <div className="form-control">
          <input
            type="text"
            value={autor}
            onChange={handleAutorChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Autor</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={paisDestino}
            onChange={handlePaisDestinoChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>País de Destino</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={ciudadDestino}
            onChange={handleCiudadDestinoChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Ciudad de Destino</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="number"
            value={anioMovilidad}
            onChange={handleAnioMovilidadChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Año de Movilidad</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={gradoPrincipal}
            onChange={handleGradoPrincipalChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Grado Principal</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={cursoMovilidad}
            onChange={handleCursoMovilidadChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Curso de Movilidad</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={idiomaDestino}
            onChange={handleIdiomaDestinoChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Idioma de Destino</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={idiomaClases}
            onChange={handleIdiomaClasesChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Idioma de Clases</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={ambienteEstudiantil}
            onChange={handleAmbienteEstudiantilChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Ambiente Estudiantil</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="number"
            value={becaPercibida}
            onChange={handleBecaPercibidaChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Beca Percibida</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={nivelEconomico}
            onChange={handleNivelEconomicoChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Nivel Económico</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={calidadConclusion}
            onChange={handleCalidadConclusionChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Calidad</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="number"
            value={gastoPromedioMensual}
            onChange={handleGastoPromedioMensualChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Gasto Medio Mensual</span>
          </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={imagenesDestinoLink}
            onChange={handleImagenesDestinoLinkChange}
            required
            className="form-control-input"
          />
          <label className="form-control-label">
            <span>Imagen</span>
          </label>
        </div>
        <button type="submit" className="form-button">
          Añadir Experiencia
        </button>
      </section>
      <FileUploader />
    </form>
  );
};

export default NuevoFormularioExperiencia;
