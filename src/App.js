import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CallerVideo from "./Components/CallerVideo";
import AnswerVideo from "./Components/AnswerVideo";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/offer" element={<CallerVideo />} />
        <Route exact path="/answer" element={<AnswerVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
