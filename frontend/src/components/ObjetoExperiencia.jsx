/* eslint-disable react/prop-types */

import '../css/index.css'
import '../css/principal.css'

function ObjetoExperiencia({_id, autor, paisDestino, ciudadDestino, universidadDestino, anioMovilidad,gradoPrincipal, cursoMovilidad, idiomaDestino, idiomaClases, ambienteEstudiantil, becaPercibida, nivelEconomico,gastoPromedioMensual, calidadConclusion, imagenesDestiono}){

  return (
    <div className="plantillaExperiencia">
      <h1>{autor} y su experiencia en {ciudadDestino}, {paisDestino}</h1>
      <h2>Universidad destino: {universidadDestino}</h2>

      <h3>Momento Académico</h3>
      <p>Año de movilidad: {anioMovilidad}</p>
      <p>Para la realización del grado de {gradoPrincipal}</p>
      {cursoMovilidad &&<p>Curso académico: {cursoMovilidad}</p>}

      <h3>Idiomas a tener en cuenta</h3>
      <p>Idioma destino: {idiomaDestino}</p>
      <p>Idioma en el que se imparten las clases: {idiomaClases}</p>

      <h3>Ambiente estudiantil</h3>
      <p>{ambienteEstudiantil && ambienteEstudiantil.join(', ')}</p>


      {(becaPercibida || nivelEconomico || gastoPromedioMensual) && <h3>Datos económicos</h3>}
      {becaPercibida && <p>Beca de la que se dispuso: {becaPercibida}€</p>}
      {nivelEconomico && <p>Nivel económico: {nivelEconomico}</p>}
      {gastoPromedioMensual && <p>Gasto promedio mensual: {gastoPromedioMensual}€</p>}

    <h3>Calidad conclusión: {calidadConclusion}</h3>

    <h3>Experiencia Completa</h3>
    <a href={"/ruta/compartida/"+_id+"/experiencia.pdf"}>Descargar experiencia</a>
    
    {imagenesDestiono && <p>Imagenes del destino:</p>}
    <div className='imagenesExpcontainer'>
    {imagenesDestiono && imagenesDestiono.map((imagen, index) => (
      <img key={index} className='imgExp' src={"/img/compartida/"+_id+"/"+imagen} alt={`Imagen ${index}`}/>
    ))}
    </div>

    <a href="/experiencias">Volver a experiencias</a>

    
  </div>
    
  )
}
export default ObjetoExperiencia
