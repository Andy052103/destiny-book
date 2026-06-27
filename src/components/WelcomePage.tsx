import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import ParticleBackground from "./ParticleBackground";

export default function WelcomePage() {
  const navigate = useNavigate();
  const startQuiz = useQuizStore((s) => s.startQuiz);

  const handleStart = () => {
    startQuiz();
    navigate("/quiz");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <ParticleBackground count={28} />

      {/* 曼陀罗旋转背景 */}
      <svg className="mandala-bg slow-rotate" viewBox="0 0 200 200" fill="none" aria-hidden>
        <g stroke="var(--color-gold)" strokeWidth="0.3" fill="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2="100"
              y2="10"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="30" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="90" />
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl"
      >
        {/* 顶部装饰 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/60" />
          <Sparkles className="w-4 h-4 text-amber-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/60" />
        </motion.div>

        {/* 书籍图标 */}
        <motion.div
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="mb-8 relative"
          style={{ perspective: 1000 }}
        >
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-2xl pulse-glow" />
            <BookOpen className="w-20 h-20 text-amber-400 relative z-10" strokeWidth={1} />
          </div>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-display text-5xl md:text-6xl font-bold tracking-widest mb-4 text-gold-shimmer"
          style={{ textShadow: "0 0 40px rgba(240,208,96,0.3)" }}
        >
          命运之书
        </motion.h1>

        {/* 副标题英文 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-display text-xs tracking-[0.5em] text-amber-500/60 uppercase mb-6"
        >
          Book of Destiny
        </motion.p>

        {/* 分隔线 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="divider-gold w-64 mb-6"
        >
          <span className="text-amber-500 text-lg">✦</span>
        </motion.div>

        {/* 副标题中文 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-body text-lg md:text-xl text-amber-200/80 italic mb-3"
        >
          五十个灵魂拷问，撕下你最后的伪装
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="font-body text-sm text-amber-300/50 mb-12 leading-relaxed max-w-md"
        >
          穿过黑金的迷雾，回答五十个扎心问题，
          <br />
          你将获得一张专属灵魂卡牌，照出最真实的你。
        </motion.p>

        {/* 开始按钮 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="btn-gold pulse-glow text-sm"
        >
          开启命运之书
        </motion.button>

        {/* 底部提示 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="font-body text-xs text-amber-400/40 mt-10 tracking-wider"
        >
          ✦ 共五十个拷问 · 十五种灵魂卡牌 ✦
        </motion.p>

        {/* 音乐提示 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="font-body text-xs text-amber-500/30 mt-4 italic"
        >
          ✦ 右上角开启背景音乐，沉浸体验 ✦
        </motion.p>
      </motion.div>
    </div>
  );
}
