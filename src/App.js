import React, { useState, useEffect } from "react";
import PetName from "./components/PetName";
import Pet from "./components/Pet";
import StatusBar from "./components/StatusBar";
import Controls from "./components/Controls";
import { getPet, updatePet } from "./api"; // API-запросы
import "./styles/App.scss";

const PET_ID = 1; // ID питомца в базе

const App = () => {
  const [pet, setPet] = useState(null);
  const [petEmotion, setPetEmotion] = useState("default");

  // Загружаем данные питомца при запуске
  useEffect(() => {
    getPet(PET_ID).then(setPet);
  }, []);

  // Функция обновления питомца
  const handleUpdate = (updates) => {
    if (!pet) return;
    const updatedPet = { ...pet, ...updates };
    updatePet(PET_ID, updatedPet).then(setPet);
  };

  // Эффект, который уменьшает параметры питомца
  useEffect(() => {
    const interval = setInterval(() => {
      if (pet) {
        handleUpdate({
          hunger: Math.max(pet.hunger - 5, 0),
          cleanliness: Math.max(pet.cleanliness - 3, 0),
          energy: Math.max(pet.energy - 4, 0),
          mood: Math.max(pet.mood - 3, 0),
        });
        setPetEmotion("default");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [pet]);

  if (!pet) return <div>Загрузка...</div>;

  return (
    <div className="app-container">
      <PetName petName={pet.name} setPetName={(name) => handleUpdate({ name })} />
      <div className="status-container">
        <StatusBar label="Голод" value={pet.hunger} />
        <StatusBar label="Чистота" value={pet.cleanliness} />
        <StatusBar label="Энергия" value={pet.energy} />
        <StatusBar label="Настроение" value={pet.mood} />
      </div>
      <Pet emotion={petEmotion} />
      <Controls
        setHunger={(val) => handleUpdate({ hunger: val })}
        setCleanliness={(val) => handleUpdate({ cleanliness: val })}
        setEnergy={(val) => handleUpdate({ energy: val })}
        setMood={(val) => handleUpdate({ mood: val })}
        setPetEmotion={setPetEmotion}
      />
    </div>
  );
};

export default App;
