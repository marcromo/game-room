"use client";

import { useState, useEffect } from "react";
import { apiService } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/config";

interface Game {
  id: string;
  name: string;
  description?: string;
  genre?: string;
  players?: number;
  createdAt?: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    genre: "",
    players: 1,
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const data = await apiService.get<Game[]>(API_ENDPOINTS.games);
      setGames(data);
      setError(null);
    } catch (err) {
      setError(
        "Error al cargar los juegos. Verifica que la API esté funcionando.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.post(API_ENDPOINTS.games, newGame);
      setNewGame({ name: "", description: "", genre: "", players: 1 });
      setShowAddForm(false);
      fetchGames();
    } catch (err) {
      setError("Error al agregar el juego");
      console.error(err);
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este juego?")) {
      try {
        await apiService.delete(`${API_ENDPOINTS.games}/${id}`);
        fetchGames();
      } catch (err) {
        setError("Error al eliminar el juego");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🎯 Juegos</h1>
            <p className="text-gray-300">Gestiona tu colección de juegos</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {showAddForm ? "Cancelar" : "+ Agregar Juego"}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Nuevo Juego</h2>
            <form onSubmit={handleAddGame} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Nombre *</label>
                <input
                  type="text"
                  required
                  value={newGame.name}
                  onChange={(e) =>
                    setNewGame({ ...newGame, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="Nombre del juego"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Descripción</label>
                <textarea
                  value={newGame.description}
                  onChange={(e) =>
                    setNewGame({ ...newGame, description: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="Descripción del juego"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Género</label>
                  <input
                    type="text"
                    value={newGame.genre}
                    onChange={(e) =>
                      setNewGame({ ...newGame, genre: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="Ej: Acción, Estrategia"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Jugadores</label>
                  <input
                    type="number"
                    min="1"
                    value={newGame.players}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        players: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors font-semibold"
              >
                Agregar Juego
              </button>
            </form>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4">Cargando juegos...</p>
          </div>
        )}

        {/* Games Grid */}
        {!loading && games.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-xl">No hay juegos disponibles</p>
            <p className="text-gray-400 mt-2">
              Agrega tu primer juego para comenzar
            </p>
          </div>
        )}

        {!loading && games.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{game.name}</h3>
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
                {game.description && (
                  <p className="text-gray-300 mb-3">{game.description}</p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {game.genre && (
                    <span className="bg-purple-600/50 text-white px-3 py-1 rounded-full text-sm">
                      {game.genre}
                    </span>
                  )}
                  {game.players && (
                    <span className="bg-blue-600/50 text-white px-3 py-1 rounded-full text-sm">
                      {game.players} jugadores
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
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
