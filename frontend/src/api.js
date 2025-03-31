import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const createPet = async (name) => {
  const response = await axios.post(`${API_URL}/pet`, { name });
  return response.data;
};

export const getPet = async (id) => {
  const response = await axios.get(`${API_URL}/pet/${id}`);
  return response.data;
};

export const updatePet = async (id, updates) => {
  console.log("Updating pet with data:", updates);  // Логирование данных перед отправкой

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
    throw error;  // Пробрасываем ошибку дальше
  }
};


