import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Compass } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [weather] = useState({
    city: 'San Francisco',
    tempC: 19,
    tempF: 66,
    condition: 'Partly Cloudy',
    highC: 22,
    lowC: 14,
    humidity: 62,
    windKmh: 14,
    forecast: [
      { day: 'Today', temp: 19, icon: 'partly-cloudy' },
      { day: 'Sun', temp: 21, icon: 'sunny' },
      { day: 'Mon', temp: 18, icon: 'rain' },
      { day: 'Tue', temp: 20, icon: 'sunny' }
    ]
  });

  const displayTemp = unit === 'C' ? `${weather.tempC}°C` : `${weather.tempF}°F`;

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-medium tracking-wide text-slate-400">{weather.city}</span>
          </div>
          <div className="text-3xl font-bold tracking-tight mt-1 font-mono tabular-nums">
            {displayTemp}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{weather.condition}</p>
        </div>

        <button
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
          className="text-xs font-medium px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-colors"
          title="Toggle Celsius / Fahrenheit"
        >
          °{unit === 'C' ? 'F' : 'C'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 my-3 py-2 border-y border-slate-800/60 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          <span>Humidity: <strong className="font-mono tabular-nums">{weather.humidity}%</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-teal-400" />
          <span>Wind: <strong className="font-mono tabular-nums">{weather.windKmh} km/h</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 text-center pt-1">
        {weather.forecast.map((f, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">{f.day}</span>
            <div className="my-1">
              {f.icon === 'sunny' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : f.icon === 'rain' ? (
                <CloudRain className="w-4 h-4 text-blue-400" />
              ) : (
                <Cloud className="w-4 h-4 text-sky-400" />
              )}
            </div>
            <span className="text-[11px] font-mono tabular-nums font-semibold">
              {unit === 'C' ? `${f.temp}°` : `${Math.round((f.temp * 9) / 5 + 32)}°`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
