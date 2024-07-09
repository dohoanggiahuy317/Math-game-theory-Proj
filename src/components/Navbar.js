// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleMusic, isPlaying }) => {
    return (
        <nav className="navbar">
            <Link to="/">🏠↩️</Link>
            <button onClick={toggleMusic}>
                {isPlaying ? 'Pause Music' : 'Want some music? '}
            </button>
        </nav>
    );
};

export default Navbar;
