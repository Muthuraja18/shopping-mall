import { useState } from 'react';
import { STORES } from '../data';
import { Store } from '../types';
import { MapPin, Clock, Phone, Globe, ChevronRight, Award } from 'lucide-react';

interface StoresViewProps {
  onSelectStore: (store: Store) => void;
  onBookAmenity: (store: Store) => void;
}

export default function StoresView({ onSelectStore, onBookAmenity }: StoresViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Fashion' | 'Tech' | 'Dining' | 'Beauty'>('All');
  const [selectedFloor, setSelectedFloor] = useState<'All' | 'Floor 1' | 'Floor 2' | 'Floor 3'>('All');

  const categories: ('All' | 'Fashion' | 'Tech' | 'Dining' | 'Beauty')[] = [
    'All',
    'Fashion',
    'Tech',
    'Dining',
    'Beauty',
  ];

  const floors: ('All' | 'Floor 1' | 'Floor 2' | 'Floor 3')[] = [
    'All',
    'Floor 1',
    'Floor 2',
    'Floor 3',
  ];

  // Filtering logic
  const filteredStores = STORES.filter((store) => {
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    const matchesFloor = selectedFloor === 'All' || store.floor.includes(selectedFloor);
    return matchesCategory && matchesFloor;
  });

  return (
    <div id="stores-view" className="w-full px-5 py-3">
      {/* Directory Title */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">Boutiques &amp; Salons</h1>
          <p className="text-neutral-500 text-xs">Curate your shopping itinerary and explore bespoke services.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Floor:</span>
          <div className="flex bg-neutral-100 rounded-lg p-0.5">
            {floors.map((fl) => (
              <button
                key={fl}
                onClick={() => setSelectedFloor(fl)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFloor === fl ? 'bg-white text-black shadow-sm' : 'text-neutral-500 hover:text-black'
                }`}
              >
                {fl === 'All' ? 'All' : fl.replace('Floor ', 'F')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
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

      {/* Stores directory grid / list layout */}
      <div className="space-y-6">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-neutral-100/80 rounded-3xl p-6 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 group"
            >
              {/* Cover Image of Boutique */}
              <div
                onClick={() => onSelectStore(store)}
                className="w-full md:w-80 h-48 md:h-auto aspect-video md:aspect-auto rounded-2xl overflow-hidden cursor-pointer relative flex-shrink-0"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-105"
                  style={{ backgroundImage: `url(${store.coverImage})` }}
                />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white tracking-widest uppercase font-medium">
                  {store.category}
                </div>
              </div>

              {/* Boutique Detailed Metadata */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div onClick={() => onSelectStore(store)} className="cursor-pointer">
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-black flex items-center gap-1.5">
                        {store.name}
                        {store.category === 'Fashion' && (
                          <Award className="w-4 h-4 text-amber-500" />
                        )}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 font-light mt-0.5">
                        {store.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4 line-clamp-2">
                    {store.description}
                  </p>

                  {/* Amenities / Perks chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {store.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-neutral-50 text-neutral-500 border border-neutral-100 px-2 py-0.5 rounded-md text-[10px] tracking-wide"
                      >
                        {amenity}
                      </span>
                    ))}
                    {store.amenities.length > 3 && (
                      <span className="text-[10px] text-neutral-400 font-light self-center">
                        +{store.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom metadata panel & CTAs */}
                <div className="pt-4 border-t border-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-neutral-400 font-light">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{store.floor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onBookAmenity(store)}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200/60 text-neutral-800 text-xs font-medium rounded-xl transition-all cursor-pointer"
                    >
                      Reserve Experience
                    </button>
                    <button
                      onClick={() => onSelectStore(store)}
                      className="px-4 py-2 bg-black hover:bg-neutral-900 text-white text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1 group-hover:gap-1.5"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-100">
            <p className="text-neutral-400 text-sm font-light">No boutiques found matching your selection.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedFloor('All');
              }}
              className="mt-4 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
