// === IMPORTACIONES ===
import { dbRealtime } from './firebase-config.js';
import { ref, onValue, set } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js';

// === CREAR CHART DONUT ===
function createDonutChart(ctx, label, colorFn) {
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [label],
      datasets: [{
        data: [0, 100],
        backgroundColor: [colorFn(0), '#2f2f2f'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#fff',
          font: { size: 18, weight: 'bold' },
          formatter: (value, ctx) => {
            return ctx.chart.data.datasets[0].data[0].toFixed(1);
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}

// === COLORES SEGÚN VALOR ===
function getColorByValue(value, type) {
  if (type === 'temp') return value >= 30 ? '#f44336' : value >= 20 ? '#ffc107' : '#4caf50';
  if (type === 'hum') return value >= 70 ? '#2196f3' : value >= 40 ? '#ffc107' : '#4caf50';
  if (type === 'gas') return value >= 70 ? '#f44336' : value >= 40 ? '#ffc107' : '#4caf50';
  if (type === 'flow') return value >= 10 ? '#4caf50' : value >= 5 ? '#ffc107' : '#f44336';
  return '#999';
}

// === CREAR LOS CHARTS ===
const charts = {
  temp: createDonutChart(document.getElementById('tempChart'), '°C', v => getColorByValue(v, 'temp')),
  hum: createDonutChart(document.getElementById('humChart'), '%', v => getColorByValue(v, 'hum')),
  gas: createDonutChart(document.getElementById('mq2Chart'), '%', v => getColorByValue(v, 'gas')),
  flow: createDonutChart(document.getElementById('flowChar'), 'L/min', v => getColorByValue(v, 'flow')),
};

// === ACTUALIZAR CHART INDIVIDUAL ===
function updateDonutChart(chart, value, type) {
  chart.data.datasets[0].data[0] = value;
  chart.data.datasets[0].data[1] = 100 - value;
  chart.data.datasets[0].backgroundColor[0] = getColorByValue(value, type);
  chart.update();
}

// === LECTURA DE FIREBASE ===
const dataRef = ref(dbRealtime, '/departamentos/deptodpto1/sensores/datos_completos');
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const { temperatura, humedad, humo, agua, cerradura } = data;

  updateDonutChart(charts.temp, temperatura, 'temp');
  updateDonutChart(charts.hum, humedad, 'hum');
  updateDonutChart(charts.gas, humo, 'gas');
  updateDonutChart(charts.flow, agua, 'flow');

  updateLockUI(cerradura);
});

// === CONTROL DEL RELÉ ===
const editBtn = document.getElementById('relay-edit');
const menu = document.getElementById('relay-menu');
const select = document.getElementById('relay-action');
const saveBtn = document.getElementById('save-relay');

editBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

saveBtn.addEventListener('click', () => {
  const estado = select.value;
  const refRelay = ref(dbRealtime, '/departamentos/deptodpto1/sensores/datos_completos/cerradura');
  set(refRelay, estado).then(() => {
    updateLockUI(estado);
    menu.classList.add('hidden');
  });
});

// === ACTUALIZAR ICONO DEL RELÉ ===
function updateLockUI(state) {
  const icon = document.getElementById('lock-icon');
  icon.textContent = state === 'encendido' ? '🔓' : '🔒';
}
