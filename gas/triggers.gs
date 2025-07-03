// triggers.gs

function crearTriggerDiario() {
  ScriptApp.newTrigger('enviarAvisos')
    .timeBased()
    .everyDays(1)
    .atHour(6) // 6 AM
    .create();
}
