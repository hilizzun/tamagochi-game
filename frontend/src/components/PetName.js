import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react"; 
import "../styles/PetName.scss";

const PetName = () => {
  const [name, setName] = useState("Мой питомец");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("petName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem("petName", name);
  };

  return (
    <div className="pet-name">
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <h2>
          {name}{" "}
          <Edit2
            className="edit-icon"
            size={20}
            onClick={() => setIsEditing(true)}
          />
        </h2>
      )}
    </div>
  );
};

export default PetName;