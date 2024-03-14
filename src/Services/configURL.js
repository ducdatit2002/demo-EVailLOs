import axios from "axios";
export const BASE_URL = "https://65f158ccda8c6584131d833a.mockapi.io";
export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

