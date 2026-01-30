"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Room = {
  roomId: string;
  name: string;
  description: string;
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view rooms.");
        setRooms([]);
        setLoading(false);
        return;
      }
      const res = await fetch("http://localhost:3001/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const data = await res.json();
      setRooms(data);
    } catch (err: any) {
      setError(err.message || "Error loading rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🏠 Rooms</h1>
            <p className="text-gray-300">Browse and join available rooms</p>
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
            <p className="text-white mt-4">Loading rooms...</p>
          </div>
        )}

        {!loading && rooms.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-xl">No rooms available</p>
            <p className="text-gray-400 mt-2">
              Rooms will appear here when available
            </p>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link
                key={room.roomId}
                href={`/rooms/${room.roomId}`}
                className="block bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-300">{room.description}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
