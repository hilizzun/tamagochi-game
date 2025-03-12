// App.js
import React, { useState, useEffect } from "react";
import PetName from "./components/PetName";
import Pet from "./components/Pet";
import StatusBar from "./components/StatusBar";
import Controls from "./components/Controls";
import "./styles/App.scss";

const App = () => {
  const defaultStats = {
    hunger: 100,
    cleanliness: 100,
    energy: 100,
    mood: 100,
  };

  const [hunger, setHunger] = useState(() => JSON.parse(localStorage.getItem("hunger")) || defaultStats.hunger);
  const [cleanliness, setCleanliness] = useState(() => JSON.parse(localStorage.getItem("cleanliness")) || defaultStats.cleanliness);
  const [energy, setEnergy] = useState(() => JSON.parse(localStorage.getItem("energy")) || defaultStats.energy);
  const [mood, setMood] = useState(() => JSON.parse(localStorage.getItem("mood")) || defaultStats.mood);
  const [petEmotion, setPetEmotion] = useState("default");
  const [petName, setPetName] = useState(() => localStorage.getItem("petName") || "Мой кот");

  useEffect(() => {
    localStorage.setItem("hunger", JSON.stringify(hunger));
    localStorage.setItem("cleanliness", JSON.stringify(cleanliness));
    localStorage.setItem("energy", JSON.stringify(energy));
    localStorage.setItem("mood", JSON.stringify(mood));
    localStorage.setItem("petName", petName);
  }, [hunger, cleanliness, energy, mood, petName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => Math.max(prev - 5, 0));
      setCleanliness((prev) => Math.max(prev - 3, 0));
      setEnergy((prev) => Math.max(prev - 4, 0));
      setMood((prev) => Math.max(prev - 3, 0));
      setPetEmotion("default");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <PetName petName={petName} setPetName={setPetName} />
      <div className="status-container">
        <StatusBar label="Голод" value={hunger} />
        <StatusBar label="Чистота" value={cleanliness} />
        <StatusBar label="Энергия" value={energy} />
        <StatusBar label="Настроение" value={mood} />
      </div>
      <Pet emotion={petEmotion} />
      <Controls setHunger={setHunger} setCleanliness={setCleanliness} setEnergy={setEnergy} setMood={setMood} setPetEmotion={setPetEmotion} />
    </div>
  );
};

export default App;