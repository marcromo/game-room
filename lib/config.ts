// Configuración de la API
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
};

export const API_ENDPOINTS = {
  games: "/games",
  rooms: "/rooms",
  players: "/players",
  tournaments: "/tournaments",
};
