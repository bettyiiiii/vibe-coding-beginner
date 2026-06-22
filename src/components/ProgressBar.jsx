import { useEffect, useState } from 'react';

export default function ProgressBar({ value = 0, max = 100, className = '' }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 200);
    return () => clearTimeout(timer);
  }, [value]);

  const pct = Math.min(animatedValue / max * 100, 100);

  return (
    <div className={`w-full h-2.5 bg-pink-100 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-700 ease-out relative"
        style={{ width: `${pct}%` }}
      >
        {/* 光泽效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-soft" />
      </div>
    </div>
  );
}
