// main.js
import { tempRef, humidityRef, gasRef, flowRateRef, totalFlowRef, relayRef, alertRef } from './firebase.js';

import { onValue } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

// Inicializa gráficos (usando Chart.js por ejemplo)
const initCharts = () => {
  // Aquí iría la configuración de tus gráficas
  console.log("Gráficos inicializados");
};

// Actualiza datos en tiempo real
export const setupRealtimeUpdates = () => {
  onValue(tempRef, (snapshot) => {
    const tempElement = document.getElementById('temperature');
    if (snapshot.exists()) {
      tempElement.textContent = `${snapshot.val().toFixed(1)} °C`;
    }
  });

  onValue(humidityRef, (snapshot) => {
    const humidityElement = document.getElementById('humidity');
    if (snapshot.exists()) {
      humidityElement.textContent = `${snapshot.val().toFixed(1)} %`;
    }
  });

  onValue(gasRef, (snapshot) => {
    const gasElement = document.getElementById('gas');
    if (snapshot.exists()) {
      gasElement.textContent = snapshot.val();
      gasElement.className = snapshot.val() > 300 ? 'alert' : '';
    }
  });

  // ... resto de listeners para los otros sensores
};

// Inicializa la aplicación
export const initApp = () => {
  initCharts();
  setupRealtimeUpdates();
};