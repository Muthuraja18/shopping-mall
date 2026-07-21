import { motion } from 'motion/react';
import { CATEGORIES, HERO_IMAGE, STORES } from '../data';
import { Store } from '../types';
import { ChevronRight, Sparkles, ArrowRight, Star, Quote } from 'lucide-react';

export type InfoPageType = 'privacy' | 'terms' | 'contact' | 'sustainability';

interface HomeViewProps {
  onSelectStore: (store: Store) => void;
  onSelectCategory: (category: 'Fashion' | 'Tech' | 'Dining' | 'Beauty') => void;
  onJoinMembership: () => void;
  onOpenConcierge: () => void;
  isMember: boolean;
  onSwitchTab: (tab: 'home' | 'search' | 'stores' | 'profile') => void;
  onNavigateInfo: (page: InfoPageType) => void;
}

const testimonials = [
  {
    quote: 'The AI concierge found me a private fitting slot at Gucci in under a minute.',
    name: 'Ananya R.',
    tier: 'Inner Circle',
  },
  {
    quote: 'Booking valet and lounge access before I arrive has changed how I shop.',
    name: 'Kabir M.',
    tier: 'Prestige',
  },
  {
    quote: 'Indoor navigation actually works — no more wandering three floors for one store.',
    name: 'Divya S.',
    tier: 'Elite',
  },
];

export default function HomeView({
  onSelectStore,
  onSelectCategory,
  onJoinMembership,
  onOpenConcierge,
  isMember,
  onSwitchTab,
  onNavigateInfo,
}: HomeViewProps) {
  // We showcase the spotlights: Apple Store, Gucci, Tesla
  const spotlights = STORES.filter(s => ['apple', 'gucci', 'tesla'].includes(s.id));

  return (
    <div id="home-view" className="w-full">
      {/* Limited-time promo banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4">
        <p className="text-center text-[10px] sm:text-xs text-amber-700 font-medium tracking-wide">
          ✦ Fall Couture Trunk Show at Gucci — July 25, 2026 — Inner Circle members get priority RSVP
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-5 pt-3">
        <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] lg:h-[680px] rounded-[24px] sm:rounded-[32px] overflow-hidden group shadow-lg">
          {/* Background Image with Scale Zoom Hover Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Interactive Floating AI Assistant CTA */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <button
              onClick={onOpenConcierge}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md rounded-full text-white text-[10px] sm:text-xs font-medium tracking-wide border border-white/20 shadow-lg"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-pulse" />
              <span>Ask AI Concierge</span>
            </button>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-6 sm:bottom-10 left-5 right-5 sm:left-8 sm:right-8 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3 sm:mb-4 max-w-xs sm:max-w-sm md:max-w-md leading-tight">
                The Future of Retail
              </h1>
              <p className="text-white/70 text-xs sm:text-sm max-w-[280px] sm:max-w-xs md:max-w-sm mb-5 sm:mb-6 font-light">
                An architectural masterwork blending prestige boutiques, digital innovations, and concierge shopping.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSwitchTab('stores')}
                  className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm hover:bg-neutral-100 transition-colors duration-200 shadow-md cursor-pointer"
                >
                  Discover
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenConcierge}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm backdrop-blur-md transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  Plan Your Visit
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mt-10 sm:mt-12">
        <div className="px-4 sm:px-5 flex justify-between items-center mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">Categories</h2>
          <button
            onClick={() => onSwitchTab('stores')}
            className="text-neutral-500 hover:text-black font-medium text-[10px] sm:text-xs tracking-wider uppercase flex items-center gap-0.5 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Categories Horizontal Carousel */}
        <div className="flex overflow-x-auto gap-4 sm:gap-6 px-4 sm:px-5 no-scrollbar pb-2">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onSelectCategory(cat.name as any)}
              className="flex-shrink-0 w-24 sm:w-28 group cursor-pointer text-center"
            >
              <div className="w-full aspect-square rounded-full bg-neutral-100 overflow-hidden mb-2.5 sm:mb-3 transition-all duration-500 group-hover:shadow-md group-hover:scale-[1.03] relative border border-neutral-200/50">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <p className="font-medium text-[10px] sm:text-xs tracking-wider uppercase text-neutral-800 group-hover:text-black transition-colors">
                {cat.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Store Spotlight */}
      <section className="mt-12 sm:mt-14 px-4 sm:px-5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight mb-5 sm:mb-6">Store Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {spotlights.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => onSelectStore(store)}
              className="relative w-full h-56 sm:h-64 rounded-[22px] sm:rounded-[28px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Cover Image */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                style={{ backgroundImage: `url(${store.coverImage})` }}
              />
              {/* Subtle Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300" />

              {/* Glass Header Info */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white font-medium">
                  {store.floor.split(',')[0]}
                </span>
              </div>

              {/* Bottom text info */}
              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 text-white">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">{store.name}</h3>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/80 font-light mt-0.5">
                  {store.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="mt-12 sm:mt-14 px-4 sm:px-5">
        <div className="flex items-center gap-2 mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">Loved by Members</h2>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm flex flex-col"
            >
              <Quote className="w-4 h-4 text-amber-500/70 mb-3" />
              <p className="text-xs text-neutral-600 font-light leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900">{t.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">{t.tier}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Luxe Membership Card Card Section */}
      <section className="mt-12 sm:mt-14 px-4 sm:px-5">
        <div className="w-full p-6 sm:p-8 md:p-10 rounded-[22px] sm:rounded-[28px] bg-neutral-950 text-white shadow-xl relative overflow-hidden border border-neutral-800">
          {/* Subtle Ambient light gradients in background */}
          <div className="absolute top-0 right-0 w-56 sm:w-72 h-56 sm:h-72 bg-neutral-800 rounded-full -mr-16 sm:-mr-24 -mt-16 sm:-mt-24 blur-[80px] sm:blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute -bottom-16 sm:-bottom-24 -left-16 sm:-left-24 w-56 sm:w-72 h-56 sm:h-72 bg-stone-800 rounded-full blur-[80px] sm:blur-[100px] opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
            <div className="max-w-md">
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase border border-white/20 px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4 inline-block text-neutral-300 font-medium">
                MEMBER ONLY
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight mb-2.5 sm:mb-3">
                Luxe Membership
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                Unlock complimentary valet parking, bespoke personal shopping consulting, private trunk show invitations, and exclusive early access to new collections.
              </p>
            </div>
            <div className="flex-shrink-0">
              {isMember ? (
                <button
                  onClick={() => onSwitchTab('profile')}
                  className="w-full md:w-auto bg-white hover:bg-neutral-100 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-xs sm:text-sm active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  View Member Pass
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              ) : (
                <button
                  onClick={onJoinMembership}
                  className="w-full md:w-auto bg-white hover:bg-neutral-100 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-xs sm:text-sm active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Join the Inner Circle
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 sm:py-12 px-4 sm:px-5 bg-neutral-50 border-t border-neutral-200/60 flex flex-col items-center gap-5 sm:gap-6 text-center mt-14 sm:mt-16 rounded-t-[24px] sm:rounded-t-[32px]">
        <div className="font-sans text-base sm:text-lg font-bold tracking-widest text-neutral-900 uppercase">
          LUXE MALL
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
          <button
            onClick={() => onNavigateInfo('privacy')}
            className="text-neutral-500 hover:text-neutral-900 text-[11px] sm:text-xs font-light transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-neutral-300 text-[11px] sm:text-xs">|</span>
          <button
            onClick={() => onNavigateInfo('terms')}
            className="text-neutral-500 hover:text-neutral-900 text-[11px] sm:text-xs font-light transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <span className="text-neutral-300 text-[11px] sm:text-xs">|</span>
          <button
            onClick={() => onNavigateInfo('contact')}
            className="text-neutral-500 hover:text-neutral-900 text-[11px] sm:text-xs font-light transition-colors cursor-pointer"
          >
            Contact Us
          </button>
          <span className="text-neutral-300 text-[11px] sm:text-xs">|</span>
          <button
            onClick={() => onNavigateInfo('sustainability')}
            className="text-neutral-500 hover:text-neutral-900 text-[11px] sm:text-xs font-light transition-colors cursor-pointer"
          >
            Sustainability
          </button>
        </div>
        <p className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest mt-2 font-mono">
          &copy; 2026 LUXE MALL. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
