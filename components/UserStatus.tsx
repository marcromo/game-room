"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function UserStatus() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  if (user) {
    return (
      <div className="text-white text-sm px-4 py-2 rounded-lg bg-purple-700/80 inline-block">
        Hola, <span className="font-bold">{user.name || user.email}</span> (
        <span className="font-mono">{user.email}</span>)
      </div>
    );
  }
  return (
    <button
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
      onClick={() => router.push("/login")}
    >
      Iniciar sesión
    </button>
  );
}
