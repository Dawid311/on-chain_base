'use client';

export default function LiveTab() {
  const upcomingShows = [
    { id: 1, date: "Dec 15, 2024", venue: "Madison Square Garden", city: "New York", time: "8:00 PM" },
    { id: 2, date: "Dec 22, 2024", venue: "O2 Arena", city: "London", time: "7:30 PM" },
    { id: 3, date: "Jan 5, 2025", venue: "Tokyo Dome", city: "Tokyo", time: "6:00 PM" },
    { id: 4, date: "Jan 12, 2025", venue: "Sydney Opera House", city: "Sydney", time: "8:00 PM" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">Live Performances</h2>
        
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-6 mb-8 text-center">
          <h3 className="text-2xl font-bold mb-2 text-white">🔴 LIVE NOW</h3>
          <p className="text-xl text-purple-100">Virtual Concert - Faith World Tour</p>
          <button className="mt-4 bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg hover:bg-purple-100 transition-colors">
            Join Live Stream
          </button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Upcoming Shows</h3>
          {upcomingShows.map((show) => (
            <div key={show.id} className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-purple-500 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-semibold text-white">{show.venue}</h4>
                  <p className="text-purple-300">{show.city}</p>
                  <p className="text-zinc-400 text-sm mt-1">{show.date} at {show.time}</p>
                </div>
                <div className="text-right">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Get Tickets
                  </button>
                  <p className="text-zinc-400 text-sm mt-2">Limited seats</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center bg-zinc-800 rounded-xl p-6 border border-zinc-700">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">VIP Experience</h3>
          <p className="text-zinc-300 mb-4">Get exclusive backstage access, meet & greet, and limited edition merchandise.</p>
          <button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Upgrade to VIP
          </button>
        </div>
      </div>
    </div>
  );
}
