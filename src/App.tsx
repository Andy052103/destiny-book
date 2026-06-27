import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "@/components/WelcomePage";
import QuizPage from "@/components/QuizPage";
import ResultPage from "@/components/ResultPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
