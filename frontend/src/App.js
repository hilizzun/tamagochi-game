import React, { useState, useEffect, useCallback, useRef } from "react";
import PetName from "./components/PetName";
import Pet from "./components/Pet";
import StatusBar from "./components/StatusBar";
import Controls from "./components/Controls";
import { getPet, updatePet, createPet } from "./api"; // добавляем createPet
import "./styles/App.scss";

const App = () => {
  const [pet, setPet] = useState(null);
  const [petEmotion, setPetEmotion] = useState("default");
  const [isSleeping, setIsSleeping] = useState(false);

  const isPetOkay = (pet) => {
    return (
      pet.hunger > 25 &&
      pet.cleanliness > 25 &&
      pet.energy > 25 &&
      pet.mood > 25
    );
  };

  const petRef = useRef(pet);

  const clothesOptions = ["shirt", "dress", "rubashka", null];
  const [clothesIndex, setClothesIndex] = useState(0);
  const [clothes, setClothes] = useState(clothesOptions[clothesIndex]);

  const changeClothes = () => {
    const newIndex = (clothesIndex + 1) % clothesOptions.length;
    setClothesIndex(newIndex);
    setClothes(clothesOptions[newIndex]);
  };

  const handleUpdate = useCallback(
    (updates) => {
      if (!pet) return;

      const updatedPet = { ...pet, ...updates };

      const validData = {
        name: updatedPet.name || "",
        hunger: Math.max(updatedPet.hunger, 0),
        cleanliness: Math.max(updatedPet.cleanliness, 0),
        energy: Math.max(updatedPet.energy, 0),
        mood: Math.max(updatedPet.mood, 0),
        is_sleeping:
          updates.is_sleeping !== undefined
            ? updates.is_sleeping
            : pet.is_sleeping,
      };

      updatePet(pet.id, validData)
        .then((updatedPetResponse) => {
          setPet(updatedPetResponse);
          setIsSleeping(updatedPetResponse.is_sleeping); // обновим локально

          setTimeout(() => {
            if (updatedPetResponse.is_sleeping) {
              setPetEmotion("sleepy");
            } else if (isPetOkay(updatedPetResponse)) {
              setPetEmotion("default");
            } else {
              setPetEmotion("sad");
            }
          }, 1000);
        })
        .catch((error) => {
          console.error("Error updating pet:", error);
        });
    },
    [pet]
  );

  useEffect(() => {
    // Получение device_id из localStorage или его генерация, если его нет
    const deviceId = localStorage.getItem("device_id") || generateDeviceId();

    // Сохранение device_id в localStorage, если его нет
    if (!localStorage.getItem("device_id")) {
      localStorage.setItem("device_id", deviceId);
    }

    // Запрос питомца с использованием device_id
    getPet(deviceId)
      .then((fetchedPet) => {
        if (fetchedPet) {
          setPet(fetchedPet);
          setIsSleeping(fetchedPet.is_sleeping);
          setPetEmotion(isPetOkay(fetchedPet) ? "default" : "sad");
        } else {
          // Если питомец не найден, создаем нового
          createPet(deviceId) // передаем deviceId
            .then((newPet) => {
              setPet(newPet);
              setIsSleeping(newPet.is_sleeping);
              setPetEmotion(isPetOkay(newPet) ? "default" : "sad");
            })
            .catch((error) => {
              console.error("Error creating new pet:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching pet:", error);
      });
  }, []); // добавляем зависимость на deviceId

  useEffect(() => {
    petRef.current = pet;
  }, [pet]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentPet = petRef.current;
      if (!currentPet) return;

      if (isSleeping) {
        handleUpdate({
          hunger: currentPet.hunger,
          cleanliness: currentPet.cleanliness,
          energy: Math.min(currentPet.energy + 5, 100),
          mood: currentPet.mood,
          is_sleeping: true,
        });

        if (petEmotion !== "sleepy") {
          setPetEmotion("sleepy");
        }
      } else {
        handleUpdate({
          hunger: Math.max(currentPet.hunger - 5, 0),
          cleanliness: Math.max(currentPet.cleanliness - 3, 0),
          energy: Math.max(currentPet.energy - 4, 0),
          mood: Math.max(currentPet.mood - 3, 0),
          is_sleeping: false,
        });

        const newEmotion = isPetOkay(currentPet) ? "default" : "sad";
        if (petEmotion !== newEmotion) {
          setPetEmotion(newEmotion);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [handleUpdate, isSleeping, petEmotion]);

  if (!pet) return <div>Загрузка...</div>;

  return (
    <div className="app-container">
      <PetName
        petName={pet.name}
        setPetName={(name) => handleUpdate({ name })}
      />
      <div className="status-container">
        <StatusBar label="Голод" value={pet.hunger} />
        <StatusBar label="Чистота" value={pet.cleanliness} />
        <StatusBar label="Энергия" value={pet.energy} />
        <StatusBar label="Настроение" value={pet.mood} />
      </div>
      <Pet emotion={petEmotion} clothes={clothes} />

      <Controls
        setHunger={() => handleUpdate({ hunger: pet.hunger + 5 })}
        setCleanliness={() => handleUpdate({ cleanliness: pet.cleanliness + 3 })}
        setEnergy={() => handleUpdate({ energy: pet.energy + 4 })}
        setMood={() => handleUpdate({ mood: pet.mood + 3 })}
        setPetEmotion={setPetEmotion}
        changeClothes={changeClothes}
        toggleSleep={() => {
          const newSleepingState = !isSleeping;
          handleUpdate({ is_sleeping: newSleepingState });
          setIsSleeping(newSleepingState); // локально сразу

          if (newSleepingState) {
            setPetEmotion("sleepy");
          } else {
            setPetEmotion(isPetOkay(pet) ? "default" : "sad");
          }
        }}
        isSleeping={isSleeping}
      />
    </div>
  );
};

const generateDeviceId = () => {
  return Math.random().toString(36).substr(2, 9); // Генерация случайного устройства ID
};

export default App;
