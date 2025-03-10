import React from "react";
import "../styles/Pet.scss";
import catImage from "../assets/cat.png"; // добавь в папку `assets/` своё изображение

const Pet = () => {
  return (
    <div className="pet-container">
      <img src={catImage} alt="Питомец" className="pet-image" />
    </div>
  );
};

export default Pet;
