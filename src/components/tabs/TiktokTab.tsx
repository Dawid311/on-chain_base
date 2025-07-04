'use client';

export default function TiktokTab() {
  const videos = [
    { id: 1, title: "Faith Rising - Behind the Scenes", views: "2.1M", likes: "156K", duration: "0:30" },
    { id: 2, title: "Studio Session Vibes", views: "987K", likes: "89K", duration: "0:45" },
    { id: 3, title: "New Song Preview 🎵", views: "1.5M", likes: "234K", duration: "0:15" },
    { id: 4, title: "Meet & Greet Highlights", views: "756K", likes: "67K", duration: "1:00" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">TikTok</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-3xl">
              🎬
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">@dawid_faith</h3>
              <p className="text-zinc-400">Music Creator</p>
              <p className="text-red-400">892K followers</p>
            </div>
          </div>
          <button className="bg-black hover:bg-zinc-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors border border-zinc-700">
            Follow on TikTok
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden hover:border-red-500 transition-colors">
              <div className="aspect-[9/16] bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center relative">
                <div className="text-6xl">🎵</div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-2xl hover:bg-opacity-100 transition-colors">
                    ▶️
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>👀 {video.views}</span>
                  <span>❤️ {video.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center bg-gradient-to-r from-pink-600 to-red-600 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">Trending Now</h3>
          <p className="text-pink-100 mb-4">#FaithChallenge is taking over! Join the movement and show us your moves!</p>
          <button className="bg-white text-red-600 font-semibold py-2 px-6 rounded-lg hover:bg-red-50 transition-colors">
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
