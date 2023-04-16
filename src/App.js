import React from "react";
import LoginPage from "./LoginPage";
import DashBoard from "./views/DashBoard";
import Transactions from "./views/Transactions";
import AboutUs from "./views/AboutUs";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="app-main">
        <Router>
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="" element={<LoginPage />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
