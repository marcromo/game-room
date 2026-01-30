import React from "react";

interface MessageProps {
  content: string;
  createdAt: string;
  userName: string;
}

export default function Message({
  content,
  createdAt,
  userName,
}: MessageProps) {
  // Formatear la hora a HH:MM
  const date = new Date(createdAt);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const time = `${hour}:${minute}`;

  return (
    <div className="border rounded p-2 mb-2 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-sm">{userName}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="text-gray-800">{content}</div>
    </div>
  );
}
