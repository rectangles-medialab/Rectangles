import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PitchbackPage from './components/PitchbackPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
      </div>
      <Routes>
        <Route exact path="/pitchback" element={<PitchbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

