import React, { useState, useEffect, useCallback } from "react";
import PetName from "./components/PetName";
import Pet from "./components/Pet";
import StatusBar from "./components/StatusBar";
import Controls from "./components/Controls";
import { getPet, updatePet } from "./api";
import "./styles/App.scss";

const PET_ID = 4;

const App = () => {
  const [pet, setPet] = useState(null);
  const [petEmotion, setPetEmotion] = useState("default");

  const handleUpdate = useCallback((updates) => {
    if (!pet) return;

    // Преобразуем данные в валидные значения перед отправкой
    const updatedPet = { ...pet, ...updates };
    const validData = {
      name: updatedPet.name || "",
      hunger: typeof updatedPet.hunger === 'number' ? updatedPet.hunger : 100,
      cleanliness: typeof updatedPet.cleanliness === 'number' ? updatedPet.cleanliness : 100,
      energy: typeof updatedPet.energy === 'number' ? updatedPet.energy : 100,
      mood: typeof updatedPet.mood === 'number' ? updatedPet.mood : 100,
    };

    console.log("Sending updated pet:", validData);

    // Отправляем обновление
    updatePet(PET_ID, validData)
      .then((updatedPetResponse) => {
        setPet(updatedPetResponse);
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
      });
  }, [pet]);

  useEffect(() => {
    getPet(PET_ID).then(setPet);
  }, []);

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
  }, [pet, handleUpdate]);

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
