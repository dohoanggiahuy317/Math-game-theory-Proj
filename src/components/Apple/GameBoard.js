import React, { useState, useEffect } from 'react';
import './GameBoard.css';

const GameBoard = () => {
    const [apples, setApples] = useState([1, 2, 3, 4, 5]);
    const [eatenApples, setEatenApples] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [pickCount, setPickCount] = useState(1);
    const [winner, setWinner] = useState(null);
    const [isComputer, setIsComputer] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [computerAnnouncement, setComputerAnnouncement] = useState('');
    const [firstMove, setFirstMove] = useState(null);

    useEffect(() => {
        if (isComputer && currentPlayer === 2 && !winner) {
            handleComputerTurn();
        }
    }, [currentPlayer, isComputer, winner]);

    const handlePickCountChange = (count) => {
        setPickCount(count);
    };

    const handleApplePick = (index, count = pickCount) => {
        if (winner || eatenApples.includes(index)) return;

        if (firstMove === null) {
            setFirstMove({ index, count });
        }

        let newEatenApples = [...eatenApples];

        if (count === 1) {
            newEatenApples.push(index);
        } else if (count === 2) {
            if (index < apples.length - 1 && !eatenApples.includes(index + 1)) {
                newEatenApples.push(index, index + 1);
            } else if (index === apples.length - 1 && !eatenApples.includes(index - 1)) {
                newEatenApples.push(index - 1, index);
            } else {
                return; // Invalid pick
            }
        }

        setEatenApples(newEatenApples);
        checkWinner(newEatenApples);
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        setCurrentPlayer(nextPlayer);
    };

    const handleComputerTurn = () => {
        setComputerAnnouncement('Computer is thinking...');
        setTimeout(() => {
            let computerMoveIndex;
            let computerPickCount = 1;

            if (firstMove) {
                const { index, count } = firstMove;
                if (count === 1 && (index === 0 || index === 1)) {
                    computerPickCount = 2;
                    computerMoveIndex = 2;
                } else if (count === 1 && (index === 3 || index === 4)) {
                    computerPickCount = 2;
                    computerMoveIndex = 1;
                } else if (count === 2 && (index === 0 || index === 1)) {
                    computerPickCount = 1;
                    computerMoveIndex = 3;
                } else if (count === 2 && (index === 3 || index === 4)) {
                    computerPickCount = 1;
                    computerMoveIndex = 1;
                } else if (count === 2 && (index === 2 || index === 3)) {
                    computerPickCount = 1;
                    computerMoveIndex = 1;
                } else {
                    // Random move for any other scenario
                    const availableMoves = [];
                    for (let i = 0; i < apples.length; i++) {
                        if (!eatenApples.includes(i)) {
                            availableMoves.push(i);
                        }
                    }
                    computerMoveIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                    computerPickCount = 1;
                }

                setFirstMove(false);
            } else {
                // Random move if first move is not set
                const availableMoves = [];
                for (let i = 0; i < apples.length; i++) {
                    if (!eatenApples.includes(i)) {
                        availableMoves.push(i);
                    }
                }
                computerMoveIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                computerPickCount = 1;
            }

            handlePickCountChange(computerPickCount);
            handleApplePick(computerMoveIndex, computerPickCount);
            setComputerAnnouncement(`Computer picks ${computerPickCount} apple(s).`);
            setFirstMove(false);
        }, 1000);
    };

    const checkWinner = (eatenApples) => {
        if (eatenApples.length === apples.length) {
            setWinner(currentPlayer);
        }
    };

    const handleReset = () => {
        setApples([1, 2, 3, 4, 5]);
        setEatenApples([]);
        setCurrentPlayer(1);
        setPickCount(1);
        setWinner(null);
        setFirstMove(null);
    };

    const handleGameModeChange = () => {
        setIsComputer(!isComputer);
        handleReset();
    };

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
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
                <div className="apple-pick-section">
                    <h2>Choose apples to eat:</h2>
                    <div className="pick-buttons">
                        <button onClick={() => handlePickCountChange(1)} className={pickCount === 1 ? 'selected' : ''}>1 Apple</button>
                        <button onClick={() => handlePickCountChange(2)} className={pickCount === 2 ? 'selected' : ''}>2 Apples</button>
                    </div>
                </div>
            </div>
            <div className="apples">
                {apples.map((apple, index) => {
                    const isEaten = eatenApples.includes(index);
                    const isHoverOne = (pickCount === 1 && hoverIndex == index)
                    const isHoverTwo = (pickCount === 2 && (hoverIndex === index || hoverIndex === index - 1 || (hoverIndex === apples.length - 1 && index === apples.length - 2)));
                    let isHoverValid = false;

                    if (hoverIndex === apples.length - 1) {
                        if (!eatenApples.includes(apples.length - 2)) {
                            isHoverValid = true;
                        } else {
                            isHoverValid = false;
                        }
                    } else if (!eatenApples.includes(hoverIndex) && !eatenApples.includes(hoverIndex + 1)) {
                        isHoverValid = true;
                    }


                    return (
                        <div
                            key={index}
                            className={`apple ${isHoverOne && !isEaten ? 'hover-one' : ''} ${isEaten ? 'eaten' : ''} ${(isHoverTwo && isHoverValid) ? 'hover-two' : ''}`}
                            onClick={() => handleApplePick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {apple}
                        </div>
                    );
                })}
            </div>
            <div className="instructions">
                <h2>How to Play</h2>
                <ol>
                    <li>Players take turns picking either 1 or 2 apples.</li>
                    <li>You can only pick consecutive apples (next to each other).</li>
                    <li>The player who picks the last apple wins!</li>
                    <li>Plan ahead and try to leave your opponent with the last apple.</li>
                </ol>
                <p>Tip: Try to think a few moves ahead to outsmart your opponent!</p>
            </div>
            <div className="controls">
                <button onClick={handleReset}>Reset Game</button>
            </div>
        </div>
    );
};

export default GameBoard;
