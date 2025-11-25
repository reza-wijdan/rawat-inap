import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientListPage from "./pages/PatientListPage";
import PatientFormPage from "./pages/PatientFormPage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientListPage />} />
        <Route path="/add-patient" element={<PatientFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;