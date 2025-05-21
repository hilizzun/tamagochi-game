import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react"; 
import "../styles/PetName.scss";

const PetName = ({ petName, setPetName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(petName);

  useEffect(() => {
    setLocalName(petName);
  }, [petName]);

  const handleSave = () => {
    setIsEditing(false);
    setPetName(localName); // обновим имя в App (и на бэке)
  };

  return (
    <div className="pet-name">
      {isEditing ? (
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <h2>
          {petName}{" "}
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