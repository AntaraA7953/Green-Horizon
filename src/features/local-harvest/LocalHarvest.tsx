import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './LocalHarvest.css';

interface FoodSpot {
  name: string;
  lat: number;
  lon: number;
  type: string;
}

const LocalHarvest: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? saved === 'true' : false;
  });
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('driving-car');
  const [routeDetails, setRouteDetails] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(true);
  const [foodFilters, setFoodFilters] = useState<Record<string, boolean>>({
    'eco-certified': true,
    'farm-sourced': true,
    'organic': true,
    'farmers-market': true,
    'sustainable-grocer': true
  });
  const [foodSpots, setFoodSpots] = useState<FoodSpot[]>([]);

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

  const apiKey = "cdf3fe6585305f2c28044acdd6fcd3ad";

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 2500);
    mapRef.current = L.map('map').setView([28.6139, 77.2090], 6);
    if (darkMode) mapRef.current.addLayer(darkTilesRef.current);
    else mapRef.current.addLayer(lightTilesRef.current);
    return () => {
      clearTimeout(timer);
      mapRef.current?.remove();
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (mapRef.current) {
      mapRef.current.removeLayer(newMode ? lightTilesRef.current : darkTilesRef.current);
      mapRef.current.addLayer(newMode ? darkTilesRef.current : lightTilesRef.current);
    }
  };

  const handleFilterChange = (filter: string) => {
    setFoodFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const geocode = async (place: string): Promise<[number, number]> => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
    const data = await res.json();
    if (!data.length) throw new Error("Place not found");
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  const getColorByEcoScore = (score: number): string => {
    if (score >= 75) return "green";
    if (score >= 50) return "orange";
    if (score >= 25) return "yellow";
    return "red";
  };

  const getRandomEcoScore = () => Math.floor(Math.random() * 100);

  const clearFoodMarkers = () => {
    foodMarkersRef.current.forEach(marker => mapRef.current?.removeLayer(marker));
    foodMarkersRef.current = [];
  };

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
    return data.elements.map((el: any, i: number) => ({
      name: el.tags?.name || `Local Food Spot ${i + 1}`,
      lat: el.lat,
      lon: el.lon,
      type: (el.tags?.shop || el.tags?.amenity || "Farm-Sourced").toLowerCase()
    }));
  };

  const displayFoodSpots = (spots: FoodSpot[]) => {
    clearFoodMarkers();
    const activeFilters = Object.entries(foodFilters).filter(([_, isActive]) => isActive).map(([k]) => k);
    const newMarkers: L.Marker[] = [];
    spots.forEach(spot => {
      let cat = "farm-sourced";
      if (spot.type.includes("organic")) cat = "eco-certified";
      else if (spot.type.includes("marketplace")) cat = "farmers-market";
      else if (spot.type.includes("greengrocer")) cat = "sustainable-grocer";
      if (activeFilters.includes(cat)) {
        const marker = L.marker([spot.lat, spot.lon]);
        marker.bindPopup(`<b>${spot.name}</b><br>Type: ${cat.replace('-', ' ')}`);
        marker.addTo(mapRef.current!);
        newMarkers.push(marker);
      }
    });
    foodMarkersRef.current = newMarkers;
  };

  const getEcoRoute = async () => {
    if (!source || !destination) return alert("Please enter both places");
    try {
      const [lat1, lon1] = await geocode(source);
      const [lat2, lon2] = await geocode(destination);

      routeControlsRef.current.forEach(ctrl => mapRef.current?.removeControl(ctrl));
      routeControlsRef.current = [];
      setRouteDetails([]);
      clearFoodMarkers();
      setFoodSpots([]);

      const ecoScores = [getRandomEcoScore(), getRandomEcoScore(), getRandomEcoScore()];
      const newDetails: string[] = [];
      const sourceSpots = await generateFoodSpots(lat1, lon1);
      const destSpots = await generateFoodSpots(lat2, lon2);
      const allSpots = [...sourceSpots, ...destSpots];
      setFoodSpots(allSpots);
      displayFoodSpots(allSpots);

      ecoScores.forEach(async (ecoScore, i) => {
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

        control.addTo(mapRef.current!);

        control.on('routesfound', async (e: L.Routing.RoutingEvent) => {
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

          newDetails.push(`
            <b>Route ${i + 1}:</b><br>
            <b>Distance:</b> ${dist} km<br>
            <b>Time:</b> ${time} mins<br>
            <b>Eco Score:</b> ${ecoScore}/100
            <div class="eco-bar-container"><div class="eco-bar" style="width:${ecoScore}%; background:${color};"></div></div>
            <br><b>Weather:</b> ${weather.weather[0].main}, ${weather.main.temp}°C<br>
            <b>Air Quality:</b> ${aqiText}<br><br>
          `);

          setRouteDetails([...newDetails]);
          const midSpots = await generateFoodSpots(mid.lat, mid.lng);
          setFoodSpots(prev => [...prev, ...midSpots]);
          displayFoodSpots([...allSpots, ...midSpots]);
        });
        routeControlsRef.current.push(control);
      });
    } catch {
      alert("Error loading route. Try again.");
    }
  };

  useEffect(() => {
    if (foodSpots.length) displayFoodSpots(foodSpots);
  }, [foodFilters]);

  return (
    <div className={`local-harvest-container ${darkMode ? 'dark' : ''}`}>
      {showOverlay && (
        <div className="overlay">
          <img src="Local_Harvest.png" alt="Welcome" />
        </div>
      )}

      <header>
        🌱 LOCAL HARVEST
        <button onClick={toggleDarkMode}>🌓</button>
      </header>

      <div className="main">
        <aside>
          <label>Source
            <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. Delhi" />
          </label>

          <label>Destination
            <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Agra" />
          </label>

          <label>Mode
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="driving-car">Driving</option>
              <option value="cycling-regular">Cycling</option>
              <option value="foot-walking">Walking</option>
              <option value="motorcycle">Motorbike</option>
              <option value="bus">Public Transport</option>
            </select>
          </label>

          <button onClick={getEcoRoute}>Get Route</button>

          <div className="filters">
            <label><input type="checkbox" checked={foodFilters['eco-certified']} onChange={() => handleFilterChange('eco-certified')} /> Eco-Certified</label>
            <label><input type="checkbox" checked={foodFilters['farm-sourced']} onChange={() => handleFilterChange('farm-sourced')} /> Farm-Sourced</label>
            <label><input type="checkbox" checked={foodFilters['organic']} onChange={() => handleFilterChange('organic')} /> Organic</label>
            <label><input type="checkbox" checked={foodFilters['farmers-market']} onChange={() => handleFilterChange('farmers-market')} /> Farmer's Market</label>
            <label><input type="checkbox" checked={foodFilters['sustainable-grocer']} onChange={() => handleFilterChange('sustainable-grocer')} /> Sustainable Grocer</label>
          </div>

          <div className="route-details" dangerouslySetInnerHTML={{ __html: routeDetails.join('') }} />
        </aside>
        <div id="map" />
      </div>
    </div>
  );
};

export default LocalHarvest;
