import React, { useState, useEffect } from "react";
import Pet from "./components/Pet";
import StatusBar from "./components/StatusBar";
import Controls from "./components/Controls";
import "./styles/App.scss";

function App() {
  const [petName] = useState("Тама");
  const [status, setStatus] = useState({
    food: 100,
    clean: 100,
    fun: 100,
    sleep: 100,
  });

  // Функции взаимодействия
  const feedPet = () => setStatus((prev) => ({ ...prev, food: Math.min(100, prev.food + 10) }));
  const washPet = () => setStatus((prev) => ({ ...prev, clean: Math.min(100, prev.clean + 10) }));
  const playWithPet = () => setStatus((prev) => ({ ...prev, fun: Math.min(100, prev.fun + 10) }));
  const sleepPet = () => setStatus((prev) => ({ ...prev, sleep: Math.min(100, prev.sleep + 10) }));

  // Таймер для уменьшения статусов
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => ({
        food: Math.max(0, prev.food - 3),
        clean: Math.max(0, prev.clean - 2),
        fun: Math.max(0, prev.fun - 2),
        sleep: Math.max(0, prev.sleep - 1),
      }));
    }, 5000); // Обновляется каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <Pet name={petName} />
      <div className="status-bars">
        <StatusBar label="Питание" value={status.food} />
        <StatusBar label="Чистота" value={status.clean} />
        <StatusBar label="Веселье" value={status.fun} />
        <StatusBar label="Сон" value={status.sleep} />
      </div>
      <Controls onFeed={feedPet} onWash={washPet} onPlay={playWithPet} onSleep={sleepPet} />
    </div>
  );
}

export default App;
