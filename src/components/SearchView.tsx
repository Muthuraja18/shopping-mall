import { useState } from 'react';
import { STORES } from '../data';
import { Store } from '../types';
import { Search, MapPin, Sparkles, X } from 'lucide-react';

interface SearchViewProps {
  onSelectStore: (store: Store) => void;
  onOpenConcierge: (initialPrompt?: string) => void;
  selectedCategory: 'Fashion' | 'Tech' | 'Dining' | 'Beauty' | 'All';
  onSelectCategory: (category: 'Fashion' | 'Tech' | 'Dining' | 'Beauty' | 'All') => void;
}

export default function SearchView({
  onSelectStore,
  onOpenConcierge,
  selectedCategory,
  onSelectCategory,
}: SearchViewProps) {
  const [query, setQuery] = useState('');

  const trendingSearches = [
    'Gucci Trunk Show',
    'Vision Pro Fit Room',
    'Tesla Test Drive',
    'Michelin-starred Pastry',
    'Chanel Fragrance',
  ];

  const categories: ('All' | 'Fashion' | 'Tech' | 'Dining' | 'Beauty')[] = [
    'All',
    'Fashion',
    'Tech',
    'Dining',
    'Beauty',
  ];

  // Filtering Logic
  const filteredStores = STORES.filter((store) => {
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    const matchesQuery =
      store.name.toLowerCase().includes(query.toLowerCase()) ||
      store.tagline.toLowerCase().includes(query.toLowerCase()) ||
      store.description.toLowerCase().includes(query.toLowerCase()) ||
      store.amenities.some((a) => a.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div id="search-view" className="w-full px-5 py-3">
      {/* Dynamic Search Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">Explore the Mall</h1>
        <p className="text-neutral-500 text-xs">Search our luxury directory or consult the AI Concierge.</p>
      </div>

      {/* Luxury Search Bar */}
      <div className="relative flex items-center mb-6">
        <Search className="absolute left-4 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brands, amenities, collections..."
          className="w-full pl-11 pr-10 py-3.5 bg-neutral-100 hover:bg-neutral-200/50 focus:bg-white focus:ring-1 focus:ring-black rounded-xl text-sm transition-all duration-200 border-none outline-none font-light"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full text-neutral-400 hover:text-black"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Panel grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left/Middle: Results list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Directory Results ({filteredStores.length})
            </h2>
          </div>

          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => onSelectStore(store)}
                  className="flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                >
                  <div className="h-40 overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${store.coverImage})` }}
                    />
                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] text-white tracking-widest uppercase font-medium">
                      {store.category}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-black">
                        {store.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-light mt-0.5">{store.tagline}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 text-[11px] text-neutral-400 font-light">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{store.floor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-neutral-100">
              <p className="text-neutral-400 text-sm font-light">No boutiques matching "{query}" found.</p>
              <button
                onClick={() => onOpenConcierge(query ? `Where is ${query}?` : undefined)}
                className="mt-4 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-medium rounded-xl transition-all"
              >
                Ask Concierge instead
              </button>
            </div>
          )}
        </div>

        {/* Right side: Sidebar with trending topics and AI card */}
        <div className="space-y-6">
          {/* AI Helper Card */}
          <div className="p-6 bg-neutral-950 text-white rounded-2xl border border-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-800 rounded-full -mr-10 -mt-10 blur-3xl opacity-50" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-semibold">
                  AI Personal Shopper
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Looking for a specific style?</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
                Our AI Concierge can suggest tailored outfits, recommend boutiques by price or aesthetic, and reserve personal styling spaces.
              </p>
              <button
                onClick={() => onOpenConcierge()}
                className="w-full py-2.5 bg-white text-black hover:bg-neutral-100 active:scale-95 transition-all text-xs font-semibold rounded-xl"
              >
                Launch AI Concierge
              </button>
            </div>
          </div>

          {/* Trending Searches */}
          <div className="p-6 bg-white border border-neutral-100 rounded-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Trending Experiences
            </h3>
            <div className="space-y-2.5">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    onOpenConcierge(`Tell me about ${term}`);
                  }}
                  className="w-full text-left flex items-center justify-between text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 py-1.5 px-2.5 -mx-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span className="font-light">{term}</span>
                  <Sparkles className="w-3 h-3 text-amber-500 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
