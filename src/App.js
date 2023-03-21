import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      
      {/* <div className="App">
        <header className="App-header">
          <h1>Pitchback</h1>
          <a
            className="App-link"
            href="/pitchback"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pitchback
          </a>
        </header>
      </div> */}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        //TODO about.js of iets anders voor meer informatie, geen prio
      </Routes>
    </BrowserRouter>
  );
}

export default App;

