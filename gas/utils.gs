// utils.gs

function parseFechaISO(str) {
  return new Date(str);
}

function diasRestantes(fechaPago) {
  const hoy = new Date();
  const fecha = parseFechaISO(fechaPago);
  const diffMs = fecha - hoy;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function enviarCorreo(destinatario, nombre, dias, fechaPago) {
  const asunto = "Aviso de pago pendiente";
  const mensaje = `
Hola ${nombre},

Este es un aviso automático para recordarte que debes realizar tu pago antes del ${fechaPago}.
Quedan aproximadamente ${dias} días para la fecha límite.

Gracias,
Administración.
`;
  MailApp.sendEmail(destinatario, asunto, mensaje);
}
