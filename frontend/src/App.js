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

  const isPetOkay = pet => {
    // Определяем, что питомцу плохо, если хотя бы одно состояние ниже 30
    return (pet.hunger + pet.cleanliness + pet.energy + pet.mood) > 0;
  };

  const handleUpdate = useCallback((updates) => {
    if (!pet) return;
  
    const updatedPet = { ...pet, ...updates };
    const validData = {
      name: updatedPet.name || "",
      hunger: Math.max(updatedPet.hunger, 0),
      cleanliness: Math.max(updatedPet.cleanliness, 0),
      energy: Math.max(updatedPet.energy, 0),
      mood: Math.max(updatedPet.mood, 0),
    };
  
    updatePet(PET_ID, validData)
      .then((updatedPetResponse) => {
        setPet(updatedPetResponse);
  
        // Добавление задержки для смены эмоции
        setTimeout(() => {
          // Устанавливаем эмоцию в зависимости от состояния питомца
          if (isPetOkay(updatedPetResponse)) {
            setPetEmotion("default"); // Хорошо
          } else {
            setPetEmotion("sad"); // Плохо
          }
        }, 1000); // Задержка 1 секунда
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
      });
  }, [pet]);  

  useEffect(() => {
    getPet(PET_ID).then((fetchedPet) => {
      setPet(fetchedPet);
      // При загрузке определяем, как питомец себя чувствует
      if (isPetOkay(fetchedPet)) {
        setPetEmotion("default");
      } else {
        setPetEmotion("sad");
      }
    });
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
        setHunger={() => handleUpdate({ hunger: pet.hunger + 5 })}
        setCleanliness={() => handleUpdate({ cleanliness: pet.cleanliness + 3 })}
        setEnergy={() => handleUpdate({ energy: pet.energy + 4 })}
        setMood={() => handleUpdate({ mood: pet.mood + 3 })}
        setPetEmotion={setPetEmotion}
      />
    </div>
  );
};


export default App;
