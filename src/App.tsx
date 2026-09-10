import { HashRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ScreeningResultsPage from "./pages/ScreeningResultsPage";
import { ScreeningProvider } from "./context/ScreeningContext";

const App = () => {
  return (
    <HashRouter>
      <ScreeningProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/job" element={<JobDescriptionPage />} />

          <Route path="/upload" element={<ResumeUploadPage />} />

          <Route path="/results" element={<ScreeningResultsPage />} />
        </Routes>
      </ScreeningProvider>
    </HashRouter>
  );
};

export default App;
