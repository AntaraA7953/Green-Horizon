import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface FoodSpot {
  name: string;
  lat: number;
  lon: number;
  type: string;
}

const LocalHarvest: React.FC = () => {
  // State variables
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : false;
  });
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [mode, setMode] = useState<string>('driving-car');
  const [routeDetails, setRouteDetails] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [foodFilters, setFoodFilters] = useState<Record<string, boolean>>({
    'eco-certified': true,
    'farm-sourced': true,
    'organic': true,
    'farmers-market': true,
    'sustainable-grocer': true
  });
  const [foodSpots, setFoodSpots] = useState<FoodSpot[]>([]);

  // Refs
  const mapRef = useRef<L.Map | null>(null);
  const routeControlsRef = useRef<L.Routing.Control[]>([]);
  const foodMarkersRef = useRef<L.Marker[]>([]);
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

  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setFoodFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
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

  // Clear all food markers from map
  const clearFoodMarkers = () => {
    foodMarkersRef.current.forEach(marker => {
      if (mapRef.current && marker) {
        mapRef.current.removeLayer(marker);
      }
    });
    foodMarkersRef.current = [];
  };

  // Generate food spots from Overpass API
  const generateFoodSpots = async (lat: number, lon: number): Promise<FoodSpot[]> => {
    const query = `
      [out:json][timeout:25];
      (
        node(around:8000,${lat},${lon})["shop"~"organic|greengrocer|farm"];
        node(around:8000,${lat},${lon})["amenity"="marketplace"];
      );
      out body;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.elements) return [];

    return data.elements.map((el: any, index: number) => ({
      name: el.tags?.name || `Local Food Spot ${index + 1}`,
      lat: el.lat,
      lon: el.lon,
      type: (el.tags?.shop || el.tags?.amenity || "Farm-Sourced").toLowerCase()
    }));
  };

  // Display food spots based on current filters
  const displayFoodSpots = (spots: FoodSpot[]) => {
    clearFoodMarkers();
    
    const activeFilters = Object.entries(foodFilters)
      .filter(([_, isActive]) => isActive)
      .map(([filter]) => filter);

    const newMarkers: L.Marker[] = [];
    
    spots.forEach(spot => {
      let spotCategory = "farm-sourced";
      if (spot.type.includes("organic")) spotCategory = "eco-certified";
      else if (spot.type.includes("marketplace")) spotCategory = "farmers-market";
      else if (spot.type.includes("greengrocer")) spotCategory = "sustainable-grocer";

      if (activeFilters.includes(spotCategory)) {
        const marker = L.marker([spot.lat, spot.lon]);
        if (mapRef.current) {
          marker.addTo(mapRef.current)
            .bindPopup(`<b>${spot.name}</b><br>Type: ${spotCategory.replace("-", " ")}`);
          newMarkers.push(marker);
        }
      }
    });

    foodMarkersRef.current = newMarkers;
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

      // Clear previous routes and food spots
      routeControlsRef.current.forEach(ctrl => {
        if (mapRef.current) mapRef.current.removeControl(ctrl);
      });
      routeControlsRef.current = [];
      setRouteDetails([]);
      clearFoodMarkers();
      setFoodSpots([]);

      const ecoScores = [getRandomEcoScore(), getRandomEcoScore(), getRandomEcoScore()];
      const newRouteDetails: string[] = [];

      // Generate food spots for source, mid-point, and destination
      const spotsNearSource = await generateFoodSpots(lat1, lon1);
      const spotsNearDest = await generateFoodSpots(lat2, lon2);
      const allSpots = [...spotsNearSource, ...spotsNearDest];
      setFoodSpots(allSpots);
      displayFoodSpots(allSpots);

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

          // Generate food spots for mid-point
          const spotsNearMid = await generateFoodSpots(mid.lat, mid.lng);
          setFoodSpots(prev => [...prev, ...spotsNearMid]);
          displayFoodSpots([...allSpots, ...spotsNearMid]);
        });

        routeControlsRef.current.push(control);
      });
    } catch (err) {
      alert("Error loading route. Try again.");
    }
  };

  // Update food display when filters change
  useEffect(() => {
    if (foodSpots.length > 0) {
      displayFoodSpots(foodSpots);
    }
  }, [foodFilters, foodSpots]);

  return (
    <>
      {showOverlay && (
        <div id="introImageOverlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#e4da89ff',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1,
          transition: 'opacity 1.5s ease-out'
        }}>
          <img 
            src="Local_Harvest.png" 
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
        background: 'linear-gradient(90deg, #f5dd04ff, #38ef7d, #f16b05ff)',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        position: 'relative'
      }}>
        🌱 LOCAL HARVEST
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
          width: '320px',
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
                boxShadow: '0 2px 6px hsla(0, 47%, 97%, 0.10)'
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
              background: '#d6660bff',
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

          <div id="filter-panel" style={{ marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: '10px' }}>Local Harvest Sustainable Food Finder</h3>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input 
                type="checkbox" 
                className="food-filter" 
                checked={foodFilters['eco-certified']}
                onChange={() => handleFilterChange('eco-certified')}
              /> Eco-Certified
            </label>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input 
                type="checkbox" 
                className="food-filter" 
                checked={foodFilters['farm-sourced']}
                onChange={() => handleFilterChange('farm-sourced')}
              /> Farm-Sourced
            </label>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input 
                type="checkbox" 
                className="food-filter" 
                checked={foodFilters['organic']}
                onChange={() => handleFilterChange('organic')}
              /> Organic
            </label>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input 
                type="checkbox" 
                className="food-filter" 
                checked={foodFilters['farmers-market']}
                onChange={() => handleFilterChange('farmers-market')}
              /> Farmer's Market
            </label>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input 
                type="checkbox" 
                className="food-filter" 
                checked={foodFilters['sustainable-grocer']}
                onChange={() => handleFilterChange('sustainable-grocer')}
              /> Sustainable Grocer
            </label>
          </div>

          <div 
            className="route-details" 
            id="routeDetails"
            style={{
              marginTop: '1rem',
              background: darkMode ? '#1f1f1f' : 'rgbda(255, 255, 255, 0.8)',
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

export default LocalHarvest;