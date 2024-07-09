// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ApplePage from './pages/ApplePage';
import OrangePage from './pages/OrangePage';
import EndlessTTTPage from './pages/EndlessTTTPage';
import MusicPlayer from './components/MusicPlayer';
import Navbar from './components/Navbar';



const App = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = () => {
        setIsPlaying(!isPlaying);
    };


    return (
        <Router>
            <div>
                <Navbar toggleMusic={toggleMusic} isPlaying={isPlaying} />
                <MusicPlayer isPlaying={isPlaying} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/apple-game" element={<ApplePage />} />
                    <Route path="/orange-game" element={<OrangePage />} />
                    <Route path="/endless-tik-tak-toe-game" element={<EndlessTTTPage />} />
                    {/* Add more game routes here in the future */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
