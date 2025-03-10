import React, { useState, useEffect } from "react";
import PetName from "./components/PetName";
import Pet from "./components/Pet";
import StatusBar from "./components/StatusBar";
import Controls from "./components/Controls";
import "./styles/App.scss";

const App = () => {
  // Инициализация состояний питомца из localStorage или дефолтных значений
  const defaultStats = {
    hunger: 100,
    cleanliness: 100,
    energy: 100,
    mood: 100,
  };

  const [hunger, setHunger] = useState(() => {
    const savedHunger = localStorage.getItem("hunger");
    return savedHunger ? JSON.parse(savedHunger) : defaultStats.hunger;
  });

  const [cleanliness, setCleanliness] = useState(() => {
    const savedCleanliness = localStorage.getItem("cleanliness");
    return savedCleanliness ? JSON.parse(savedCleanliness) : defaultStats.cleanliness;
  });

  const [energy, setEnergy] = useState(() => {
    const savedEnergy = localStorage.getItem("energy");
    return savedEnergy ? JSON.parse(savedEnergy) : defaultStats.energy;
  });

  const [mood, setMood] = useState(() => {
    const savedMood = localStorage.getItem("mood");
    return savedMood ? JSON.parse(savedMood) : defaultStats.mood;
  });

  // Сохранение данных в localStorage при изменении статусов
  useEffect(() => {
    localStorage.setItem("hunger", JSON.stringify(hunger));
    localStorage.setItem("cleanliness", JSON.stringify(cleanliness));
    localStorage.setItem("energy", JSON.stringify(energy));
    localStorage.setItem("mood", JSON.stringify(mood));
  }, [hunger, cleanliness, energy, mood]);

  // Таймер для обновления статусов питомца
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => Math.max(prev - 5, 0));
      setCleanliness((prev) => Math.max(prev - 3, 0));
      setEnergy((prev) => Math.max(prev - 4, 0));
      setMood((prev) => Math.max(prev - 3, 0));
    }, 5000); // Каждый 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {/* Компонент для редактирования имени питомца */}
      <PetName />

      {/* Статус-бары */}
      <div className="status-container">
        <StatusBar label="Голод" value={hunger} />
        <StatusBar label="Чистота" value={cleanliness} />
        <StatusBar label="Энергия" value={energy} />
        <StatusBar label="Настроение" value={mood} />
      </div>

      {/* Компонент с картинкой питомца */}
      <Pet />

      {/* Компоненты для управления питомцем */}
      <Controls
        setHunger={setHunger}
        setCleanliness={setCleanliness}
        setEnergy={setEnergy}
        setMood={setMood}
      />
    </div>
  );
};

export default App;
