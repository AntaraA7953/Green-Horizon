import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sun, Moon, RefreshCw, MapPin, Thermometer, Droplets, Wind, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import airGoodIcon from '@/assets/air-good.png';
import airFairIcon from '@/assets/air-fair.png';
import airModerateIcon from '@/assets/air-moderate.png';
import airPoorIcon from '@/assets/air-poor.png';
import airVeryPoorIcon from '@/assets/air-very-poor.png';
import ecoNotificationIcon from '@/assets/eco-notification.png';
import './AirBuddy.css'; // Make sure this includes the glow-box styles

interface AqiData {
  list: {
    main: {
      aqi: number;
    };
  }[];
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const AirBuddy: React.FC = () => {
  const [aqi, setAqi] = useState<number | null>(null);
  const [aqiDescription, setAqiDescription] = useState<string>('Loading AQI...');
  const [message, setMessage] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [humidity, setHumidity] = useState<string>('');
  const [windSpeed, setWindSpeed] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>('');
  const [tip, setTip] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const descriptions = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  const messages = [
    "Enjoy your day outside!",
    "Air is fine today.",
    "Be cautious, especially for sensitive individuals.",
    "Limit outdoor activities.",
    "Stay indoors and use air purifiers."
  ];
  const icons = {
    1: airGoodIcon,
    2: airFairIcon,
    3: airModerateIcon,
    4: airPoorIcon,
    5: airVeryPoorIcon
  };
  const ecoTips = [
    "🌱 Add air-purifying indoor plants like spider plant or peace lily.",
    "🚲 Reduce pollution by biking or walking for short trips.",
    "💧 Stay hydrated when the air is dry.",
    "🧼 Keep windows closed on poor AQI days.",
    "🌍 Recycle and reduce waste to help reduce pollution."
  ];

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    getAQI();
  }, []);

  const showRandomTip = () => {
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    setTip(randomTip);
  };

  const startCountdown = (seconds = 300) => {
    let remaining = seconds;
    const interval = setInterval(() => {
      const minutes = Math.floor(remaining / 60);
      const secs = remaining % 60;
      setCountdown(`Next update in ${minutes}:${secs.toString().padStart(2, '0')}`);
      remaining--;
      if (remaining < 0) {
        clearInterval(interval);
        getAQI();
      }
    }, 1000);
  };

  const getAQI = async () => {
    if (!navigator.geolocation) {
      setAqiDescription("Geolocation not supported");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = "85e6a8487f1530f75af6214fff82beb7";
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data: AqiData = await response.json();
        const aqiValue = data.list[0].main.aqi;
        setAqi(aqiValue);
        setAqiDescription(`AQI Level: ${aqiValue} (${descriptions[aqiValue - 1]})`);
        setMessage(messages[aqiValue - 1]);
        setIcon(icons[aqiValue as keyof typeof icons]);

        const weatherResponse = await fetch(weatherUrl);
        const weatherData: WeatherData = await weatherResponse.json();
        setTemperature(`${Math.round(weatherData.main.temp)}°C`);
        setHumidity(`${weatherData.main.humidity}%`);
        setWindSpeed(`${weatherData.wind.speed} m/s`);

        if (aqiValue >= 4) {
          setShowAlert(true);
          if (Notification.permission === "granted") {
            new Notification("AirBuddy Alert", {
              body: `Air quality is ${descriptions[aqiValue - 1]}. ${messages[aqiValue - 1]}`,
              icon: ecoNotificationIcon
            });
          }
        } else {
          setShowAlert(false);
        }

        showRandomTip();
        startCountdown();
      } catch (error) {
        setAqiDescription("Failed to fetch AQI");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, () => {
      setAqiDescription("Unable to access location");
      setIsLoading(false);
    });
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
    document.documentElement.classList.toggle('dark', newMode);
  };

  const getAqiGradientClass = () => {
    if (!aqi) return 'air-gradient-default';
    return `air-gradient-${aqi}`;
  };

  return (
    <div className={cn(
      "min-h-screen w-full relative overflow-hidden transition-all duration-1000",
      getAqiGradientClass(),
      !darkMode && "animate-gradient-shift"
    )}>
      {/* Weather pattern background */}
      <div className={cn("absolute inset-0", darkMode ? "weather-pattern-dark" : "weather-pattern-light")}></div>

      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDarkMode}
        className={cn("absolute top-6 right-6 z-10 transition-all duration-300",
          darkMode ? "glass-card-dark text-white hover:bg-white/30" : "glass-card-light text-gray-800 hover:bg-white/95")}
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* Main Box with Glow */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="relative max-w-md w-full">
          <div className={cn("glow-box absolute inset-0 rounded-2xl pointer-events-none", darkMode ? "dark" : "light")}></div>

          <Card className={cn(
            "relative z-10 w-full animate-fade-in-up overflow-hidden rounded-2xl",
            darkMode ? "glass-card-dark text-white" : "glass-card-light text-gray-800"
          )}>
            {/* === Inside Card === */}
            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className={cn("h-6 w-6", darkMode ? "text-white/80" : "text-gray-700")} />
                <h1 className={cn("text-3xl font-bold", darkMode ? "text-white" : "text-gray-800 drop-shadow-sm")}>
                  AirBuddy
                </h1>
              </div>
              <p className={cn("text-sm", darkMode ? "text-white/70" : "text-gray-600")}>Your air quality companion</p>
            </div>

            <div className="px-8 text-center">
              {icon && (
                <div className="mx-auto w-24 h-24 mb-4 animate-scale-in">
                  <img src={icon} alt={aqiDescription} className="w-full h-full object-contain animate-float" />
                </div>
              )}
              <h2 className={cn("text-2xl font-bold mb-2", darkMode ? "text-white" : "text-gray-800")}>
                {isLoading ? 'Loading...' : aqiDescription}
              </h2>
              {aqi && (
                <div className={cn("inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
                  darkMode ? "bg-black/30 border-white/40 text-white" : "bg-white/95 border-gray-200 text-gray-800 shadow-md")}>
                  <div className={cn("w-2 h-2 rounded-full mr-2",
                    aqi === 1 && "bg-green-500",
                    aqi === 2 && "bg-yellow-500",
                    aqi === 3 && "bg-orange-500",
                    aqi === 4 && "bg-red-500",
                    aqi === 5 && "bg-purple-500"
                  )}></div>
                  {descriptions[aqi - 1]}
                </div>
              )}
              <p className={cn("text-lg mb-6 leading-relaxed", darkMode ? "text-white/90" : "text-gray-700")}>{message}</p>
            </div>

            <div className="px-8 mb-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <Thermometer className="h-5 w-5 mx-auto mb-2" />
                <p className="text-sm">Temperature</p>
                <p className="font-semibold">{temperature}</p>
              </div>
              <div>
                <Droplets className="h-5 w-5 mx-auto mb-2" />
                <p className="text-sm">Humidity</p>
                <p className="font-semibold">{humidity}</p>
              </div>
              <div>
                <Wind className="h-5 w-5 mx-auto mb-2" />
                <p className="text-sm">Wind</p>
                <p className="font-semibold">{windSpeed}</p>
              </div>
            </div>

            {showAlert && (
              <div className="mx-8 mb-6 animate-scale-in">
                <div className="border rounded-lg p-4 bg-red-50 border-red-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <p className="text-sm font-medium text-red-700">
                      Air quality is poor! Stay safe and limit outdoor activities.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tip && (
              <div className="mx-8 mb-6">
                <div className="border rounded-lg p-4 bg-white/95 border-gray-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 mt-0.5 text-gray-600" />
                    <p className="text-sm leading-relaxed text-gray-700">{tip}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-8 pt-0">
              <Button
                onClick={getAQI}
                disabled={isLoading}
                className={cn("w-full transition-all duration-300 group",
                  darkMode ? "bg-white/25 hover:bg-white/35 text-white border-white/40" : "bg-white/95 text-gray-800 border-gray-200 shadow-md",
                  isLoading && "animate-pulse"
                )}
              >
                <RefreshCw className={cn("h-4 w-4 mr-2", isLoading ? "animate-spin" : "group-hover:rotate-180")} />
                {isLoading ? 'Refreshing...' : 'Refresh AQI'}
              </Button>
              {countdown && (
                <p className="text-center text-sm mt-3 text-gray-600">
                  {countdown}
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AirBuddy;
