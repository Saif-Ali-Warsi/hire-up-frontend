import { HashRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ScreeningResultsPage from "./pages/ScreeningResultsPage";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/job" element={<JobDescriptionPage />} />

        <Route path="/upload" element={<ResumeUploadPage />} />

        <Route path="/results" element={<ScreeningResultsPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
