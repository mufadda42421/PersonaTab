import React, { useState } from 'react';
import { Ruler, ArrowRightLeft } from 'lucide-react';

export const UnitConverterWidget: React.FC = () => {
  const [val, setVal] = useState<number>(100);
  const [type, setType] = useState<'length' | 'weight' | 'temp'>('length');

  let result = '';

  if (type === 'length') {
    // Meters to Feet
    const feet = val * 3.28084;
    result = `${val} meters = ${feet.toFixed(2)} feet (${(val / 1000).toFixed(3)} km)`;
  } else if (type === 'weight') {
    // Kilograms to Pounds
    const lbs = val * 2.20462;
    result = `${val} kg = ${lbs.toFixed(2)} lbs (${(val * 1000).toFixed(0)} grams)`;
  } else {
    // Celsius to Fahrenheit
    const fahr = (val * 9) / 5 + 32;
    const kelvin = val + 273.15;
    result = `${val}°C = ${fahr.toFixed(1)}°F (${kelvin.toFixed(1)} K)`;
  }

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Ruler className="w-4 h-4 text-emerald-400" />
            <span>Unit Converter</span>
          </div>
          <div className="flex gap-1">
            {(['length', 'weight', 'temp'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-1.5 py-0.5 rounded capitalize text-[10px] ${
                  type === t ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-0.5">
            Value in {type === 'length' ? 'Meters' : type === 'weight' ? 'Kilograms' : 'Celsius'}
          </label>
          <input
            type="number"
            value={val || ''}
            onChange={(e) => setVal(Number(e.target.value) || 0)}
            className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100"
          />
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-800 font-mono">
        <span className="text-[10px] text-slate-400 block">Conversion:</span>
        <div className="text-emerald-400 font-semibold text-xs mt-0.5 break-words">
          {result}
        </div>
      </div>
    </div>
  );
};
