import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchList from './components/MatchList';
import MatchDetails from "./components/MatchDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="text-center mt-4">Cricket App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MatchList />} />
            <Route path="/match/:matchId" element={<MatchDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
