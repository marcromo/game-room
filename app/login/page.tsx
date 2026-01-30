"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiService } from "@/lib/api";

type LoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
  };
  token: string;
};

const USER_PASSWORD = "password123";

const SEED_USERS = [
  {
    key: "ADMIN",
    email: "admin@example.com",
    name: "Admin User",
  },
  {
    key: "JOHN_DOE",
    email: "john.doe@example.com",
    name: "John Doe",
  },
  {
    key: "JANE_SMITH",
    email: "jane.smith@example.com",
    name: "Jane Smith",
  },
  {
    key: "ALICE_WONDERLAND",
    email: "alice.wonderland@example.com",
    name: "Alice Wonderland",
  },
  {
    key: "BOB_BUILDER",
    email: "bob.builder@example.com",
    name: "Bob Builder",
  },
  {
    key: "CHARLIE_CHAPLIN",
    email: "charlie.chaplin@example.com",
    name: "Charlie Chaplin",
  },
  {
    key: "DIANA_PRINCE",
    email: "diana.prince@example.com",
    name: "Diana Prince",
  },
  {
    key: "EDWARD_SNOWDEN",
    email: "edward.snowden@example.com",
    name: "Edward Snowden",
  },
  {
    key: "FRANK_UNDERWOOD",
    email: "frank.underwood@example.com",
    name: "Frank Underwood",
  },
  {
    key: "GRACE_HOPPER",
    email: "grace.hopper@example.com",
    name: "Grace Hopper",
  },
  {
    key: "HARRY_POTTER",
    email: "harry.potter@example.com",
    name: "Harry Potter",
  },
  {
    key: "IRENE_ADLER",
    email: "irene.adler@example.com",
    name: "Irene Adler",
  },
  {
    key: "JACK_SPARROW",
    email: "jack.sparrow@example.com",
    name: "Jack Sparrow",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState(SEED_USERS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (user: (typeof SEED_USERS)[0]) => {
    setLoading(true);
    setError("");
    try {
      const response = await apiService.post<LoginResponse>("/auth/login", {
        email: user.email,
        password: USER_PASSWORD,
      });
      if (response && response.token && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("userId", response.user.id); // Para socket y presencia
        localStorage.setItem("token", response.token);
        router.push("/");
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Iniciar sesión
        </h1>
        <p className="text-gray-300 mb-4 text-center">
          Selecciona un usuario para simular el login:
        </p>
        <div className="grid grid-cols-1 gap-3 mb-6">
          {SEED_USERS.map((user) => (
            <button
              key={user.key}
              onClick={() => handleLogin(user)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60"
              disabled={loading}
            >
              {user.name}{" "}
              <span className="text-xs text-gray-200">({user.email})</span>
            </button>
          ))}
        </div>

        {error && <div className="text-red-400 text-center mt-2">{error}</div>}
      </div>
    </div>
  );
}
