import { useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicToggleProps {
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (v: number) => void;
}

export default function MusicToggle({
  isPlaying,
  volume,
  onToggle,
  onVolumeChange,
}: MusicToggleProps) {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-2"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      {/* 音量滑块 */}
      {showSlider && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-black/80 border border-amber-500/40 backdrop-blur-sm">
          <VolumeX className="w-3.5 h-3.5 text-amber-500/60" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 h-1 appearance-none bg-amber-900/40 rounded-full cursor-pointer accent-amber-400"
            style={{
              background: `linear-gradient(to right, #c9a84c 0%, #c9a84c ${
                volume * 100
              }%, rgba(201,168,76,0.2) ${volume * 100}%)`,
            }}
          />
          <Volume2 className="w-3.5 h-3.5 text-amber-500/60" />
        </div>
      )}

      {/* 开关按钮 */}
      <button
        onClick={onToggle}
        className="relative w-11 h-11 flex items-center justify-center rounded-full bg-black/80 border border-amber-500/40 backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(240,208,96,0.3)] group"
        aria-label={isPlaying ? "关闭背景音乐" : "开启背景音乐"}
        title={isPlaying ? "关闭背景音乐" : "开启背景音乐"}
      >
        {/* 播放时的脉冲光圈 */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping-slow" />
        )}

        {isPlaying ? (
          <Music className="w-5 h-5 text-amber-300 relative z-10" strokeWidth={1.5} />
        ) : (
          <VolumeX className="w-5 h-5 text-amber-500/60 relative z-10" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
