import axios from "axios";

const API_URL = "https://tamagotchi-ibkj.onrender.com";

export const createPet = async (name) => {
  const response = await axios.post(`${API_URL}/pet`, { name });
  return response.data;
};

export const getPet = async (id) => {
  const response = await axios.get(`${API_URL}/pet/${id}`);
  return response.data;
};

export const updatePet = async (id, updates) => {
  console.log("Updating pet with data:", updates); 

  try {
    const response = await axios.put(`${API_URL}/pet/${id}`, updates, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating pet:", error.response ? error.response.data : error);
    throw error;  
  }
};


