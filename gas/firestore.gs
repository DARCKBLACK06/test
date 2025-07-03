// firestore.gs

// Obtener todos los inquilinos
function obtenerInquilinos() {
  const url = `${FIRESTORE_BASE_URL}/inquilino?key=${API_KEY}`;
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());
  return data.documents || [];
}

// Actualizar campo estadoCerradura de un inquilino
function actualizarEstadoCerradura(docPath, nuevoEstado) {
  const url = `https://firestore.googleapis.com/v1/${docPath}?key=${API_KEY}&updateMask.fieldPaths=estadoCerradura`;

  const payload = JSON.stringify({
    fields: {
      estadoCerradura: { stringValue: nuevoEstado }
    }
  });

  const options = {
    method: 'PATCH',
    contentType: 'application/json',
    payload: payload
  };

  const response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText());
}
