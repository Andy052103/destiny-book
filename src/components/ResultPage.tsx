import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Share2, RotateCcw, Check, Copy } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { shareResult } from "@/utils/share";
import PersonalityCard from "./PersonalityCard";
import ParticleBackground from "./ParticleBackground";

export default function ResultPage() {
  const navigate = useNavigate();
  const result = useQuizStore((s) => s.result);
  const isCompleted = useQuizStore((s) => s.isCompleted);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (!isCompleted || !result) {
      navigate("/");
    }
  }, [isCompleted, result, navigate]);

  const handleShare = async () => {
    if (!result) return;
    const ok = await shareResult(result.primary.name);
    setShareState(ok ? "copied" : "error");
    setTimeout(() => setShareState("idle"), 2500);
  };

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  if (!result) return null;

  // 取前 5 个占比最高的人格作为构成展示（包含主人格）
  const topSlices = result.breakdown.slice(0, 5);
  const primaryColor = result.primary.color;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start px-6 py-10">
      <ParticleBackground count={35} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center w-full max-w-2xl"
      >
        {/* 顶部装饰 */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
          <span className="font-display text-[10px] tracking-[0.4em] text-amber-500/70 uppercase">
            Your Destiny
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-2xl md:text-3xl text-gold-shimmer tracking-widest mb-1"
        >
          真面目已揭晓
        </motion.h1>
        <p className="font-body text-sm text-amber-300/50 italic mb-8">
          别装了，这就是你本来的样子
        </p>

        {/* 主卡牌展示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <PersonalityCard personality={result.primary} />
        </motion.div>

        {/* 人格构成 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-full mt-10 p-6 rounded-lg border border-amber-500/25 bg-black/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-amber-500/70 text-sm">✦</span>
            <h2 className="font-display text-sm tracking-[0.3em] text-amber-300/80 uppercase">
              人格构成
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
          </div>

          <p className="font-body text-xs text-amber-200/50 italic mb-5 leading-relaxed">
            没人是单一标签。你的人格由多种特质按比例混合，下面是你灵魂的配方：
          </p>

          <div className="space-y-3">
            {topSlices.map((slice, idx) => {
              const isPrimary = idx === 0;
              const barColor = slice.personality.color;
              return (
                <div key={slice.personality.id} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-32 shrink-0">
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: isPrimary ? barColor : "transparent",
                        color: isPrimary ? "#0a0a0a" : barColor,
                        border: isPrimary ? "none" : `1px solid ${barColor}55`,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-xs font-medium truncate"
                      style={{
                        color: isPrimary ? "#f0d060" : "rgba(240,208,96,0.6)",
                      }}
                    >
                      {slice.personality.name}
                    </span>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-amber-950/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${slice.percent}%` }}
                      transition={{
                        delay: 1.3 + idx * 0.15,
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        background: isPrimary
                          ? `linear-gradient(90deg, ${barColor}, #f0d060)`
                          : `linear-gradient(90deg, ${barColor}aa, ${barColor}55)`,
                        boxShadow: isPrimary ? `0 0 12px ${barColor}88` : "none",
                      }}
                    />
                  </div>
                  <span
                    className="text-xs font-mono w-10 text-right"
                    style={{
                      color: isPrimary ? "#f0d060" : "rgba(240,208,96,0.5)",
                    }}
                  >
                    {slice.percent}%
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-amber-500/10">
            <p className="font-body text-xs text-amber-300/40 italic leading-relaxed">
              {topSlices[0] && topSlices[1] && (
                <>
                  你以 <span style={{ color: primaryColor }}>{topSlices[0].percent}%</span> 的「
                  {topSlices[0].personality.name}」为底色，混合着{" "}
                  <span style={{ color: topSlices[1].personality.color }}>
                    {topSlices[1].percent}%
                  </span>{" "}
                  的「{topSlices[1].personality.name}」
                  {topSlices[2] && topSlices[2].percent > 0 ? (
                    <>
                      {" "}与 <span style={{ color: topSlices[2].personality.color }}>
                        {topSlices[2].percent}%
                      </span>{" "}
                      的「{topSlices[2].personality.name}」
                    </>
                  ) : null}
                  ，组成了独一无二的你。
                </>
              )}
            </p>
          </div>
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <button onClick={handleShare} className="btn-gold flex items-center gap-2 text-xs">
            {shareState === "copied" ? (
              <>
                <Check className="w-4 h-4" />
                已复制
              </>
            ) : shareState === "error" ? (
              <>
                <Copy className="w-4 h-4" />
                请手动复制
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                分享命运
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            className="btn-gold flex items-center gap-2 text-xs"
            style={{ background: "transparent", color: "var(--color-gold)" }}
          >
            <RotateCcw className="w-4 h-4" />
            再测一次
          </button>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/40" />
          <span className="text-amber-500/50 text-sm">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/40" />
        </motion.div>

        <p className="font-body text-xs text-amber-400/40 mt-4 italic tracking-wider">
          命运之书 · 十五种真面目
        </p>
      </motion.div>
    </div>
  );
}
