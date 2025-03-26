import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LastrategyApp() {
  const [sequence, setSequence] = useState([1, 2, 3]);
  const [bet, setBet] = useState((1 + 3) * 10);
  const [history, setHistory] = useState([]);

  const handleWin = () => {
    const newNumber = sequence[0] + sequence[sequence.length - 1];
    const newSequence = [...sequence, newNumber];
    updateSequence(newSequence, "Win");
  };

  const handleLose = () => {
    if (sequence.length <= 2) {
      handleReset();
      return;
    }
    const newSequence = sequence.slice(1, -1);
    updateSequence(newSequence, "Lose");
  };

  const handleReset = () => {
    updateSequence([1, 2, 3], "Reset");
  };

  const updateSequence = (newSequence, result) => {
    const newBet = newSequence.length > 1 ? (newSequence[0] + newSequence[newSequence.length - 1]) * 10 : 10;
    setSequence(newSequence);
    setBet(newBet);
    setHistory([...history, { sequence, bet, result }]);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Lastrategy Betting App</h1>
      <p className="mt-2">Sequence: {JSON.stringify(sequence)}</p>
      <p className="mt-2">Bet Amount: {bet} PHP</p>
      <div className="mt-4 flex justify-center gap-2">
        <Button onClick={handleWin} className="bg-green-500">W (Win)</Button>
        <Button onClick={handleLose} className="bg-red-500">L (Lose)</Button>
        <Button onClick={handleReset} className="bg-blue-500">S (Reset)</Button>
      </div>
      <div className="mt-6 text-left">
        <h2 className="text-xl font-semibold">History</h2>
        <ul className="mt-2">
          {history.map((entry, index) => (
            <li key={index} className="border-b py-1">
              Round {index + 1}: {entry.result} - Sequence: {JSON.stringify(entry.sequence)} - Bet: {entry.bet} PHP
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
