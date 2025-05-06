import React from "react";
import catDefault from "../assets/cat.png";
import catLoved from "../assets/loved.png";
import catWashed from "../assets/washed.png";
import catSleepy from "../assets/sleepy.png";
import catSad from "../assets/sad.png";
import shirt from "../assets/futbolka.png";
import plate from "../assets/plate.png";
import rubashka from "../assets/rubashka.png";

const Pet = ({ emotion, clothes }) => {
  const emotions = {
    default: catDefault,
    loved: catLoved,
    washed: catWashed,
    sleepy: catSleepy,
    sad: catSad,
  };

  const clothesImages = {
    shirt: shirt,
    plate: plate,
    rubashka: rubashka,
  };

  return (
    <div className="pet-container">
    <div className="pet-wrapper">
      <img
        src={emotions[emotion] || catDefault}
        alt="Pet"
        className="pet-image"
      />
      {clothes && clothesImages[clothes] && (
        <img
          src={clothesImages[clothes]}
          alt="Clothes"
          className="pet-clothes"
        />
      )}
    </div>
  </div>

  );
};

export default Pet;
