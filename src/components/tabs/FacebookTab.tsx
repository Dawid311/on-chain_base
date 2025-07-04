'use client';

export default function FacebookTab() {
  const posts = [
    { 
      id: 1, 
      type: "status", 
      content: "Excited to announce my new album 'Faith Rising' coming this winter! Thank you all for your continued support. 🎵❤️",
      time: "2 hours ago",
      likes: 342,
      comments: 58,
      shares: 23
    },
    { 
      id: 2, 
      type: "photo", 
      content: "Studio session today! Working on something magical ✨",
      time: "1 day ago",
      likes: 567,
      comments: 89,
      shares: 34
    },
    { 
      id: 3, 
      type: "video", 
      content: "Behind the scenes of my latest music video. Can't wait for you all to see it!",
      time: "3 days ago",
      likes: 823,
      comments: 156,
      shares: 67
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Facebook</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-3xl">
              👨‍🎤
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">Dawid Faith</h3>
              <p className="text-zinc-400">Musician & Performer</p>
              <p className="text-blue-400">45K followers • 2.1K friends</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Follow on Facebook
          </button>
        </div>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-blue-500 transition-colors">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl">
                  👨‍🎤
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Dawid Faith</h3>
                  <p className="text-zinc-400 text-sm">{post.time}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-white">{post.content}</p>
                {post.type === "photo" && (
                  <div className="mt-3 aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-4xl">
                    📸
                  </div>
                )}
                {post.type === "video" && (
                  <div className="mt-3 aspect-video bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-4xl relative">
                    🎬
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-2xl hover:bg-opacity-100 transition-colors">
                        ▶️
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
                <button className="flex items-center space-x-2 text-zinc-400 hover:text-blue-400 transition-colors">
                  <span>👍</span>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-zinc-400 hover:text-blue-400 transition-colors">
                  <span>💬</span>
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-zinc-400 hover:text-blue-400 transition-colors">
                  <span>↗️</span>
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">Upcoming Event</h3>
          <p className="text-blue-100 mb-4">Join me for a live Q&A session this Friday at 8 PM EST!</p>
          <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors">
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
