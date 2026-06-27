interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-number text-sm text-amber-400/80 tracking-widest">
          {String(current + 1).padStart(2, "0")}
          <span className="text-amber-600/60"> / {total}</span>
        </span>
        <span className="font-display text-xs text-amber-500/60 tracking-[0.3em] uppercase">
          Prophecy
        </span>
      </div>
      <div className="relative h-[2px] w-full bg-amber-900/30 overflow-hidden rounded-full">
        <div
          className="absolute left-0 top-0 h-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #6b5320, #c9a84c, #f0d060)",
            boxShadow: "0 0 10px rgba(240,208,96,0.6)",
          }}
        />
        {/* 进度点 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-700 ease-out"
          style={{
            left: `calc(${percentage}% - 6px)`,
            background: "#f0d060",
            boxShadow: "0 0 12px rgba(240,208,96,0.8), 0 0 24px rgba(240,208,96,0.4)",
          }}
        />
      </div>
    </div>
  );
}
