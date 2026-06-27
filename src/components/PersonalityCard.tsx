import { useState } from "react";
import { RotateCw, Sparkles } from "lucide-react";
import type { Personality } from "@/data/personalities";

interface PersonalityCardProps {
  personality: Personality;
}

export default function PersonalityCard({ personality }: PersonalityCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* 翻转提示 */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex items-center gap-2 text-amber-400/70 hover:text-amber-300 transition-colors text-xs font-body tracking-widest mb-4 italic"
      >
        <RotateCw className="w-3 h-3" />
        {flipped ? "查看卡牌正面" : "翻阅卡牌背面"}
      </button>

      {/* 3D 翻转卡牌 */}
      <div className="card-3d w-[300px] h-[420px] md:w-[340px] md:h-[476px]">
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>
          {/* 正面：人物插画 */}
          <div className="card-face">
            <div
              className="relative w-full h-full rounded-md overflow-hidden gold-border-glow corner-deco"
              style={{
                background: `linear-gradient(160deg, ${personality.color}33 0%, #0a0a0a 60%, ${personality.color}22 100%)`,
              }}
            >
              {/* 插画 */}
              <img
                src={personality.cardImage}
                alt={personality.name}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                loading="eager"
              />
              {/* 暗色渐变叠加 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(5,5,5,0.4) 55%, rgba(5,5,5,0.95) 85%)",
                }}
              />

              {/* 顶部装饰 */}
              <div className="absolute top-3 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-2 text-amber-400/80">
                  <div className="h-px w-8 bg-amber-500/50" />
                  <Sparkles className="w-3 h-3" />
                  <div className="h-px w-8 bg-amber-500/50" />
                </div>
              </div>

              {/* 顶部编号 */}
              <div className="absolute top-3 left-4 font-number text-xs text-amber-400/60 tracking-widest">
                No.{String(personality.id).padStart(2, "0")}
              </div>

              {/* 底部信息 */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <p
                  className="font-display text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ color: personality.accentColor }}
                >
                  {personality.title}
                </p>
                <h2 className="font-display text-2xl font-bold text-gold-shimmer mb-1">
                  {personality.name}
                </h2>
                <p className="font-body text-xs text-amber-200/60 italic">
                  {personality.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* 背面：解读 */}
          <div className="card-face card-back">
            <div
              className="relative w-full h-full rounded-md overflow-hidden gold-border-glow corner-deco p-6 flex flex-col"
              style={{
                background: `linear-gradient(160deg, ${personality.color}22 0%, #0a0a0a 50%, ${personality.color}11 100%)`,
              }}
            >
              {/* 顶部 */}
              <div className="text-center mb-3 pb-3 border-b border-amber-500/20">
                <p
                  className="font-display text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: personality.accentColor }}
                >
                  {personality.title}
                </p>
                <h3 className="font-display text-lg font-bold text-gold-shimmer mt-1">
                  {personality.name}
                </h3>
              </div>

              {/* 描述 */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                <p className="font-body text-[11px] text-amber-100/80 leading-relaxed text-justify">
                  {personality.description}
                </p>

                {/* 性格特点 */}
                <div>
                  <p className="font-display text-[9px] tracking-widest text-amber-500/70 uppercase mb-1.5">
                    性格特质
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {personality.traits.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded border border-amber-500/30 text-amber-200/80 font-body"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 适合领域 */}
                <div>
                  <p className="font-display text-[9px] tracking-widest text-amber-500/70 uppercase mb-1.5">
                    天命领域
                  </p>
                  <p className="font-body text-[10px] text-amber-100/70 leading-relaxed">
                    {personality.suitableFields.join(" · ")}
                  </p>
                </div>
              </div>

              {/* 底部箴言 */}
              <div className="pt-3 mt-2 border-t border-amber-500/20 text-center">
                <p
                  className="font-body text-xs italic leading-relaxed"
                  style={{ color: personality.accentColor }}
                >
                  「 {personality.motto} 」
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
