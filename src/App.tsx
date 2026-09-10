import { HashRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ScreeningResultsPage from "./pages/ScreeningResultsPage";
import { ScreeningProvider } from "./context/ScreeningContext";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <HashRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <ScreeningProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/job" element={<JobDescriptionPage />} />
          <Route path="/upload" element={<ResumeUploadPage />} />
          <Route path="/results" element={<ScreeningResultsPage />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </ScreeningProvider>
    </HashRouter>
  );
};

export default App;
