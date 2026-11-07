import React, { useRef, useState, useEffect } from 'react';
import { Palette, Trash2, Download } from 'lucide-react';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#6366f1', '#a855f7', '#ec4899', '#ffffff', '#000000'];

export const KidsDrawingStudio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#6366f1');
  const [lineWidth, setLineWidth] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Set white canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-masterpiece.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-pink-300">
            <Palette className="w-4 h-4 text-pink-400" />
            <span>Magic Drawing Studio</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={clearCanvas}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400"
              title="Clear Canvas"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={downloadArt}
              className="p-1 rounded-lg bg-pink-600 hover:bg-pink-500 text-white"
              title="Save Artwork"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${
                color === c ? 'scale-125 border-white shadow' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden border-2 border-pink-400/30 shadow-inner bg-white">
        <canvas
          ref={canvasRef}
          width={340}
          height={130}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          className="w-full h-32 cursor-crosshair touch-none"
        />
      </div>
    </div>
  );
};
