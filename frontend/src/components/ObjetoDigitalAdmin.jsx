
import '../css/index.css';
import PropTypes from 'prop-types';


export default ObjetoDigitalAdmin;
function ObjetoDigitalAdmin({  pais, autor, ciudad, año, universidad, _id}) {
  
  return (
      <div className="marco">
      <a href={'experiencia.html?id=' + _id}>
        <h2>{autor} en {ciudad}, {pais}</h2>
        <p>{año}</p>
        <p>{universidad}</p>
        </a>
        <button>Eliminar Experiencia</button>
      </div>

  );
}

ObjetoDigitalAdmin.propTypes = {
  pais: PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired,
  ciudad: PropTypes.string.isRequired,
  año: PropTypes.number.isRequired,
  universidad: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

