// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXKWpkb5rR8WFss0PyVwExjLrO_OI30Tg",
  authDomain: "prueba-5a1c4.firebaseapp.com",
  databaseURL: "https://prueba-5a1c4-default-rtdb.firebaseio.com",
  projectId: "prueba-5a1c4",
  storageBucket: "prueba-5a1c4.firebasestorage.app",
  messagingSenderId: "186842339356",
  appId: "1:186842339356:web:6cc8811965afe7c84d67d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencias a la base de datos
export const tempRef = ref(database, 'sensors/temperature');
export const humidityRef = ref(database, 'sensors/humidity');
export const gasRef = ref(database, 'sensors/gas');
export const flowRateRef = ref(database, 'sensors/flow_rate');
export const totalFlowRef = ref(database, 'sensors/total_flow');
export const relayRef = ref(database, 'relay/status');
export const alertRef = ref(database, 'alerts/last_alert');