import React from "react";
import catDefault from "../assets/cat.png";
import catLoved from "../assets/loved.png";
import catWashed from "../assets/washed.png";
import catSleepy from "../assets/sleepy.png";

const Pet = ({ emotion }) => {
  // Объект с картинками для разных состояний
  const emotions = {
    default: catDefault,
    loved: catLoved,
    washed: catWashed,
    sleepy: catSleepy,
  };

  return (
    <div className="pet-container">
      <img
        src={emotions[emotion] || catDefault} // Показываем соответствующую картинку
        alt="Pet"
        className="pet-image" // Классы для стилизации
      />
    </div>
  );
};

export default Pet;
