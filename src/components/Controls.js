import React from "react";
import "../styles/Controls.scss";

const Controls = ({ setHunger, setCleanliness, setEnergy, setMood, setPetEmotion }) => {
  return (
    <div className="controls">
      <button onClick={() => {
        setHunger((prev) => Math.min(prev + 20, 100));
        setPetEmotion("loved");
      }}>
        Покормить
      </button>
      <button onClick={() => {
        setCleanliness((prev) => Math.min(prev + 20, 100));
        setPetEmotion("washed"); 
      }}>
        Помыть
      </button>
      <button onClick={() => {
        setEnergy((prev) => Math.min(prev + 20, 100));
        setPetEmotion("sleepy");
      }}>
        Уложить спать
      </button>
      <button onClick={() => {
        setMood((prev) => Math.min(prev + 20, 100));
        setPetEmotion("loved");
      }}>
        Поиграть
      </button>
    </div>
  );
};

export default Controls;
