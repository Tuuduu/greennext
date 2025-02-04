"use client";
import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi"; // Цаг агаарын икон

export default function WeatherWidget() {
  interface WeatherData {
    name: string;
    main?: { temp: number };
    weather?: { description: string; main: string }[];
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const CITY = "Ulaanbaatar";

  useEffect(() => {
    async function fetchWeather() {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || `HTTP алдаа: ${res.status}`);
        }

        if (data.main && data.weather) {
          setWeather(data);
        } else {
          throw new Error("API-аас буруу өгөгдөл ирлээ.");
        }
      } catch (error) {
        setError("Цаг агаарын мэдээлэл авахад алдаа гарлаа.");
        console.error("Алдаа:", error);
      }
    }
    fetchWeather();
  }, []);

  function getWeatherIcon(condition: string) {
    switch (condition) {
      case "Clear":
        return <WiDaySunny className="text-yellow-400 text-2xl" />;
      case "Clouds":
        return <WiCloud className="text-gray-500 text-2xl" />;
      case "Rain":
        return <WiRain className="text-blue-500 text-2xl" />;
      case "Snow":
        return <WiSnow className="text-blue-300 text-2xl" />;
      case "Thunderstorm":
        return <WiThunderstorm className="text-purple-500 text-2xl" />;
      default:
        return <WiCloud className="text-gray-500 text-2xl" />;
    }
  }

  if (error) return <div className="text-red-500">❌ {error}</div>;
  if (!weather) return <div className="text-gray-500">...</div>;

  return (
    <div className="flex gap-x-1 items-center">
      <div className="text-sm font-light dark:text-gray-200 mt-2">
        {weather.main?.temp !== undefined
          ? `${Math.round(weather.main.temp)}°C`
          : "Мэдээлэл байхгүй"}
      </div>
      <div>{weather.weather && getWeatherIcon(weather.weather[0].main)}</div>
    </div>
  );
}
