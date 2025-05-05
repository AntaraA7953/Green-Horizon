const apiKey = "cdf3fe6585305f2c28044acdd6fcd3ad";

window.onload = function () {
  const overlay = document.getElementById("introImageOverlay");
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 1500);
  }, 2500);

  // Show saved points
  document.getElementById("ecoPointsDisplay").textContent = localStorage.getItem("ecoPoints") || 0;
};

const map = L.map('map').setView([28.6139, 77.2090], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let routeControls = [];

async function geocode(place) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
  const data = await res.json();
  if (data.length === 0) throw new Error("Place not found");
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

function getColorByEcoScore(score) {
  if (score >= 75) return "green";
  if (score >= 50) return "orange";
  if (score >= 25) return "yellow";
  return "red";
}

function getRandomEcoScore() {
  return Math.floor(Math.random() * 100);
}

function updateEcoMeter(dailyEmissionValue, weeklyEmissionValue) {
  const dailyEmission = document.getElementById('dailyEmission');
  const weeklyEmission = document.getElementById('weeklyEmission');
  const progressBar = document.getElementById('dailyProgressBar');

  dailyEmission.textContent = dailyEmissionValue.toFixed(2);
  weeklyEmission.textContent = weeklyEmissionValue.toFixed(2);

  const percentage = Math.min((dailyEmissionValue / 20) * 100, 100);
  progressBar.style.width = `${percentage}%`;

  if (percentage < 25) {
    progressBar.style.background = "linear-gradient(90deg, #4caf50, #81c784)";
  } else if (percentage < 50) {
    progressBar.style.background = "linear-gradient(90deg, #ffc107, #ffd54f)";
  } else if (percentage < 75) {
    progressBar.style.background = "linear-gradient(90deg, #ff9800, #ffb74d)";
  } else {
    progressBar.style.background = "linear-gradient(90deg, #f44336, #e57373)";
  }
}

function calculatePoints(dist, mode) {
  let pointsPerKm;
  switch (mode) {
    case "foot-walking":
      pointsPerKm = 10;
      break;
    case "cycling-regular":
      pointsPerKm = 8;
      break;
    case "bus":
      pointsPerKm = 5;
      break;
    case "motorcycle":
      pointsPerKm = 2;
      break;
    case "driving-car":
      pointsPerKm = 1;
      break;
    default:
      pointsPerKm = 0;
  }
  return dist * pointsPerKm;
}

function updateEcoPoints(pointsEarned) {
  let currentPoints = parseInt(localStorage.getItem("ecoPoints")) || 0;
  currentPoints += Math.floor(pointsEarned);
  localStorage.setItem("ecoPoints", currentPoints);
  document.getElementById("ecoPointsDisplay").textContent = currentPoints;
}

async function getEcoRoute() {
  const src = document.getElementById("source").value;
  const dest = document.getElementById("destination").value;
  const mode = document.getElementById("mode").value;

  if (!src || !dest) {
    alert("Please enter both places");
    return;
  }

  try {
    const [lat1, lon1] = await geocode(src);
    const [lat2, lon2] = await geocode(dest);

    routeControls.forEach(ctrl => map.removeControl(ctrl));
    routeControls = [];
    document.getElementById("routeDetails").innerHTML = "";

    const ecoScores = [getRandomEcoScore(), getRandomEcoScore(), getRandomEcoScore()];
    const colors = ecoScores.map(getColorByEcoScore);

    ecoScores.forEach((ecoScore, index) => {
      const color = colors[index];

      const control = L.Routing.control({
        waypoints: [L.latLng(lat1 + Math.random() * 0.01, lon1 + Math.random() * 0.01), L.latLng(lat2, lon2)],
        lineOptions: {
          styles: [{ color, opacity: 0.8, weight: 6 }]
        },
        createMarker: () => null,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false
      }).addTo(map);

      control.on('routesfound', async e => {
        const r = e.routes[0];
        const dist = (r.summary.totalDistance / 1000).toFixed(1);
        const time = (r.summary.totalTime / 60).toFixed(1);

        const mid = r.coordinates[Math.floor(r.coordinates.length / 2)];

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${mid.lat}&lon=${mid.lng}&appid=${apiKey}&units=metric`);
        const weather = await weatherRes.json();

        const airRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${mid.lat}&lon=${mid.lng}&appid=${apiKey}`);
        const air = await airRes.json();
        const aqi = air.list[0].main.aqi;
        const aqiText = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1];

        document.getElementById("routeDetails").innerHTML += `
          <b>Route ${index + 1}:</b><br>
          <b>Distance:</b> ${dist} km<br>
          <b>Time:</b> ${time} mins<br>
          <b>Eco Score:</b> ${ecoScore}/100
          <div class="eco-bar-container"><div class="eco-bar" style="width:${ecoScore}%; background:${color};"></div></div>
          <br><b>Weather:</b> ${weather.weather[0].main}, ${weather.main.temp}°C<br>
          <b>Air Quality:</b> ${aqiText}<br><br>
        `;

        let emissionFactor;
        switch (mode) {
          case "driving-car":
            emissionFactor = 0.2;
            break;
          case "cycling-regular":
            emissionFactor = 0.02;
            break;
          case "foot-walking":
            emissionFactor = 0.01;
            break;
          case "motorcycle":
            emissionFactor = 0.1;
            break;
          case "bus":
            emissionFactor = 0.05;
            break;
          default:
            emissionFactor = 0.2;
        }

        const dailyEmission = dist * emissionFactor;
        const weeklyEmission = dailyEmission * 7;
        updateEcoMeter(dailyEmission, weeklyEmission);

        // Points System
        const pointsEarned = calculatePoints(dist, mode);
        updateEcoPoints(pointsEarned);
        alert(`You earned ${Math.floor(pointsEarned)} Eco Points! 🌟`);
      });

      routeControls.push(control);
    });
  } catch (err) {
    alert("Error loading route. Try again.");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
