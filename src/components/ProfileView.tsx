import React, { useState, FormEvent, useEffect } from 'react';
import { LuxeMember, Booking } from '../types';
import { Sparkles, Calendar, Clock, MapPin, Award, Trash2, CheckCircle2, QrCode, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileViewProps {
  member: LuxeMember | null;
  onRegister: (name: string, email: string, phone: string) => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  isAuthLoading: boolean;
  authUser: any;
}

export default function ProfileView({
  member,
  onRegister,
  bookings,
  onCancelBooking,
  onGoogleSignIn,
  onSignOut,
  isAuthLoading,
  authUser,
}: ProfileViewProps) {
  // Registration States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');

  // Prefill from Firebase Auth when logged in
  useEffect(() => {
    if (authUser) {
      setName(authUser.displayName || '');
      setEmail(authUser.email || '');
    }
  }, [authUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormError('All fields are required to secure membership.');
      return;
    }
    setFormError('');
    onRegister(name, email, phone);
  };

  // If Auth loading
  if (isAuthLoading) {
    return (
      <div id="profile-view-loading" className="w-full max-w-lg mx-auto px-5 py-24 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-neutral-500 text-xs mt-4 tracking-widest uppercase">Verifying Credentials...</p>
      </div>
    );
  }

  // If not logged in via Firebase Auth, show Google Sign-In gate
  if (!authUser) {
    return (
      <div id="profile-view-unauthenticated" className="w-full max-w-md mx-auto px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-neutral-100 rounded-[32px] p-8 shadow-sm text-center"
        >
          <div className="w-12 h-12 bg-neutral-950 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight uppercase">LUXE INNER CIRCLE</h1>
          <p className="text-neutral-500 text-xs mt-3 mb-8 leading-relaxed max-w-xs mx-auto">
            Authenticate to unlock your elite digital membership card, track premium bookings, and enjoy our AI-powered concierge services.
          </p>

          <button
            onClick={onGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 text-neutral-800 font-medium text-xs tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.99 1 12 1 7.35 1 3.37 3.65 1.39 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.76-4.51z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.48c-.29 1.48-1.14 2.73-2.4 3.58l3.75 2.91c2.2-2.02 3.66-5 3.66-8.65z"
              />
              <path
                fill="#FBBC05"
                d="M5.24 14.51c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3L1.39 6.92C.5 8.71 0 10.7 0 12.8s.5 4.09 1.39 5.88l3.85-3.17z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.75-2.91c-1.1.74-2.51 1.18-4.21 1.18-3.34 0-5.86-1.81-6.76-4.51L1.39 17c1.98 3.91 5.96 6.56 10.61 6.56z"
              />
            </svg>
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  // If logged in via Firebase Auth, but does not have a registered profile in Postgres, show registration form
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
            <h1 className="text-xl font-semibold tracking-tight">ACTIVATE MEMBERSHIP</h1>
            <p className="text-neutral-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">
              Complete your registration to secure your exclusive LUXE membership pass.
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
                disabled
                className="w-full px-4 py-3 bg-neutral-100 text-neutral-400 rounded-xl text-sm border-none outline-none font-light cursor-not-allowed"
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

          <button
            onClick={onSignOut}
            className="w-full text-center mt-6 text-xs text-neutral-400 hover:text-neutral-600 transition-all font-light"
          >
            Cancel and Sign Out
          </button>
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

          <button
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2 mt-6 py-2.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-neutral-100"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
