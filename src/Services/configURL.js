import axios from "axios";
export const BASE_URL = "https://65c36c7c39055e7482c0dd41.mockapi.io";
export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

