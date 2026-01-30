import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Card: Rooms */}
          <Link href="/rooms" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20">
              <div className="text-5xl mb-4">🏠</div>
              <h2 className="text-2xl font-bold text-white mb-2">Rooms</h2>
              <p className="text-gray-300">Create and join game rooms</p>
            </div>
          </Link>
          {/* Card: Friends */}
          <Link href="/players" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20">
              <div className="text-5xl mb-4">👥</div>
              <h2 className="text-2xl font-bold text-white mb-2">Friends</h2>
              <p className="text-gray-300">Manage and find your friends</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
