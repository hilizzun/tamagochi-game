import React from "react";
import "../styles/Controls.scss";

const Controls = ({ setHunger, setCleanliness, setEnergy, setMood }) => {
  return (
    <div className="controls">
      <button onClick={() => setHunger((prev) => Math.min(prev + 20, 100))}>
        Покормить
      </button>
      <button onClick={() => setCleanliness((prev) => Math.min(prev + 20, 100))}>
        Помыть
      </button>
      <button onClick={() => setEnergy((prev) => Math.min(prev + 20, 100))}>
        Уложить спать
      </button>
      <button onClick={() => setMood((prev) => Math.min(prev + 20, 100))}>
        Поиграть
      </button>
    </div>
  );
};

export default Controls;
