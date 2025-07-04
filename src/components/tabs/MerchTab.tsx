'use client';

export default function MerchTab() {
  const merchItems = [
    {
      id: 1,
      name: "Faith T-Shirt",
      price: "$29.99",
      image: "👕",
      description: "Premium cotton t-shirt with Faith logo"
    },
    {
      id: 2,
      name: "Faith Hoodie",
      price: "$49.99",
      image: "🧥",
      description: "Comfortable hoodie for true believers"
    },
    {
      id: 3,
      name: "Faith Cap",
      price: "$19.99",
      image: "🧢",
      description: "Stylish cap with embroidered logo"
    },
    {
      id: 4,
      name: "Faith Mug",
      price: "$14.99",
      image: "☕",
      description: "Start your day with Faith"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Faith Merchandise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {merchItems.map((item) => (
            <div key={item.id} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-green-500 transition-colors">
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">{item.image}</div>
                <h3 className="text-xl font-semibold text-green-300">{item.name}</h3>
                <p className="text-zinc-400 text-sm mt-2">{item.description}</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400 mb-4">{item.price}</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-zinc-400">More items coming soon! Stay tuned for exclusive Faith merchandise.</p>
        </div>
      </div>
    </div>
  );
}
