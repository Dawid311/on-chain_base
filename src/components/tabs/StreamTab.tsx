'use client';

export default function StreamTab() {
  const tracks = [
    { id: 1, title: "Faith Rising", artist: "Dawid Faith", duration: "3:45", plays: "1.2M" },
    { id: 2, title: "Believe Again", artist: "Dawid Faith", duration: "4:12", plays: "987K" },
    { id: 3, title: "Higher Ground", artist: "Dawid Faith", duration: "3:28", plays: "756K" },
    { id: 4, title: "Infinite Dreams", artist: "Dawid Faith", duration: "5:03", plays: "634K" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Music Streaming</h2>
        
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 mb-8 text-center">
          <h3 className="text-2xl font-bold mb-2 text-white">Now Playing</h3>
          <p className="text-xl text-green-100">Faith Rising - Dawid Faith</p>
          <div className="w-full bg-green-800 rounded-full h-2 mt-4">
            <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between text-sm text-green-100 mt-2">
            <span>1:42</span>
            <span>3:45</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-300 mb-4">Popular Tracks</h3>
          {tracks.map((track) => (
            <div key={track.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-green-500 transition-colors flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">♪</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{track.title}</h4>
                  <p className="text-zinc-400 text-sm">{track.artist}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-zinc-300">{track.duration}</p>
                <p className="text-zinc-500 text-sm">{track.plays} plays</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors">
            Listen on Spotify
          </button>
        </div>
      </div>
    </div>
  );
}
