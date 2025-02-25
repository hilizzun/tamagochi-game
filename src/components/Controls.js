import React from "react";
import "../styles/Controls.scss";

const Controls = ({ onFeed, onWash, onPlay, onSleep }) => {
  return (
    <div className="controls">
      <button onClick={onFeed}>🍖 Кормить</button>
      <button onClick={onWash}>🛁 Мыть</button>
      <button onClick={onPlay}>🎾 Играть</button>
      <button onClick={onSleep}>😴 Спать</button>
    </div>
  );
};

export default Controls;
