import React, { useState, FormEvent } from 'react';
import { LuxeMember, Booking } from '../types';
import { Sparkles, Calendar, Clock, MapPin, Award, Trash2, CheckCircle2, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileViewProps {
  member: LuxeMember | null;
  onRegister: (name: string, email: string, phone: string) => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function ProfileView({
  member,
  onRegister,
  bookings,
  onCancelBooking,
}: ProfileViewProps) {
  // Registration States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormError('All fields are required to secure membership.');
      return;
    }
    setFormError('');
    onRegister(name, email, phone);
  };

  // If not a registered member, show the elite Join Form
  if (!member) {
    return (
      <div id="profile-view-unregistered" className="w-full max-w-lg mx-auto px-5 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-neutral-100 rounded-[32px] p-8 shadow-sm"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-neutral-950 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">LUXE INNER CIRCLE</h1>
            <p className="text-neutral-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">
              Register to access premium amenities, priority bookings, and our dedicated AI personal shopper.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lord / Lady..."
                className="w-full px-4 py-3 bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-black rounded-xl text-sm border-none outline-none font-light"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@exclusive.com"
                className="w-full px-4 py-3 bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-black rounded-xl text-sm border-none outline-none font-light"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-black rounded-xl text-sm border-none outline-none font-light"
              />
            </div>

            {formError && (
              <p className="text-red-600 text-xs font-light text-center">{formError}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-black hover:bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase rounded-xl active:scale-[0.98] transition-all duration-200 mt-6 cursor-pointer"
            >
              Secure Luxe Membership
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // If registered member, show the elite dashboard
  return (
    <div id="profile-view-dashboard" className="w-full px-5 py-3 max-w-4xl mx-auto space-y-10">
      {/* Dynamic Member Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full aspect-[1.58/1] max-w-md mx-auto rounded-3xl overflow-hidden p-6 text-white shadow-xl bg-gradient-to-br from-neutral-900 via-stone-900 to-black border border-neutral-800 flex flex-col justify-between"
      >
        {/* Subtle holographic mesh in background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-800 rounded-full -mr-16 -mt-16 blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-stone-800 rounded-full blur-3xl opacity-30 pointer-events-none" />

        {/* Card Header */}
        <div className="flex justify-between items-start z-10">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">
              VIP Digital Pass
            </span>
            <span className="text-lg font-bold tracking-widest uppercase mt-1 block">LUXE</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold bg-amber-500/5">
              {member.tier}
            </span>
            <span className="text-[8px] text-neutral-400 mt-1 font-mono">{member.cardId}</span>
          </div>
        </div>

        {/* Card Middle: QR Code display & Chip details */}
        <div className="flex justify-between items-center my-4 z-10">
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-widest text-neutral-400 font-light block">
              Luxe Points Balance
            </span>
            <span className="text-2xl font-semibold tracking-tight">{member.points.toLocaleString()} PTS</span>
          </div>
          {/* Mock Interactive QR code click-to-scan */}
          <div className="bg-white p-2.5 rounded-xl border border-white/10 shadow-lg">
            <QrCode className="w-10 h-10 text-black" />
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-end z-10">
          <div>
            <span className="text-[8px] uppercase tracking-widest text-neutral-400 font-light block">
              Cardholder
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase mt-1 block">
              {member.name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] uppercase tracking-widest text-neutral-400 font-light block">
              Member Since
            </span>
            <span className="text-xs font-semibold mt-1 block font-mono">
              {member.memberSince}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tier Progress bar details */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-semibold tracking-tight">Tier Progress</h3>
            <p className="text-neutral-500 text-xs">Unlock Prestige tier at 10,000 Points.</p>
          </div>
          <span className="text-xs font-semibold uppercase text-amber-500 font-mono">
            {Math.round((member.points / 10000) * 100)}%
          </span>
        </div>
        <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-black h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (member.points / 10000) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-3 text-[10px] text-neutral-400 tracking-wider">
          <span>SIGNATURE</span>
          <span>ELITE</span>
          <span>PRESTIGE</span>
          <span>INNER CIRCLE</span>
        </div>
      </div>

      {/* Main Reservation panel grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Active bookings list */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
            Active Reservations ({bookings.length})
          </h2>

          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-neutral-100 text-neutral-800 text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-md">
                        {booking.type.replace('_', ' ')}
                      </span>
                      {booking.status === 'confirmed' && (
                        <span className="flex items-center gap-0.5 text-green-600 text-[10px] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirmed</span>
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900">
                        {booking.storeName || 'Luxe Valet Terminal'}
                      </h4>
                      {booking.notes && (
                        <p className="text-xs text-neutral-400 font-light mt-0.5">
                          Note: "{booking.notes}"
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 font-light">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-neutral-400" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-neutral-400" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all self-end sm:self-center cursor-pointer"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white border border-neutral-100 rounded-2xl">
              <p className="text-neutral-400 text-xs font-light">No active reservations.</p>
              <p className="text-neutral-400 text-[10px] font-light mt-1">
                Book a private styling suite or valet pickup from boutique options.
              </p>
            </div>
          )}
        </div>

        {/* Member Benefits sidebar panel */}
        <div className="p-6 bg-white border border-neutral-100 rounded-2xl space-y-6 self-start">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Tier Benefits
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Complimentary Valet Parking</h4>
                <p className="text-[10px] text-neutral-500 font-light mt-0.5">
                  Present your ticket or code <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[9px]">{member.valetCode}</code> to the valet concierge.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-neutral-100 text-black rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Priority Reservations</h4>
                <p className="text-[10px] text-neutral-500 font-light mt-0.5">
                  Gain instant confirmation for private fitting salon suites and chef's tables.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Complimentary Champagne</h4>
                <p className="text-[10px] text-neutral-500 font-light mt-0.5">
                  Redeem complimentary refreshments at Gucci or Le Luxe Bistro on reservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
