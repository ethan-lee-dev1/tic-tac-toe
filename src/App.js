import "./App.css";
import { useState } from "react";
import { Square } from "./Square";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  if (squares.every((el) => el !== null) && !winner) {
    status = "Tied! try again!";
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const handleReset = () => {
    setSquares(Array(9).fill(null));
  };

  return (
    <>
      <h1>TicTacToe game by</h1>
      <h2>Karina and Ethan</h2>
      <h3>{status}</h3>
      <div>
        <table>
          <tr>
            <td>
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            </td>
            <td>
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            </td>
            <td>
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </td>
          </tr>

          <tr>
            <td>
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            </td>
            <td>
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            </td>
            <td>
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </td>
          </tr>

          <tr>
            <td>
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            </td>
            <td>
              {" "}
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            </td>
            <td>
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </td>
          </tr>
        </table>
      </div>
      <button onClick={() => handleReset()}>Reset</button>
    </>
  );
}
