/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import '../css/index.css';
import '../css/principal.css';

function ObjetoExperienciaAdmin({
  _id,
  autor,
  paisDestino,
  ciudadDestino,
  universidadDestino,
  anioMovilidad,
  gradoPrincipal,
  cursoMovilidad,
  idiomaDestino,
  idiomaClases,
  ambienteEstudiantil,
  becaPercibida,
  nivelEconomico,
  gastoPromedioMensual,
  calidadConclusion,
  imagenesDestino,
}) {
  // Estados para los campos editables
  const [editAutor, setEditAutor] = useState(autor);
  const [editPaisDestino, setEditPaisDestino] = useState(paisDestino);
  const [editCiudadDestino, setEditCiudadDestino] = useState(ciudadDestino);
  const [editUniversidadDestino, setEditUniversidadDestino] = useState(universidadDestino);
  const [editAnioMovilidad, setEditAnioMovilidad] = useState(anioMovilidad);
  const [editGradoPrincipal, setEditGradoPrincipal] = useState(gradoPrincipal);
  const [editCursoMovilidad, setEditCursoMovilidad] = useState(cursoMovilidad);
  const [editIdiomaDestino, setEditIdiomaDestino] = useState(idiomaDestino);
  const [editIdiomaClases, setEditIdiomaClases] = useState(idiomaClases);
  const [editAmbienteEstudiantil, setEditAmbienteEstudiantil] = useState(ambienteEstudiantil);
  const [editBecaPercibida, setEditBecaPercibida] = useState(becaPercibida);
  const [editNivelEconomico, setEditNivelEconomico] = useState(nivelEconomico);
  const [editGastoPromedioMensual, setEditGastoPromedioMensual] = useState(gastoPromedioMensual);
  const [editCalidadConclusion, setEditCalidadConclusion] = useState(calidadConclusion);
  const [editImagenesDestino, setEditImagenesDestino] = useState(imagenesDestino);

  return (
    <div className="plantillaExperiencia">
      <h1>
        <input
          type="text"
          value={editAutor}
          onChange={(e) => setEditAutor(e.target.value)}
        />{' '}
        y su experiencia en{' '}
        <input
          type="text"
          value={editCiudadDestino}
          onChange={(e) => setEditCiudadDestino(e.target.value)}
        />
        ,{' '}
        <input
          type="text"
          value={editPaisDestino}
          onChange={(e) => setEditPaisDestino(e.target.value)}
        />
      </h1>
      <h2>
        Universidad destino:{' '}
        <input
          type="text"
          value={editUniversidadDestino}
          onChange={(e) => setEditUniversidadDestino(e.target.value)}
        />
      </h2>

      <h3>Momento Académico</h3>
      <p>
        Año de movilidad:{' '}
        <input
          type="text"
          value={editAnioMovilidad}
          onChange={(e) => setEditAnioMovilidad(e.target.value)}
        />
      </p>
      <p>
        Para la realización del grado de{' '}
        <input
          type="text"
          value={editGradoPrincipal}
          onChange={(e) => setEditGradoPrincipal(e.target.value)}
        />
      </p>
      {editCursoMovilidad && (
        <p>
          Curso académico:{' '}
          <input
            type="text"
            value={editCursoMovilidad}
            onChange={(e) => setEditCursoMovilidad(e.target.value)}
          />
        </p>
      )}

      <h3>Idiomas a tener en cuenta</h3>
      <p>
        Idioma destino:{' '}
        <input
          type="text"
          value={editIdiomaDestino}
          onChange={(e) => setEditIdiomaDestino(e.target.value)}
        />
      </p>
      <p>
        Idioma en el que se imparten las clases:{' '}
        <input
          type="text"
          value={editIdiomaClases}
          onChange={(e) => setEditIdiomaClases(e.target.value)}
        />
      </p>

      <h3>Ambiente estudiantil</h3>
      <p>
        {editAmbienteEstudiantil && (
          <input
            type="text"
            value={editAmbienteEstudiantil.join(', ')}
            onChange={(e) => setEditAmbienteEstudiantil(e.target.value.split(', '))}
          />
        )}
      </p>

      {(editBecaPercibida || editNivelEconomico || editGastoPromedioMensual) && (
        <h3>Datos económicos</h3>
      )}
      {editBecaPercibida && (
        <p>
          Beca de la que se dispuso:{' '}
          <input
            type="text"
            value={editBecaPercibida}
            onChange={(e) => setEditBecaPercibida(e.target.value)}
          />
          €
        </p>
      )}
      {editNivelEconomico && (
        <p>
          Nivel económico:{' '}
          <input
            type="text"
            value={editNivelEconomico}
            onChange={(e) => setEditNivelEconomico(e.target.value)}
          />
        </p>
      )}
      {editGastoPromedioMensual && (
        <p>
          Gasto promedio mensual:{' '}
          <input
            type="text"
            value={editGastoPromedioMensual}
            onChange={(e) => setEditGastoPromedioMensual(e.target.value)}
          />
          €
        </p>
      )}

      <h3>
        Calidad conclusión:{' '}
        <input
          type="text"
          value={editCalidadConclusion}
          onChange={(e) => setEditCalidadConclusion(e.target.value)}
        />
      </h3>

      <h3>Experiencia Completa</h3>
      <a href={`/ruta/compartida/${_id}/experiencia.pdf`}>Descargar experiencia</a>

      {editImagenesDestino && <p>Imagenes del destino:</p>}
      <div className="imagenesExpcontainer">
        {editImagenesDestino &&
          editImagenesDestino.map((imagen, index) => (
            <React.Fragment key={index}>
            <img
              key={index}
              className="imgExp"
              src={`/datos_prueba/public/${_id}/${imagen}`}
              alt={`Imagen ${index}`}
            />
            <button>X</button>{/* Cambiar esto por un boton que haga algo */}
            </React.Fragment>
          ))}
      </div>
      <button>Actualizar experiencia</button>
      <a href="/experiencias">Volver a experiencias</a>
    </div>

  );
}

export default ObjetoExperienciaAdmin;
