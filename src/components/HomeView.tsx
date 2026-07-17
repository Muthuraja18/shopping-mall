import { motion } from 'motion/react';
import { CATEGORIES, HERO_IMAGE, STORES } from '../data';
import { Store } from '../types';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onSelectStore: (store: Store) => void;
  onSelectCategory: (category: 'Fashion' | 'Tech' | 'Dining' | 'Beauty') => void;
  onJoinMembership: () => void;
  onOpenConcierge: () => void;
  isMember: boolean;
  onSwitchTab: (tab: 'home' | 'search' | 'stores' | 'profile') => void;
}

export default function HomeView({
  onSelectStore,
  onSelectCategory,
  onJoinMembership,
  onOpenConcierge,
  isMember,
  onSwitchTab,
}: HomeViewProps) {
  // We showcase the spotlights: Apple Store, Gucci, Tesla
  const spotlights = STORES.filter(s => ['apple', 'gucci', 'tesla'].includes(s.id));

  return (
    <div id="home-view" className="w-full">
      {/* Hero Section */}
      <section className="relative px-5 pt-3">
        <div className="relative w-full h-[500px] sm:h-[600px] md:h-[680px] rounded-[32px] overflow-hidden group shadow-lg">
          {/* Background Image with Scale Zoom Hover Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Interactive Floating AI Assistant CTA */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={onOpenConcierge}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md rounded-full text-white text-xs font-medium tracking-wide border border-white/20 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Ask AI Concierge</span>
            </button>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-10 left-8 right-8 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-sans text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-4 max-w-sm sm:max-w-md leading-tight">
                The Future of Retail
              </h1>
              <p className="text-white/70 text-sm max-w-xs sm:max-w-sm mb-6 font-light">
                An architectural masterwork blending prestige boutiques, digital innovations, and concierge shopping.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onSwitchTab('stores')}
                  className="bg-white text-black px-8 py-3 rounded-xl font-medium text-sm hover:bg-neutral-100 active:scale-95 transition-all duration-200 shadow-md cursor-pointer"
                >
                  Discover
                </button>
                <button
                  onClick={onOpenConcierge}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white px-6 py-3 rounded-xl font-medium text-sm backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  Plan Your Visit
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mt-12">
        <div className="px-5 flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Categories</h2>
          <button
            onClick={() => onSwitchTab('stores')}
            className="text-neutral-500 hover:text-black font-medium text-xs tracking-wider uppercase flex items-center gap-0.5 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Horizontal Carousel */}
        <div className="flex overflow-x-auto gap-6 px-5 no-scrollbar pb-2">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onSelectCategory(cat.name as any)}
              className="flex-shrink-0 w-28 group cursor-pointer text-center"
            >
              <div className="w-full aspect-square rounded-full bg-neutral-100 overflow-hidden mb-3 transition-all duration-500 group-hover:shadow-md group-hover:scale-[1.03] relative border border-neutral-200/50">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <p className="font-medium text-xs tracking-wider uppercase text-neutral-800 group-hover:text-black transition-colors">
                {cat.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Store Spotlight */}
      <section className="mt-14 px-5">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6">Store Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlights.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => onSelectStore(store)}
              className="relative w-full h-64 rounded-[28px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Cover Image */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                style={{ backgroundImage: `url(${store.coverImage})` }}
              />
              {/* Subtle Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300" />

              {/* Glass Header Info */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="text-[10px] uppercase tracking-widest text-white font-medium">
                  {store.floor.split(',')[0]}
                </span>
              </div>

              {/* Bottom text info */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-semibold tracking-tight">{store.name}</h3>
                <p className="text-[11px] uppercase tracking-wider text-white/80 font-light mt-0.5">
                  {store.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Luxe Membership Card Card Section */}
      <section className="mt-14 px-5">
        <div className="w-full p-8 sm:p-10 rounded-[28px] bg-neutral-950 text-white shadow-xl relative overflow-hidden border border-neutral-800">
          {/* Subtle Ambient light gradients in background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-neutral-800 rounded-full -mr-24 -mt-24 blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-stone-800 rounded-full blur-[100px] opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-md">
              <span className="text-[10px] tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full mb-4 inline-block text-neutral-300 font-medium">
                MEMBER ONLY
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
                Luxe Membership
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Unlock complimentary valet parking, bespoke personal shopping consulting, private trunk show invitations, and exclusive early access to new collections.
              </p>
            </div>
            <div className="flex-shrink-0">
              {isMember ? (
                <button
                  onClick={() => onSwitchTab('profile')}
                  className="w-full md:w-auto bg-white hover:bg-neutral-100 text-black px-8 py-4 rounded-xl font-medium text-sm active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  View Member Pass
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onJoinMembership}
                  className="w-full md:w-auto bg-white hover:bg-neutral-100 text-black px-8 py-4 rounded-xl font-medium text-sm active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Join the Inner Circle
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-5 bg-neutral-50 border-t border-neutral-200/60 flex flex-col items-center gap-6 text-center mt-16 rounded-t-[32px]">
        <div className="font-sans text-lg font-bold tracking-widest text-neutral-900 uppercase">
          LUXE MALL
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <button className="text-neutral-500 hover:text-neutral-900 text-xs font-light transition-colors">
            Privacy Policy
          </button>
          <span className="text-neutral-300 text-xs">|</span>
          <button className="text-neutral-500 hover:text-neutral-900 text-xs font-light transition-colors">
            Terms of Service
          </button>
          <span className="text-neutral-300 text-xs">|</span>
          <button className="text-neutral-500 hover:text-neutral-900 text-xs font-light transition-colors">
            Contact Us
          </button>
          <span className="text-neutral-300 text-xs">|</span>
          <button className="text-neutral-500 hover:text-neutral-900 text-xs font-light transition-colors">
            Sustainability
          </button>
        </div>
        <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2 font-mono">
          &copy; 2026 LUXE MALL. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
