import React, { useState } from 'react';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Obtiene el archivo seleccionado del evento
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Aquí puedes implementar la lógica para enviar el archivo al backend
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Envía el formulario al backend (puedes utilizar fetch o alguna librería como axios)
      fetch('URL_DEL_BACKEND', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          // Maneja la respuesta del backend según tus necesidades
          console.log('Respuesta del backend:', data);
        })
        .catch(error => {
          console.error('Error al enviar el archivo:', error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivo</button>
    </div>
  );
};

export default FileUploader;