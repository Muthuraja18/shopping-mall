import React, { useState, FormEvent } from 'react';
import { Store, BookingType } from '../types';
import { X, MapPin, Clock, Phone, Globe, Calendar, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoreModalProps {
  store: Store | null;
  onClose: () => void;
  onBook: (type: BookingType, date: string, time: string, notes?: string) => void;
}

export default function StoreModal({ store, onClose, onBook }: StoreModalProps) {
  // Booking Form State
  const [selectedType, setSelectedType] = useState<BookingType>('personal_shopper');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!store) return null;

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Please select both a date and preferred time slot.');
      return;
    }
    setError('');
    onBook(selectedType, date, time, notes);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setDate('');
      setTime('');
      setNotes('');
    }, 3000);
  };

  const experienceTypes: { type: BookingType; label: string; description: string }[] = [
    {
      type: 'personal_shopper',
      label: 'Personal Shopper Consultant',
      description: 'A dedicated shopping stylist curated to your size and aesthetic preferences.',
    },
    {
      type: 'private_fitting',
      label: 'VIP Private Fitting Salon',
      description: 'Reserve our private master suite equipped with full bar and soft lighting.',
    },
    {
      type: 'champagne_service',
      label: 'Vintage Champagne & Caviar Service',
      description: 'Have premium vintage champagne served to you while browsings are prepared.',
    },
    {
      type: 'lounge_access',
      label: 'Elite Lounge Access',
      description: 'Complimentary pass to our member-only sanctuary with fine refreshments.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative bg-white rounded-[32px] w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl z-10 border border-neutral-100"
        >
          {/* Top Banner with cover image */}
          <div className="relative h-64 flex-shrink-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${store.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Close Button overlay */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Store title in banner */}
            <div className="absolute bottom-6 left-8 right-8 text-white">
              <span className="text-[10px] tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full mb-3 inline-block font-semibold bg-white/10 backdrop-blur-xs">
                {store.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{store.name}</h1>
              <p className="text-xs text-white/80 font-light mt-1">{store.tagline}</p>
            </div>
          </div>

          {/* Modal Content - Scrollable Grid */}
          <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 no-scrollbar bg-neutral-50/30">
            {/* Left Column (2 cols): Details & Products */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Boutique */}
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  About the Boutique
                </h2>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {store.description}
                </p>
              </div>

              {/* Store Logistics List */}
              <div className="grid grid-cols-2 gap-4 bg-white border border-neutral-100 p-4 rounded-2xl">
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                  <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span>{store.floor}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                  <Clock className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span>{store.hours}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                  <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                  <Globe className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <a
                    href={store.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-black transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              </div>

              {/* Exclusive Collection items showcase */}
              <div className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  Exclusive Collections
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {store.exclusiveItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-neutral-100 rounded-2xl p-4 flex gap-4 hover:shadow-sm transition-all"
                    >
                      <div className="w-20 h-20 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0 relative border border-neutral-100">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-semibold text-neutral-900 leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-neutral-400 font-light mt-0.5 leading-snug line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-neutral-900 font-mono mt-2 block">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events Box */}
              {store.events.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Boutique Special Events
                  </h2>
                  <div className="space-y-3">
                    {store.events.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-5 bg-neutral-950 text-white rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-neutral-800"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-semibold text-white">{ev.title}</h4>
                          <p className="text-[10px] text-neutral-400 font-light">{ev.description}</p>
                          <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono pt-1">
                            <span>{ev.date}</span>
                            <span>•</span>
                            <span>{ev.time}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onBook('private_fitting', ev.date, ev.time, `RSVP: ${ev.title}`)}
                          className="px-4 py-2 bg-white text-black hover:bg-neutral-100 text-[10px] font-semibold tracking-wider uppercase rounded-lg active:scale-95 transition-all self-end sm:self-center cursor-pointer"
                        >
                          RSVP Pass
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (1 col): Bespoke Experience Booking Form */}
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl space-y-6 self-start shadow-sm">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                  Experience Booking
                </h3>
                <p className="text-[10px] text-neutral-500 font-light">
                  Reserve a premium service room or consultation slot.
                </p>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-3 bg-green-500/5 border border-green-500/20 rounded-xl"
                >
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-semibold text-green-800">Reservation Confirmed!</h4>
                  <p className="text-[10px] text-green-600 max-w-[180px] font-light leading-relaxed">
                    Check your profile dashboard for slot barcode details.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                      Service Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as BookingType)}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-lg text-xs outline-none cursor-pointer"
                    >
                      {experienceTypes.map((exp) => (
                        <option key={exp.type} value={exp.type}>
                          {exp.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-lg text-xs outline-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                      Select Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-lg text-xs outline-none cursor-pointer"
                    >
                      <option value="">Choose slot...</option>
                      <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                      <option value="1:30 PM">1:30 PM - 2:30 PM</option>
                      <option value="3:00 PM">3:00 PM - 4:00 PM</option>
                      <option value="5:30 PM">5:30 PM - 6:30 PM</option>
                      <option value="7:00 PM">7:00 PM - 8:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                      Styling Notes / Requests
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special size requests, sizing, beverage preferences..."
                      rows={3}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-lg text-xs outline-none resize-none font-light"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-light">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-black hover:bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase rounded-lg active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Confirm Experience
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
