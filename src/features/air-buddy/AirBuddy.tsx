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
  // State variables
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

  // Constants
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

  // Initialize notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // Check for saved dark mode preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    getAQI();
  }, []);

  // Show random tip
  const showRandomTip = () => {
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    setTip(randomTip);
  };

  // Countdown timer
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

  // Get AQI data
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
        // Fetch AQI data
        const response = await fetch(url);
        const data: AqiData = await response.json();
        const aqiValue = data.list[0].main.aqi;
        setAqi(aqiValue);
        setAqiDescription(`AQI Level: ${aqiValue} (${descriptions[aqiValue - 1]})`);
        setMessage(messages[aqiValue - 1]);
        setIcon(icons[aqiValue as keyof typeof icons]);

        // Fetch weather data
        const weatherResponse = await fetch(weatherUrl);
        const weatherData: WeatherData = await weatherResponse.json();
        
        setTemperature(`${Math.round(weatherData.main.temp)}°C`);
        setHumidity(`${weatherData.main.humidity}%`);
        setWindSpeed(`${weatherData.wind.speed} m/s`);

        // Show alert if AQI is poor
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Get gradient class based on AQI
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
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className={cn(
          "absolute top-10 left-10 w-32 h-32 rounded-full animate-float",
          darkMode ? "bg-white" : "bg-white"
        )}></div>
        <div className={cn(
          "absolute top-32 right-20 w-20 h-20 rounded-full animate-float",
          darkMode ? "bg-white" : "bg-white"
        )} style={{animationDelay: '2s'}}></div>
        <div className={cn(
          "absolute bottom-20 left-32 w-24 h-24 rounded-full animate-float",
          darkMode ? "bg-white" : "bg-white"
        )} style={{animationDelay: '4s'}}></div>
      </div>

      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDarkMode}
        className={cn(
          "absolute top-6 right-6 z-10 glass-card border-white/20 hover:bg-white/20 transition-all duration-300",
          darkMode ? "text-white" : "text-gray-800 bg-white/80 hover:bg-white/90"
        )}
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className={cn(
          "glass-card max-w-md w-full border-white/20 animate-fade-in-up",
          "relative overflow-hidden",
          darkMode ? "text-white" : "text-gray-800"
        )}>
          {/* Header */}
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className={cn(
                "h-6 w-6",
                darkMode ? "text-white/80" : "text-gray-700"
              )} />
              <h1 className={cn(
                "text-3xl font-bold",
                darkMode ? "text-white" : "text-gray-800 drop-shadow-sm"
              )}>
                AirBuddy
              </h1>
            </div>
            <p className={cn(
              "text-sm",
              darkMode ? "text-white/70" : "text-gray-600"
            )}>Your air quality companion</p>
          </div>

          {/* AQI Display */}
          <div className="px-8 text-center">
            <div className="relative mb-6">
              {icon && (
                <div className="mx-auto w-24 h-24 mb-4 animate-scale-in">
                  <img 
                    src={icon} 
                    alt={aqiDescription} 
                    className="w-full h-full object-contain animate-float"
                  />
                </div>
              )}
              
              <h2 className={cn(
                "text-2xl font-bold mb-2",
                darkMode ? "text-white" : "text-gray-800"
              )}>
                {isLoading ? 'Loading...' : aqiDescription}
              </h2>
              
              {aqi && (
                <div className={cn(
                  "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
                  darkMode ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white" : "bg-white/80 backdrop-blur-sm border border-white/50 text-gray-800"
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full mr-2",
                    aqi === 1 && "bg-green-500",
                    aqi === 2 && "bg-yellow-500", 
                    aqi === 3 && "bg-orange-500",
                    aqi === 4 && "bg-red-500",
                    aqi === 5 && "bg-purple-500"
                  )}></div>
                  {descriptions[aqi - 1]}
                </div>
              )}
            </div>

            <p className={cn(
              "text-lg mb-6 leading-relaxed",
              darkMode ? "text-white/90" : "text-gray-700"
            )}>
              {message}
            </p>
          </div>

          {/* Weather Info */}
          <div className="px-8 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Thermometer className={cn(
                  "h-5 w-5 mx-auto mb-2",
                  darkMode ? "text-white/70" : "text-gray-600"
                )} />
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-white/60" : "text-gray-500"
                )}>Temperature</p>
                <p className={cn(
                  "font-semibold",
                  darkMode ? "text-white" : "text-gray-800"
                )}>{temperature}</p>
              </div>
              <div className="text-center">
                <Droplets className={cn(
                  "h-5 w-5 mx-auto mb-2",
                  darkMode ? "text-white/70" : "text-gray-600"
                )} />
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-white/60" : "text-gray-500"
                )}>Humidity</p>
                <p className={cn(
                  "font-semibold",
                  darkMode ? "text-white" : "text-gray-800"
                )}>{humidity}</p>
              </div>
              <div className="text-center">
                <Wind className={cn(
                  "h-5 w-5 mx-auto mb-2",
                  darkMode ? "text-white/70" : "text-gray-600"
                )} />
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-white/60" : "text-gray-500"
                )}>Wind Speed</p>
                <p className={cn(
                  "font-semibold",
                  darkMode ? "text-white" : "text-gray-800"
                )}>{windSpeed}</p>
              </div>
            </div>
          </div>

          {/* Alert */}
          {showAlert && (
            <div className="mx-8 mb-6 animate-scale-in">
              <div className={cn(
                "border rounded-lg p-4 backdrop-blur-sm",
                darkMode ? "bg-red-500/20 border-red-400/30" : "bg-red-100/80 border-red-300/50"
              )}>
                <div className="flex items-center gap-3">
                  <AlertTriangle className={cn(
                    "h-5 w-5 flex-shrink-0",
                    darkMode ? "text-red-300" : "text-red-600"
                  )} />
                  <p className={cn(
                    "text-sm font-medium",
                    darkMode ? "text-red-200" : "text-red-700"
                  )}>
                    Air quality is poor! Stay safe and limit outdoor activities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Eco Tip */}
          {tip && (
            <div className="mx-8 mb-6">
              <div className={cn(
                "border rounded-lg p-4 backdrop-blur-sm",
                darkMode ? "bg-white/10 border-white/20" : "bg-white/60 border-white/40"
              )}>
                <div className="flex items-start gap-3">
                  <Info className={cn(
                    "h-5 w-5 flex-shrink-0 mt-0.5",
                    darkMode ? "text-white/70" : "text-gray-600"
                  )} />
                  <p className={cn(
                    "text-sm leading-relaxed",
                    darkMode ? "text-white/80" : "text-gray-700"
                  )}>{tip}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-8 pt-0">
            <Button
              onClick={getAQI}
              disabled={isLoading}
              className={cn(
                "w-full border backdrop-blur-sm transition-all duration-300 group",
                darkMode ? "bg-white/20 hover:bg-white/30 text-white border-white/30" : "bg-white/80 hover:bg-white/90 text-gray-800 border-white/50",
                isLoading && "animate-pulse"
              )}
            >
              <RefreshCw className={cn(
                "h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500",
                isLoading && "animate-spin"
              )} />
              {isLoading ? 'Refreshing...' : 'Refresh AQI'}
            </Button>
            
            {countdown && (
              <p className={cn(
                "text-center text-sm mt-3",
                darkMode ? "text-white/60" : "text-gray-600"
              )}>
                {countdown}
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AirBuddy;