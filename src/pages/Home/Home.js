import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import games from '../../data/games.json'; // Corrected import path

const GameCard = ({ name, url, desc, link }) => {
    return (
        <div className="game-card">
            <div className="game-card-image">
                <img src={`${process.env.PUBLIC_URL}${url}`} alt={`${name} thumbnail`} />
            </div>
            <h2>{name}</h2>
            <p>{desc}</p>
            <Link to={link}>Play {name}</Link>
        </div>
    );
};

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Math Games world!</h1>
            <p className="game-tagline">Sharpen your critical thinking and strategy skills while having loads of fun! 🧠✨</p>
            <div className="game-cards">
                {games.map((game, index) => (
                    <GameCard
                        key={index}
                        name={game.name}
                        url={game.url}
                        desc={game.desc}
                        link={game.link}
                    />
                ))}
            </div>
            <div className="instructions">
                <h2>How to Navigate</h2>
                <p>Click on a game to play.</p>
                <p>The game instructions are at the bottom of each game's page.</p>
            </div>
        </div>
    );
};

export default Home;
