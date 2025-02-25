import React from "react";
import "../styles/Pet.scss";

const Pet = ({ name }) => {
  return (
    <div className="pet-container">
      <h2 className="pet-name">{name}</h2>
      <div className="pet">🐶</div>
    </div>
  );
};

export default Pet;
