'use client';

export default function InstagramTab() {
  const posts = [
    { id: 1, image: "🎵", caption: "New track dropping soon! #FaithMusic", likes: "2.3K", comments: "89" },
    { id: 2, image: "🎤", caption: "Studio vibes today ✨", likes: "1.8K", comments: "156" },
    { id: 3, image: "🌟", caption: "Thank you for all the love and support!", likes: "3.1K", comments: "203" },
    { id: 4, image: "🎸", caption: "Working on something special...", likes: "1.5K", comments: "74" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Instagram</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
              👨‍🎤
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">@dawid_faith</h3>
              <p className="text-zinc-400">Musician & Artist</p>
              <p className="text-pink-400">1.2M followers</p>
            </div>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Follow on Instagram
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden hover:border-pink-500 transition-colors">
              <div className="aspect-square bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-4">
                <p className="text-white mb-3">{post.caption}</p>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>❤️ {post.likes} likes</span>
                  <span>💬 {post.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">Latest Story</h3>
          <p className="text-pink-100">Behind the scenes of my latest recording session! 🎵</p>
          <button className="mt-4 bg-white text-pink-600 font-semibold py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors">
            View Story
          </button>
        </div>
      </div>
    </div>
  );
}
