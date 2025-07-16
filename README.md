# 🌿 Green Horizon

**Green Horizon** is a unified platform for sustainable living and smart environmental solutions. It brings together a suite of eco-conscious applications that promote green transportation, smart waste management, cleaner air, and local food systems using modern web technologies, APIs, and machine learning.

---

## 🚀 Features

### 🌍 1. EcoRoute
A green navigation system that helps users choose eco-friendly travel routes:
- Walking/Biking route suggestions
- Real-time weather and air quality data using OpenWeatherMap API
- Tree coverage consideration and an intelligent **Green Score**

### 🗑 2. Wasteless – Smart Waste Sorting Assistant
An AI-powered tool to reduce landfill waste by educating users:
- Classifies waste into **Recyclable**, **Compost**, or **Trash**
- Uses machine learning to detect and sort waste via image upload
- Helps users build better waste-sorting habits

### 🛒 3. Local Harvest
A local food discovery and sustainability platform:
- Connects users to **local farms**, **organic vendors**, and **seasonal markets**
- Promotes local and sustainable consumption
- Provides eco-friendly agricultural and dietary tips

### 🍃 4. AirBuddy
Your real-time air quality companion:
- Displays **AQI (Air Quality Index)** based on user location
- Offers personalized health tips based on pollution levels
- Clean, mobile-responsive interface with outdoor activity suggestions

---

## 🧰 Tech Stack

- **Frontend:** React
- **APIs:** 
  - OpenWeatherMap API (weather & air quality)
  - OpenRouteService API (navigation & geolocation)
- **AI/ML:** TensorFlow / Keras (used in Wasteless)
- **Design:** Modern responsive UI, dark/light mode, background videos
- **Deployment:** Vercel

---

## 🛠 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/green-horizon.git
   cd green-horizon
Insert your API keys in config.js:

javascript
Copy
Edit
const OPENWEATHER_API_KEY = 'your_openweather_key';
const OPENROUTESERVICE_API_KEY = 'your_openrouteservice_key';
Run locally by opening index.html in a browser, or deploy via your preferred platform.

📁 Project Structure
pgsql
Copy
Edit
green-horizon/
├── index.html
├── ecoRoute/
│   ├── map.html
│   ├── ecoRoute.js
│   ├── ecoRoute.mp4
│   └── ecoRoute1.mp4
├── wasteless/
│   ├── index.html
│   ├── model.js
│   └── styles.css
├── localHarvest/
│   ├── index.html
│   └── localHarvest.js
├── airBuddy/
│   ├── index.html
│   └── airQuality.js
├── assets/
│   ├── images/
│   └── icons/
└── styles/
    └── global.css
💡 Future Plans
Gamified eco-journeys and community challenges

Interactive pollution and produce heatmaps

Mobile app support (Progressive Web App)

Expansion to support carbon tracking and eco-credits

🤝 Contributing
We welcome community contributions! Feel free to fork, raise issues, or submit pull requests. For major changes, open an issue first to discuss what you'd like to work on.

📜 License
This project is licensed under the MIT License.

🌟 Acknowledgements
OpenWeatherMap – for weather & air quality data

OpenRouteService – for navigation services

TensorFlow.js – for real-time waste classification

All open-source contributors who made this project possible 💚
