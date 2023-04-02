import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import GuestureCheckerPage from './pages/GuestureCheckerPage'

function App() {
  return (
    <LandingPage />
    // <BrowserRouter>
      
      // {/* <Routes> */}
      //   {/* <Route exact path="/" element={<LandingPage />} />
      //   <Route exact path="/login" element={<LoginPage />} />
      //   <Route exact path="/register" element={<RegisterPage />} />
      //   <Route exact path="/guesture" element={<GuestureCheckerPage />} /> */}
      //   //TODO about.js of iets anders voor meer informatie, geen prio
      // {/* </Routes>
      
    // </BrowserRouter> */}
  );
}

export default App;

