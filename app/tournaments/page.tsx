"use client";

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🏆 Torneos</h1>
          <p className="text-gray-300">Competiciones y eventos</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-white mb-4">Próximamente</h2>
          <p className="text-gray-300 mb-6">
            La sección de torneos estará disponible pronto. Podrás crear y
            participar en competiciones épicas.
          </p>
          <div className="flex gap-4 justify-center">
            <div className="bg-purple-600/30 px-6 py-4 rounded-lg">
              <p className="text-white font-bold text-2xl">0</p>
              <p className="text-gray-300 text-sm">Torneos Activos</p>
            </div>
            <div className="bg-blue-600/30 px-6 py-4 rounded-lg">
              <p className="text-white font-bold text-2xl">0</p>
              <p className="text-gray-300 text-sm">Participantes</p>
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
