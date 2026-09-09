import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ScreeningResultsPage from "./pages/ScreeningResultsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/job" element={<JobDescriptionPage />} />

        <Route path="/upload" element={<ResumeUploadPage />} />

        <Route path="/results" element={<ScreeningResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
