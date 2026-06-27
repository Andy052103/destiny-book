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
    const ok = await shareResult(result.name);
    setShareState(ok ? "copied" : "error");
    setTimeout(() => setShareState("idle"), 2500);
  };

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  if (!result) return null;

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

        {/* 卡牌展示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <PersonalityCard personality={result} />
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
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
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/40" />
          <span className="text-amber-500/50 text-sm">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/40" />
        </motion.div>

        <p className="font-body text-xs text-amber-400/40 mt-4 italic tracking-wider">
          命运之书 · 十二种真面目
        </p>
      </motion.div>
    </div>
  );
}
