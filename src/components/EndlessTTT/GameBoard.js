import React, { useState, useEffect } from 'react';
import './GameBoard.css';

const GameBoard = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [history, setHistory] = useState({ X: [], O: [] });
    const [winner, setWinner] = useState(null);
    const [isComputer, setIsComputer] = useState(false);

    useEffect(() => {
        if (isComputer && currentPlayer === 'O' && !winner) {
            handleComputerMove();
        }
    }, [currentPlayer, isComputer, winner]);

    const handleMove = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newHistory = { ...history, [currentPlayer]: [...history[currentPlayer], index] };
        if (newHistory[currentPlayer].length >= 4) {
            const oldestMove = newHistory[currentPlayer].shift();
            newBoard[oldestMove] = null;
            setBoard([...newBoard]);
        }
        setHistory(newHistory);

        checkWinner(newBoard, currentPlayer);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const handleComputerMove = () => {
        setTimeout(() => {
            const optimalMove = findOptimalMove();
            handleMove(optimalMove);
        }, 200);
    };

    const findOptimalMove = () => {
        const availableMoves = board
            .map((value, index) => (value === null ? index : null))
            .filter((val) => val !== null);

        // Check for a winning move
        for (const move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = 'O';
            if (checkPotentialWinner(newBoard, 'O')) {
                return move;
            }
        }

        // Block player's winning move
        for (const move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = 'X';
            if (checkPotentialWinner(newBoard, 'X')) {
                return move;
            }
        }

        // Otherwise, pick a random move
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    };

    const checkPotentialWinner = (board, player) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    };

    const checkWinner = (board, player) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                setWinner(player);
                return;
            }
        }
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setHistory({ X: [], O: [] });
        setWinner(null);
    };

    const handleGameModeChange = () => {
        setIsComputer(!isComputer);
        handleReset();
    };

    return (
        <div className="game-board">
            <h1>Endless Tic Tac Toe</h1>
            <div className="game-mode" id='ttt_game_mode'>
                <div className="game-header">
                    <button onClick={handleGameModeChange}> Change mode </button>
                    <h2 className="current-mode">{isComputer ? '👤 vs 🖥️' : '👤 vs 👤'}</h2>
                </div>
            </div>
            <div className="info"  style={{borderTop: "1px solid black"}}>
                {winner ? <h2>{winner} Wins!</h2> : <h2>Player {currentPlayer}'s Turn</h2>}
            </div>
            <div className="board">
                {board.map((value, index) => {
                    const playerHistory = history[currentPlayer];
                    const isBlur = playerHistory.length >= 3 && playerHistory[0] === index;
                    return (
                        <div
                            key={index}
                            className={`cell ${value} ${isBlur ? 'blur' : ''}`}
                            onClick={() => handleMove(index)}
                        >
                            {value}
                        </div>
                    );
                })}
            </div>
            <button className="reset-button" onClick={handleReset}>Reset</button>
            <div className="instructions">
                <h2>How to Play Endless Tic Tac Toe</h2>
                <ol>
                    <li>The game is played on a 3x3 grid. Players take turns placing their symbol (X or O) in empty cells.</li>
                    <li><strong>Endless Twist:</strong> Each player can only have 3 symbols on the board at a time!</li>
                    <li>If you need to place a 4th symbol, your oldest one will fade away.</li>
                    <li>To win, get 3 of your symbols in a row (horizontally, vertically, or diagonally).</li>
                </ol>
                <p><strong>Strategy Tip:</strong> Think ahead! Your symbols' positions will change as you play more moves.</p>
            </div>
        </div>
    );
};

export default GameBoard;
