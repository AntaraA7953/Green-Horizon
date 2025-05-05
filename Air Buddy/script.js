document.addEventListener("DOMContentLoaded", () => {
  const aqiText = document.getElementById("aqi");
  const messageText = document.getElementById("message");
  const iconContainer = document.getElementById("icon");
  const alertBox = document.getElementById("alert");
  const countdown = document.getElementById("countdown");
  const tipsEl = document.getElementById("tips");                                                                                                                          
  const refreshButton = document.getElementById("refreshButton");

  const descriptions = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  const messages = [
    "Enjoy your day outside!",
    "Air is fine today.",
    "Be cautious, especially for sensitive individuals.",
    "Limit outdoor activities.",
    "Stay indoors and use air purifiers."
  ];

  const icons = {
    1: "images/good.png",
    2: "images/fair.png",
    3: "images/moderate.png",
    4: "images/poor.png",
    5: "images/very-poor.png"
  };

  const backgrounds = {
    1: "linear-gradient(to right, #a8edea, #fed6e3)",
    2: "linear-gradient(to right, #d4fc79, #96e6a1)",
    3: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    4: "linear-gradient(to right, #fda085, #f6d365)",
    5: "linear-gradient(to right, #f5576c, #f093fb)"
  }; 

  const ecoTips = [
    "🌱 Add air-purifying indoor plants like spider plant or peace lily.",
    "🚲 Reduce pollution by biking or walking for short trips.",
    "💧 Stay hydrated when the air is dry.",
    "🧼 Keep windows closed on poor AQI days.",
    "🌍 Recycle and reduce waste to help reduce pollution."
  ];

  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  function showRandomTip() {
    const tip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    tipsEl.textContent = tip;
  }

  function startCountdown(seconds = 300) {
    let remaining = seconds;
    const interval = setInterval(() => {
      countdown.textContent = `Next update in ${remaining}s`;
      remaining--;
      if (remaining < 0) {
        clearInterval(interval);
        getAQI();
      }
    }, 1000);
  }

  async function getAQI() {
    if (!navigator.geolocation) {
      aqiText.textContent = "Geolocation not supported";
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = "85e6a8487f1530f75af6214fff82beb7";
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;


      try {
        const response = await fetch(url);
        const data = await response.json();
        const aqi = data.list[0].main.aqi;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
      
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
      
        document.getElementById('temperature').textContent = `🌡️ Temperature: ${temperature}°C`;
        document.getElementById('humidity').textContent = `💧 Humidity: ${humidity}%`;
        document.getElementById('wind').textContent = `💨 Wind Speed: ${windSpeed} m/s`;
      

        aqiText.textContent = `AQI Level: ${aqi} (${descriptions[aqi - 1]})`;
        messageText.textContent = messages[aqi - 1];
        iconContainer.innerHTML = `<img src="${icons[aqi]}" alt="${descriptions[aqi - 1]}" class="aqi-icon" />`;
        document.body.style.background = backgrounds[aqi];

        if (aqi >= 4) {
          alertBox.classList.remove("hidden");
          if (Notification.permission === "granted") {
            new Notification("AirBuddy Alert", {
              body: `Air quality is ${descriptions[aqi - 1]}. ${messages[aqi - 1]}`,
              icon: "images/eco-notification.png"
            });
          }
        } else {
          alertBox.classList.add("hidden");
        }

        showRandomTip();
        startCountdown(); // 5 minutes countdown
      } catch (error) {
        aqiText.textContent = "Failed to fetch AQI";
        console.error(error);
      }
    }, () => {
      aqiText.textContent = "Unable to access location";
    });
  }

  refreshButton.addEventListener("click", () => {
    getAQI();
  });

  getAQI();
});