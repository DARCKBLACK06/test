// main.gs

function enviarAvisos() {
  const inquilinos = obtenerInquilinos();

  inquilinos.forEach(doc => {
    const data = doc.fields;
    const nombre = data.nombre?.stringValue || '';
    const correo = data.correo?.stringValue || '';
    const estado = data.estadoCerradura?.stringValue || '';
    const fechaPago = data.fechaPago?.stringValue || '';
    const docPath = doc.name.replace('projects/', '');

    const dias = diasRestantes(fechaPago);

    if (dias <= 5 && dias >= 0 && estado === 'pagado') {
      enviarCorreo(correo, nombre, dias, fechaPago);
    }

    if (dias < 0 && estado === 'pagado') {
      actualizarEstadoCerradura(docPath, 'no pagado');
    }
  });
}
