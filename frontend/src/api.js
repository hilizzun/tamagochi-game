import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Адрес сервера FastAPI

export const createPet = async (name) => {
  const response = await axios.post(`${API_URL}/pet`, { name });
  return response.data;
};

export const getPet = async (id) => {
  const response = await axios.get(`${API_URL}/pet/${id}`);
  return response.data;
};

export const updatePet = async (id, updates) => {
  const response = await axios.put(`${API_URL}/pet/${id}`, updates, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
