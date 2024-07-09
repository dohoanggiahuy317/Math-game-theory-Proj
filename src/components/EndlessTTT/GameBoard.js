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
        if (newHistory[currentPlayer].length > 3) {
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
            const availableMoves = board
                .map((value, index) => (value === null ? index : null))
                .filter((val) => val !== null);
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            handleMove(randomMove);
        }, 1000);
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
        <div className="cool-tic-tac-toe">
            <h1>Cool Tic Tac Toe</h1>
            <div className="game-mode">
                <button onClick={handleGameModeChange}>
                    {isComputer ? 'Switch to Player vs Player' : 'Switch to Player vs Computer'}
                </button>
            </div>
            <div className="board">
                {board.map((value, index) => (
                    <div
                        key={index}
                        className={`cell ${value} ${history[currentPlayer].includes(index) && history[currentPlayer].indexOf(index) === 0 ? 'blur' : ''}`}
                        onClick={() => handleMove(index)}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <div className="info">
                {winner ? <h2>{winner} Wins!</h2> : <h2>Player {currentPlayer}'s Turn</h2>}
            </div>
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
    );
};

export default GameBoard;
