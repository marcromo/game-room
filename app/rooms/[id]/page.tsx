"use client";

import { useEffect, useState } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";
import { io, Socket } from "socket.io-client";
import { useSocketDebug } from "@/hooks/useSocketDebug";
import { useRouter } from "next/navigation";
import Message from "@/components/Message";
import ParticipantsList from "@/components/ParticipantsList";

interface Room {
  roomId: string;
  name: string;
  description: string;
  chat?: {
    id: string;
    route: string;
  };
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<
    { id: string; name: string; online?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [errorParticipants, setErrorParticipants] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<
    { id: string; userId: string; content: string; createdAt: string }[]
  >([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchRoom();
    fetchParticipants();
    // eslint-disable-next-line
  }, [params.id]);

  useEffect(() => {
    if (room && room.chat && room.chat.route) {
      fetchMessages(room.chat.route + "/messages");
    }
    // eslint-disable-next-line
  }, [room?.chat?.route]);

  // Socket.io: escuchar nuevos mensajes y presencia en tiempo real
  useChatSocket(
    room?.roomId,
    room?.chat?.id,
    (msg: any) => {
      setMessages((prev) => {
        // Evitar duplicados si el backend reenvía el historial
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    },
    (data: {
      participants: { id: string; name: string; online?: boolean }[];
    }) => {
      console.log("[SOCKET] Evento room:presence recibido", data);
      setParticipants(
        data.participants.map((p) => ({ ...p, online: p.online ?? false })),
      );
    },
  );
  // Hook de debug para ver eventos socket en consola
  useSocketDebug(room?.chat?.id);

  const fetchMessages = async (chatMessagesRoute: string) => {
    setLoadingMessages(true);
    setErrorMessages(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessages("You must be logged in to view messages.");
        setMessages([]);
        setLoadingMessages(false);
        return;
      }
      // chatMessagesRoute is like /api/chats/{id}/messages, so build full URL
      const url = `http://localhost:3001${chatMessagesRoute}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await res.json();
      setMessages(data);
    } catch (err: any) {
      setErrorMessages(err.message || "Error loading messages");
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view this room.");
        setLoading(false);
        return;
      }
      const res = await fetch(`http://localhost:3001/api/rooms/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch room");
      }
      const data = await res.json();
      setRoom(data);
    } catch (err: any) {
      setError(err.message || "Error loading room");
      setRoom(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipants = async () => {
    setLoadingParticipants(true);
    setErrorParticipants(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorParticipants("You must be logged in to view participants.");
        setParticipants([]);
        setLoadingParticipants(false);
        return;
      }
      const res = await fetch(
        `http://localhost:3001/api/rooms/${params.id}/participants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch participants");
      }
      const data = await res.json();
      setParticipants(data);
    } catch (err: any) {
      setErrorParticipants(err.message || "Error loading participants");
      setParticipants([]);
    } finally {
      setLoadingParticipants(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <button
          className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
          onClick={() => router.push("/rooms")}
        >
          ← Back to rooms
        </button>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4">Loading room...</p>
          </div>
        )}
        {!loading && room && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold text-white mb-4">{room.name}</h1>
            <p className="text-gray-300 mb-2">{room.description}</p>
            <p className="text-gray-400 text-xs mb-4">Room ID: {room.roomId}</p>
            <div className="mt-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Participants
              </h2>
              {loadingParticipants && (
                <div className="text-gray-300">Loading participants...</div>
              )}
              {errorParticipants && (
                <div className="text-red-400 mb-2">{errorParticipants}</div>
              )}
              {!loadingParticipants &&
                !errorParticipants &&
                participants.length === 0 && (
                  <div className="text-gray-400">No participants</div>
                )}
              {!loadingParticipants && participants.length > 0 && (
                <ParticipantsList
                  participants={participants.map((p) => ({
                    ...p,
                    online: !!p.online,
                  }))}
                  currentUserId={
                    typeof window !== "undefined"
                      ? localStorage.getItem("userId") || ""
                      : ""
                  }
                />
              )}
            </div>
            {room.chat && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-2">Chat</h2>
                <p className="text-gray-400 text-xs mb-2">
                  Chat ID: {room.chat.id}
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  Chat route: {room.chat.route}
                </p>
                <div className="bg-black/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Messages
                  </h3>
                  {loadingMessages && (
                    <div className="text-gray-300">Loading messages...</div>
                  )}
                  {errorMessages && (
                    <div className="text-red-400 mb-2">{errorMessages}</div>
                  )}
                  {!loadingMessages &&
                    !errorMessages &&
                    messages.length === 0 && (
                      <div className="text-gray-400">No messages</div>
                    )}
                  {!loadingMessages && messages.length > 0 && (
                    <ul className="space-y-2">
                      {messages.map((msg) => {
                        const user = participants.find(
                          (p) => p.id === msg.userId,
                        );
                        return (
                          <li key={msg.id}>
                            <Message
                              content={msg.content}
                              createdAt={msg.createdAt}
                              userName={user ? user.name : msg.userId}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <form
                    className="mt-4 flex gap-2"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!newMessage.trim() || !room?.chat?.route) return;
                      setSending(true);
                      setSendError(null);
                      try {
                        const token = localStorage.getItem("token");
                        if (!token) {
                          setSendError(
                            "You must be logged in to send messages.",
                          );
                          setSending(false);
                          return;
                        }
                        const url = `http://localhost:3001${room.chat.route}/messages`;
                        const res = await fetch(url, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ content: newMessage }),
                        });
                        if (!res.ok) {
                          throw new Error("Failed to send message");
                        }
                        setNewMessage("");
                        // Refrescar mensajes
                        fetchMessages(room.chat.route + "/messages");
                      } catch (err: any) {
                        setSendError(err.message || "Error sending message");
                      } finally {
                        setSending(false);
                      }
                    }}
                  >
                    <input
                      type="text"
                      className="flex-1 rounded px-3 py-2 text-black"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={sending}
                    />
                    <button
                      type="submit"
                      className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded disabled:opacity-50"
                      disabled={sending || !newMessage.trim()}
                    >
                      {sending ? "Sending..." : "Send"}
                    </button>
                  </form>
                  {sendError && (
                    <div className="text-red-400 mt-2">{sendError}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
