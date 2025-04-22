import React from "react";
import catDefault from "../assets/cat.png";
import catLoved from "../assets/loved.png";
import catWashed from "../assets/washed.png";
import catSleepy from "../assets/sleepy.png";
import catSad from "../assets/sad.png";

const Pet = ({ emotion }) => {
  const emotions = {
    default: catDefault,
    loved: catLoved,
    washed: catWashed,
    sleepy: catSleepy,
    sad: catSad, 
  };

  return (
    <div className="pet-container">
      <img
        src={emotions[emotion] || catDefault}
        alt="Pet"
        className="pet-image" 
      />
    </div>
  );
};

export default Pet;