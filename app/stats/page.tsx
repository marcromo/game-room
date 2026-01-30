"use client";

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            📊 Estadísticas
          </h1>
          <p className="text-gray-300">Métricas y análisis de rendimiento</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-2">🎮</div>
            <p className="text-3xl font-bold text-white mb-1">0</p>
            <p className="text-gray-300">Juegos Totales</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-3xl font-bold text-white mb-1">0</p>
            <p className="text-gray-300">Jugadores Activos</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-2">🏠</div>
            <p className="text-3xl font-bold text-white mb-1">0</p>
            <p className="text-gray-300">Salas Abiertas</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-3xl font-bold text-white mb-1">0</p>
            <p className="text-gray-300">Torneos Activos</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
          <div className="text-6xl mb-4">📈</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Dashboard en Desarrollo
          </h2>
          <p className="text-gray-300">
            Pronto podrás ver gráficos detallados, rankings y estadísticas
            avanzadas de tu rendimiento.
          </p>
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
