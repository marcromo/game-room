import React from "react";

interface Participant {
  id: string;
  name: string;
  online: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
  currentUserId: string;
}

export default function ParticipantsList({
  participants,
  currentUserId,
}: ParticipantsListProps) {
  return (
    <ul className="list-disc pl-6">
      {participants.map((p) => (
        <li
          key={p.id}
          className={`mb-1 transition-opacity ${p.online ? "opacity-100" : "opacity-30"}`}
        >
          <span className={p.id === currentUserId ? "font-bold text-white" : "font-normal"}>
            {p.name}
            {p.id === currentUserId && <span className="ml-2">(you)</span>}
            {p.online && <span className="ml-2 text-green-400 font-semibold">(connected)</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
