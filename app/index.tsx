"use client";
import { useState } from "react";

export default function Home() {
  const [sequence, setSequence] = useState<number[]>([1, 2, 3]);
  const [betAmount, setBetAmount] = useState<number>(40); // (1+3)×10 PHP

  const handleWin = () => {
    const first = sequence[0] ?? 0;
    const last = sequence[sequence.length - 1] ?? 0;
    setSequence([...sequence, first + last]);
    setBetAmount((first + last) * 10);
  };

  const handleLoss = () => {
    if (sequence.length <= 2) {
      setSequence([]);
      setBetAmount(0);
    } else {
      setSequence(sequence.slice(1, -1));
      const newFirst = sequence[1] ?? 0;
      const newLast = sequence[sequence.length - 2] ?? 0;
      setBetAmount((newFirst + newLast) * 10);
    }
  };

  const handleReset = () => {
    setSequence([1, 2, 3]);
    setBetAmount(40);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lastrategy Betting Tracker</h1>
      <p><strong>Current Sequence:</strong> {sequence.length > 0 ? `[${sequence.join(" - ")}]` : "Empty (Reset Needed)"}</p>
      <p><strong>Next Bet Amount:</strong> {betAmount} PHP</p>
      
      <button onClick={handleWin} style={buttonStyle}>W (Win)</button>
      <button onClick={handleLoss} style={buttonStyle}>L (Lose)</button>
      <button onClick={handleReset} style={buttonStyle}>S (Reset)</button>
    </div>
  );
}

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};
