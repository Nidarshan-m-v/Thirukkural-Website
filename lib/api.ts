import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // your FastAPI base URL
});

export const fetchKural = async (kuralNumber: number) => {
  const response = await API.get(`/kurals/${kuralNumber}`);
  return response.data;
};
