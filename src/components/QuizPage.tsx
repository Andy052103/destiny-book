import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { questions } from "@/data/questions";
import ProgressBar from "./ProgressBar";
import ParticleBackground from "./ParticleBackground";

export default function QuizPage() {
  const navigate = useNavigate();
  const currentQuestion = useQuizStore((s) => s.currentQuestion);
  const answers = useQuizStore((s) => s.answers);
  const selectAnswer = useQuizStore((s) => s.selectAnswer);
  const goToQuestion = useQuizStore((s) => s.goToQuestion);
  const calculateAndComplete = useQuizStore((s) => s.calculateAndComplete);

  const question = questions[currentQuestion];
  const total = questions.length;
  const selectedOption = question ? answers[question.id] : undefined;

  useEffect(() => {
    if (!question) {
      navigate("/");
    }
  }, [question, navigate]);

  const handleSelect = (optionId: string) => {
    if (!question) return;
    selectAnswer(question.id, optionId);
    // 延迟后进入下一题或完成
    setTimeout(() => {
      if (currentQuestion < total - 1) {
        goToQuestion(currentQuestion + 1);
      } else {
        calculateAndComplete();
        navigate("/result");
      }
    }, 450);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    } else {
      navigate("/");
    }
  };

  if (!question) return null;

  return (
    <div className="relative min-h-screen flex flex-col px-6 py-8">
      <ParticleBackground count={18} />

      {/* 顶部进度区 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 text-amber-500/70 hover:text-amber-300 transition-colors text-sm font-body tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentQuestion === 0 ? "返回" : "上一题"}
          </button>
        </div>
        <ProgressBar current={currentQuestion} total={total} />
      </motion.div>

      {/* 题目区域 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full"
          >
            {/* 题号装饰 */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
              <span className="font-number text-3xl text-gold-gradient font-bold">
                {String(currentQuestion + 1).padStart(2, "0")}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>

            {/* 题目卡片 */}
            <div className="corner-deco gold-border bg-black/40 backdrop-blur-sm p-8 md:p-10 mb-8 min-h-[120px] flex items-center justify-center">
              <p className="font-body text-xl md:text-2xl text-amber-100/95 text-center leading-relaxed">
                {question.text}
              </p>
            </div>

            {/* 选项 */}
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
                  onClick={() => handleSelect(option.id)}
                  className={`option-btn flex items-center gap-4 ${selectedOption === option.id ? "selected" : ""}`}
                >
                  <span className="font-display text-base font-bold w-7 h-7 flex-shrink-0 flex items-center justify-center border border-amber-500/40 rounded-full">
                    {option.id}
                  </span>
                  <span className="flex-1">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-center pb-2"
      >
        <span className="font-body text-xs text-amber-500/40 tracking-[0.3em] italic">
          ✦ 别装了，选最真实的那个 ✦
        </span>
      </motion.div>
    </div>
  );
}
