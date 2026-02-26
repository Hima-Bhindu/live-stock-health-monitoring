// 🔥 Import Firebase (ONLY ONE VERSION)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { 
  getAuth, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";


// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAgeu_HDXEL8H9OdYmDQ3nubMcqPteh3pE",
  authDomain: "live-stock-monitoring-system.firebaseapp.com",
  projectId: "live-stock-monitoring-system",
};


// 🔥 Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUserUID = null;
let tempChart;
let statusChart;


// 🔐 Auth State Listener (ONLY ONE)
onAuthStateChanged(auth, (user) => {

  if (user) {
    console.log("User logged in:", user.uid);
    currentUserUID = user.uid;
    loadAnimals();
  } else {
    alert("Please login first!");
    window.location.href = "login.html";
  }

});


// ✅ LOAD ANIMALS
async function loadAnimals() {

  if (!currentUserUID) return;

  const table = document.getElementById("animalTable");
  if (!table) return;

  table.innerHTML = "";

  const querySnapshot = await getDocs(
    collection(db, "users", currentUserUID, "animals")
  );

  let labels = [];
  let temperatures = [];
  let healthy = 0;
  let fever = 0;

  querySnapshot.forEach((docSnap) => {

    const data = docSnap.data();

    let status = "Healthy";
    if (data.temperature > 40) {
      status = "⚠ Fever";
      fever++;
    } else {
      healthy++;
    }

    labels.push(data.name);
    temperatures.push(data.temperature);

    table.innerHTML += `
      <tr>
        <td>${data.name}</td>
        <td>${data.type}</td>
        <td>${data.temperature}</td>
        <td>${data.heartRate}</td>
        <td>${status}</td>
      </tr>
    `;
  });

  generateCharts(labels, temperatures, healthy, fever);
  generateAnalytics(temperatures);
}


// ✅ ADD ANIMAL
async function addAnimal(name, type, temperature, heartRate) {

  if (!currentUserUID) {
    alert("Please login first!");
    return;
  }

  await addDoc(
    collection(db, "users", currentUserUID, "animals"),
    {
      name,
      type,
      temperature,
      heartRate
    }
  );

  loadAnimals();
}


// ✅ FORM SUBMIT
const form = document.getElementById("animalForm");

if (form) {
  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const temperature = Number(document.getElementById("temperature").value);
    const heartRate = Number(document.getElementById("heartRate").value);

    await addAnimal(name, type, temperature, heartRate);

    alert("Animal Added Successfully!");
    form.reset();
  });
}
function generateCharts(labels, temperatures, healthy, fever) {

  const tempCanvas = document.getElementById("tempChart");
  const statusCanvas = document.getElementById("statusChart");

  if (!tempCanvas || !statusCanvas) {
    console.log("Canvas not found");
    return;
  }

  if (tempChart) tempChart.destroy();
  if (statusChart) statusChart.destroy();

  tempChart = new Chart(tempCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Temperature (°C)",
        data: temperatures,
        borderWidth: 2,
        tension: 0.3
      }]
    }
  });

  statusChart = new Chart(statusCanvas, {
    type: "pie",
    data: {
      labels: ["Healthy", "Fever"],
      datasets: [{
        data: [healthy, fever]
      }]
    }
  });
}
function generateAnalytics(temperatures) {

  if (!temperatures || temperatures.length === 0) {
    console.log("No temperature data");
    return;
  }

  const avgElement = document.getElementById("avgTemp");
  const maxElement = document.getElementById("maxTemp");
  const minElement = document.getElementById("minTemp");

  if (!avgElement || !maxElement || !minElement) {
    console.log("Analytics elements not found");
    return;
  }

  let sum = temperatures.reduce((a, b) => a + b, 0);
  let avg = (sum / temperatures.length).toFixed(2);
  let max = Math.max(...temperatures).toFixed(2);
  let min = Math.min(...temperatures).toFixed(2);

  avgElement.innerText = avg;
  maxElement.innerText = max;
  minElement.innerText = min;
}