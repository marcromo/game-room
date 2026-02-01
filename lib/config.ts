// Configuración de la API
export const API_CONFIG = {
  baseURL:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_API_URL_PROD ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:3001/api"
      : process.env.NEXT_PUBLIC_API_URL_PROD ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:3001/api",
  timeout: 10000,
};

export const API_ENDPOINTS = {
  games: "/games",
  rooms: "/rooms",
  players: "/players",
  tournaments: "/tournaments",
};
