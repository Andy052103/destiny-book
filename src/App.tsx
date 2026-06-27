import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "@/components/WelcomePage";
import QuizPage from "@/components/QuizPage";
import ResultPage from "@/components/ResultPage";
import MusicToggle from "@/components/MusicToggle";
import { useAmbientMusic } from "@/hooks/useAmbientMusic";

export default function App() {
  const { isPlaying, volume, toggle, changeVolume } = useAmbientMusic();

  return (
    <Router>
      <MusicToggle
        isPlaying={isPlaying}
        volume={volume}
        onToggle={toggle}
        onVolumeChange={changeVolume}
      />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
