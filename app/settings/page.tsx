"use client";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            ⚙️ Configuración
          </h1>
          <p className="text-gray-300">Personaliza tu experiencia</p>
        </div>

        <div className="space-y-6">
          {/* API Configuration */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              🔌 Conexión API
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">URL de la API</label>
                <input
                  type="text"
                  defaultValue={
                    process.env.NEXT_PUBLIC_API_URL ||
                    "http://localhost:3001/api"
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                  disabled
                />
                <p className="text-gray-400 text-sm mt-1">
                  Configura la URL en el archivo .env.local
                </p>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-600/20 rounded-lg border border-green-600/50">
                <span className="text-white">Estado de conexión</span>
                <span className="text-green-400 font-semibold">
                  ● Configurado
                </span>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              🎨 Apariencia
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Tema oscuro</span>
                <div className="bg-purple-600 px-4 py-2 rounded-lg">
                  <span className="text-white">Activado</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Animaciones</span>
                <div className="bg-purple-600 px-4 py-2 rounded-lg">
                  <span className="text-white">Activadas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              🔔 Notificaciones
            </h2>
            <p className="text-gray-300">
              Las notificaciones estarán disponibles en una próxima versión.
            </p>
          </div>

          {/* About */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">ℹ️ Acerca de</h2>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong className="text-white">Versión:</strong> 0.1.0
              </p>
              <p>
                <strong className="text-white">Framework:</strong> Next.js 14
              </p>
              <p>
                <strong className="text-white">Tecnologías:</strong> React,
                TypeScript, Tailwind CSS
              </p>
            </div>
          </div>
        </div>

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
