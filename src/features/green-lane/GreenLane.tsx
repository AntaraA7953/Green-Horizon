import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const EcoRoute: React.FC = () => {
  // State variables
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : prefersDark;
  });
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [mode, setMode] = useState<string>('driving-car');
  const [dailyEmission, setDailyEmission] = useState<number>(0);
  const [weeklyEmission, setWeeklyEmission] = useState<number>(0);
  const [ecoPoints, setEcoPoints] = useState<number>(() => {
    return parseInt(localStorage.getItem('ecoPoints') || '0');
  });
  const [routeDetails, setRouteDetails] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);

  // Refs
  const mapRef = useRef<L.Map | null>(null);
  const routeControlsRef = useRef<L.Routing.Control[]>([]);
  const lightTilesRef = useRef(L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '© OpenStreetMap contributors' }
  ));
  const darkTilesRef = useRef(L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap contributors, © CARTO' }
  ));

  // API Key (consider moving to environment variables)
  const apiKey = "cdf3fe6585305f2c28044acdd6fcd3ad";

  // Initialize map
  useEffect(() => {
    // Overlay timeout
    const overlayTimer = setTimeout(() => {
      setShowOverlay(false);
    }, 2500);

    // Initialize map
    mapRef.current = L.map('map').setView([28.6139, 77.2090], 6);
    
    // Set initial tile layer
    if (darkMode) {
      mapRef.current.addLayer(darkTilesRef.current);
    } else {
      mapRef.current.addLayer(lightTilesRef.current);
    }

    return () => {
      clearTimeout(overlayTimer);
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (mapRef.current) {
      if (newDarkMode) {
        mapRef.current.removeLayer(lightTilesRef.current);
        mapRef.current.addLayer(darkTilesRef.current);
      } else {
        mapRef.current.removeLayer(darkTilesRef.current);
        mapRef.current.addLayer(lightTilesRef.current);
      }
    }
  };

  // Geocode function
  const geocode = async (place: string): Promise<[number, number]> => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
    const data = await res.json();
    if (data.length === 0) throw new Error("Place not found");
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  // Helper functions
  const getColorByEcoScore = (score: number): string => {
    if (score >= 75) return "green";
    if (score >= 50) return "orange";
    if (score >= 25) return "yellow";
    return "red";
  };

  const getRandomEcoScore = (): number => {
    return Math.floor(Math.random() * 100);
  };

  const calculatePoints = (dist: number, mode: string): number => {
    const pointsPerKm: Record<string, number> = {
      "foot-walking": 10,
      "cycling-regular": 8,
      "bus": 5,
      "motorcycle": 2,
      "driving-car": 1
    };
    return dist * (pointsPerKm[mode] || 0);
  };

  const updateEcoPoints = (pointsEarned: number) => {
    const newPoints = ecoPoints + Math.floor(pointsEarned);
    setEcoPoints(newPoints);
    localStorage.setItem("ecoPoints", newPoints.toString());
  };

  // Main route function
  const getEcoRoute = async () => {
    if (!source || !destination) {
      alert("Please enter both places");
      return;
    }

    try {
      const [lat1, lon1] = await geocode(source);
      const [lat2, lon2] = await geocode(destination);

      // Clear previous routes
      routeControlsRef.current.forEach(ctrl => {
        if (mapRef.current) mapRef.current.removeControl(ctrl);
      });
      routeControlsRef.current = [];
      setRouteDetails([]);

      const ecoScores = [getRandomEcoScore(), getRandomEcoScore(), getRandomEcoScore()];
      const newRouteDetails: string[] = [];

      ecoScores.forEach(async (ecoScore, index) => {
        const color = getColorByEcoScore(ecoScore);

        const control = L.Routing.control({
          waypoints: [
            L.latLng(lat1 + Math.random() * 0.01, lon1 + Math.random() * 0.01), 
            L.latLng(lat2, lon2)
          ],
          lineOptions: {
            styles: [{ color, opacity: 0.8, weight: 6 }]
          },
          createMarker: () => null,
          addWaypoints: false,
          draggableWaypoints: false,
          show: false
        });

        if (mapRef.current) {
          control.addTo(mapRef.current);
        }

        control.on('routesfound', async (e: L.Routing.RoutingEvent) => {
          const r = e.routes[0];
          const dist = (r.summary.totalDistance / 1000).toFixed(1);
          const time = (r.summary.totalTime / 60).toFixed(1);

          const mid = r.coordinates[Math.floor(r.coordinates.length / 2)];

          // Fetch weather data
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${mid.lat}&lon=${mid.lng}&appid=${apiKey}&units=metric`
          );
          const weather = await weatherRes.json();

          // Fetch air quality data
          const airRes = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${mid.lat}&lon=${mid.lng}&appid=${apiKey}`
          );
          const air = await airRes.json();
          const aqi = air.list[0].main.aqi;
          const aqiText = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1];

          // Add route details
          newRouteDetails.push(`
            <b>Route ${index + 1}:</b><br>
            <b>Distance:</b> ${dist} km<br>
            <b>Time:</b> ${time} mins<br>
            <b>Eco Score:</b> ${ecoScore}/100
            <div class="eco-bar-container"><div class="eco-bar" style="width:${ecoScore}%; background:${color};"></div></div>
            <br><b>Weather:</b> ${weather.weather[0].main}, ${weather.main.temp}°C<br>
            <b>Air Quality:</b> ${aqiText}<br><br>
          `);

          setRouteDetails([...newRouteDetails]);

          // Calculate emissions
          const emissionFactors: Record<string, number> = {
            "driving-car": 0.2,
            "cycling-regular": 0.02,
            "foot-walking": 0.01,
            "motorcycle": 0.1,
            "bus": 0.05
          };

          const dailyEmissionValue = parseFloat(dist) * (emissionFactors[mode] || 0.2);
          const weeklyEmissionValue = dailyEmissionValue * 7;
          setDailyEmission(dailyEmissionValue);
          setWeeklyEmission(weeklyEmissionValue);

          // Update points
          const pointsEarned = calculatePoints(parseFloat(dist), mode);
          updateEcoPoints(pointsEarned);
          alert(`You earned ${Math.floor(pointsEarned)} Eco Points! 🌟`);
        });

        routeControlsRef.current.push(control);
      });
    } catch (err) {
      alert("Error loading route. Try again.");
    }
  };

  // Calculate progress bar percentage and color
  const progressPercentage = Math.min((dailyEmission / 20) * 100, 100);
  const progressBarColor = progressPercentage < 25 
    ? "linear-gradient(90deg, #4caf50, #81c784)" 
    : progressPercentage < 50 
      ? "linear-gradient(90deg, #ffc107, #ffd54f)" 
      : progressPercentage < 75 
        ? "linear-gradient(90deg, #ff9800, #ffb74d)" 
        : "linear-gradient(90deg, #f44336, #e57373)";

  return (
    <>
      {showOverlay && (
        <div id="introImageOverlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#b5f5c6',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1,
          transition: 'opacity 1.5s ease-out'
        }}>
          <img 
            src="landingImage.png" 
            alt="Welcome Image" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }} 
          />
        </div>
      )}

      <header style={{
        background: 'linear-gradient(90deg, #11998e, #38ef7d)',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        position: 'relative'
      }}>
        🌱 GREEN LANE
        <button 
          className="toggle-dark" 
          onClick={toggleDarkMode}
          style={{
            position: 'absolute',
            top: '18px',
            right: '25px',
            background: darkMode ? '#333' : '#fff',
            color: darkMode ? 'white' : 'inherit',
            border: 'none',
            padding: '8px 12px',
            fontSize: '1rem',
            borderRadius: '10px',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          🌓
        </button>
      </header>

      <div className="container" style={{
        display: 'flex',
        height: 'calc(100vh - 70px)'
      }}>
        <aside style={{
          width: '350px',
          padding: '20px',
          background: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(14px)',
          borderRight: darkMode ? '2px solid #444' : '2px solid #ddd',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto'
        }}>
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="source" style={{
              fontWeight: 600,
              display: 'block',
              marginBottom: '5px'
            }}>
              Source
            </label>
            <input 
              type="text" 
              id="source" 
              placeholder="e.g. Delhi"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="destination" style={{
              fontWeight: 600,
              display: 'block',
              marginBottom: '5px'
            }}>
              Destination
            </label>
            <input 
              type="text" 
              id="destination" 
              placeholder="e.g. Agra"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="mode" style={{
              fontWeight: 600,
              display: 'block',
              marginBottom: '5px'
            }}>
              Mode
            </label>
            <select 
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <option value="driving-car">Driving</option>
              <option value="cycling-regular">Cycling</option>
              <option value="foot-walking">Walking</option>
              <option value="motorcycle">Motorbike</option>
              <option value="bus">Public Transport</option>
            </select>
          </div>

          <button 
            id="getRouteBtn"
            onClick={getEcoRoute}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.1rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              marginTop: '10px',
              marginBottom: '15px'
            }}
          >
            Get Route
          </button>

          <div className="eco-meter" style={{
            background: darkMode ? '#1a2e22' : '#e0ffe4',
            padding: '15px',
            borderRadius: '15px',
            marginTop: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s'
          }}>
            <h3 style={{
              marginBottom: '10px',
              fontSize: '1.5rem',
              color: darkMode ? '#38ef7d' : '#11998e'
            }}>
              🌍 Eco Meter
            </h3>
            <div className="progress-container" style={{
              background: darkMode ? '#374151' : '#d1d5db',
              borderRadius: '20px',
              height: '20px',
              width: '100%',
              overflow: 'hidden',
              marginBottom: '10px'
            }}>
              <div 
                className="progress-bar"
                style={{
                  height: '100%',
                  width: `${progressPercentage}%`,
                  borderRadius: '20px',
                  transition: 'width 1s ease-in-out',
                  background: progressBarColor
                }}
              />
            </div>
            <p style={{ color: darkMode ? '#e5e7eb' : '#333' }}>
              <strong style={{ color: darkMode ? '#38ef7d' : '#11998e' }}>Today's Emission:</strong> {dailyEmission.toFixed(2)} kg CO₂
            </p>
            <p style={{ color: darkMode ? '#e5e7eb' : '#333' }}>
              <strong style={{ color: darkMode ? '#38ef7d' : '#11998e' }}>This Week:</strong> {weeklyEmission.toFixed(2)} kg CO₂
            </p>
          </div>

          <div className="eco-points" style={{
            background: darkMode ? '#1a2e22' : '#d1ffd6',
            padding: '15px',
            borderRadius: '15px',
            marginTop: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s'
          }}>
            <h3 style={{
              marginBottom: '10px',
              fontSize: '1.5rem',
              color: darkMode ? '#38ef7d' : '#11998e'
            }}>
              🏆 Your Eco Points:
            </h3>
            <p style={{
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: darkMode ? '#38ef7d' : '#10b981'
            }}>
              {ecoPoints}
            </p>
          </div>

          <div 
            className="route-details" 
            id="routeDetails"
            style={{
              marginTop: '1rem',
              background: darkMode ? '#1f1f1f' : 'white',
              padding: '1rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
            dangerouslySetInnerHTML={{ __html: routeDetails.join('') }}
          />
        </aside>

        <div id="map" style={{ flex: 1 }} />
      </div>
    </>
  );
};

export default EcoRoute;