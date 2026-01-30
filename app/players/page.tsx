"use client";

import { useState, useEffect } from "react";
import { apiService } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/config";

interface Player {
  id: string;
  username: string;
  email?: string;
  score?: number;
  level?: number;
  createdAt?: string;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const data = await apiService.get<Player[]>(API_ENDPOINTS.players);
      setPlayers(data);
      setError(null);
    } catch (err) {
      setError(
        "Error al cargar los jugadores. Verifica que la API esté funcionando.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">👥 Jugadores</h1>
            <p className="text-gray-300">Comunidad de Game Room</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4">Cargando jugadores...</p>
          </div>
        )}

        {!loading && players.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-xl">
              No hay jugadores registrados
            </p>
            <p className="text-gray-400 mt-2">
              Los jugadores aparecerán aquí cuando se registren
            </p>
          </div>
        )}

        {!loading && players.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {player.username}
                    </h3>
                    {player.email && (
                      <p className="text-gray-400 text-sm">{player.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  {player.level !== undefined && (
                    <div className="bg-blue-600/30 px-3 py-1 rounded-lg">
                      <p className="text-white text-sm">Nivel {player.level}</p>
                    </div>
                  )}
                  {player.score !== undefined && (
                    <div className="bg-purple-600/30 px-3 py-1 rounded-lg">
                      <p className="text-white text-sm">{player.score} pts</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
