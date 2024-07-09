import React, { useState, useEffect } from 'react';
import './GameBoard.css';

const GameBoard = () => {
    const totalOranges = 100;
    const [oranges, setOranges] = useState(Array(totalOranges).fill(false));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [pickCount, setPickCount] = useState(1);
    const [winner, setWinner] = useState(null);
    const [isComputer, setIsComputer] = useState(false);
    const [computerAnnouncement, setComputerAnnouncement] = useState('Computer is ready 🍊!');
    const [playerFirst, setPlayerFirst] = useState(null);

    useEffect(() => {
        if (isComputer && currentPlayer === 2 && !winner) {
            handleComputerTurn();
        }
    }, [currentPlayer, isComputer, winner]);

    const handlePickCountChange = (count) => {
        setPickCount(count);
    };

    const handleOrangePick = (count) => {
        if (winner || count > oranges.filter(orange => !orange).length) return;

        let newOranges = [...oranges];
        let remainingToPick = count;
        for (let i = 0; i < newOranges.length; i++) {
            if (remainingToPick === 0) break;
            if (!newOranges[i]) {
                newOranges[i] = true;
                remainingToPick--;
            }
        }

        setOranges(newOranges);
        checkWinner(newOranges);

        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        setCurrentPlayer(nextPlayer);
    };

    const handleComputerTurn = () => {
        setComputerAnnouncement('Computer is thinking...');

        setTimeout(() => {
            const targetValues = [1, 12, 23, 34, 45, 56, 67, 78, 89, 100];
            const currentTotal = 100 - oranges.filter(orange => !orange).length;
            console.log(currentTotal)

            let computerPickCount = -1;
            for (let target of targetValues) {
                if (currentTotal < target && target - currentTotal <= 10) {
                    computerPickCount = target - currentTotal;
                    break;
                }
            }

            if (computerPickCount === -1) {
                const maxPick = Math.min(10, oranges.filter(orange => !orange).length);
                computerPickCount = Math.floor(Math.random() * maxPick) + 1;
            }

            handleOrangePick(computerPickCount);
            setComputerAnnouncement(`Computer picks ${computerPickCount} orange(s).`);
        }, 1000);
    };


    const checkWinner = (newOranges) => {
        if (newOranges.filter(orange => !orange).length === 0) {
            setWinner(currentPlayer);
            if (isComputer && currentPlayer === 2) {
                setComputerAnnouncement('Computer Wins!');
            }
        }
    };

    const handleReset = () => {
        setOranges(Array(totalOranges).fill(false));
        setCurrentPlayer(1);
        setPickCount(1);
        setWinner(null);
        setPlayerFirst(null);
    };

    const handleGameModeChange = () => {
        setIsComputer(!isComputer);
        handleReset();
    };

    const handleFirstPlayerChange = (first) => {
        setPlayerFirst(first);
        if (!first) {
            setCurrentPlayer(2);
        }
    };

    return (
        <div className="game-board">
            <div className="game-mode">
                <div className="game-header">
                    <button onClick={handleGameModeChange}> Change mode </button>
                    <h2 className="current-mode">{isComputer ? '👤 vs 🖥️' : '👤 vs 👤'}</h2>
                </div>
            </div>
            <div className="info">
                {isComputer && winner === null && playerFirst == null && (
                    <div className="first-player-choice">
                        <h2>Who goes first?</h2>
                        <div className="first-player-buttons">
                            <button onClick={() => handleFirstPlayerChange(true)}>
                                👤 Player First
                            </button>
                            <button onClick={() => handleFirstPlayerChange(false)}>
                                🖥️ Computer First
                            </button>
                        </div>
                    </div>
                )}

                {((!isComputer) || (isComputer && playerFirst != null)) && (
                    <div>
                        <h1>
                            {winner
                                ? !isComputer
                                    ? `Player ${winner} Wins!`
                                    : `Computer Wins!`
                                : isComputer && currentPlayer === 2
                                    ? "Computer's Turn"
                                    : `Player ${currentPlayer}'s Turn`}
                        </h1>
                        <p>{computerAnnouncement}</p>
                        <div className="orange-pick-section">
                            <h2>Choose oranges to eat:</h2>


                            <div className="pick-buttons">
                                {Array.from({ length: 10 }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePickCountChange(i + 1)}
                                        className={pickCount === i + 1 ? 'selected' : ''}
                                    >
                                        {i + 1} Oranges
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="controls">
                            <button onClick={() => handleOrangePick(pickCount)} disabled={winner}>Pick {pickCount} Oranges</button>
                            <button onClick={handleReset}>Reset Game</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="oranges-left">
                <h2>{oranges.filter(orange => !orange).length} Oranges Left</h2>
                <div className="orange-grid">
                    {oranges.map((eaten, index) => (
                        <div
                            key={index}
                            className={`orange ${eaten ? 'eaten' : ''}`}
                        />
                    ))}
                </div>
            </div>

            <div className="instructions">
                <h2>How to Play the Orange Game</h2>
                <p>Welcome to the Orange Game! Here's how you can become the orange-picking champion:</p>
                <ul>
                    <li>On your turn, you can pick any oranges from 1 to 10.</li>
                    <li>The goal is to be the one who picks the last orange.</li>
                    <li>Strategize and plan your moves to leave your opponent with no choice but to pick the last orange!</li>
                </ul>
                <h3>Game Modes</h3>
                <p>You can play the Orange Game in two exciting modes:</p>
                <ul>
                    <li><strong>Player vs. Player:</strong> Challenge a friend and see who can outsmart the other!</li>
                    <li><strong>Player vs. Computer:</strong> Test your skills against the computer's strategy.</li>
                </ul>
                <h3>Have Fun!</h3>
                <p>Remember, it's all about having fun and enjoying the game. May the best orange-picker win!</p>
            </div>



        </div>
    );
};

export default GameBoard;
