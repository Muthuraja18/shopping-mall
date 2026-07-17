import { useState, useEffect } from 'react';
import { Store, Booking, LuxeMember, Message, BookingType } from './types';
import { STORES } from './data';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import StoresView from './components/StoresView';
import ProfileView from './components/ProfileView';
import ConciergeChat from './components/ConciergeChat';
import StoreModal from './components/StoreModal';
import { Menu, ShoppingBag, Home, Search, Store as StoreIcon, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'stores' | 'profile'>('home');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'Fashion' | 'Tech' | 'Dining' | 'Beauty' | 'All'>('All');
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isLoadingConcierge, setIsLoadingConcierge] = useState(false);
  const [conciergeInitialPrompt, setConciergeInitialPrompt] = useState<string | undefined>(undefined);

  // Persistence States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [member, setMember] = useState<LuxeMember | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Good day, and welcome to LUXE Mall. I am your dedicated AI Concierge. How may I elevate your retail experience? I can recommend bespoke collections, guide you to boutiques, or book premium valet services.',
      timestamp: new Date(),
      suggestions: [
        'Is Gucci having a trunk show?',
        'Book a VIP valet spot',
        'Where is Le Luxe Bistro?',
      ],
    },
  ]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('luxe_bookings');
    const savedMember = localStorage.getItem('luxe_member');
    const savedMessages = localStorage.getItem('luxe_messages');

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    if (savedMember) {
      setMember(JSON.parse(savedMember));
    } else {
      // Seed default member profile for premium feel
      const defaultMember: LuxeMember = {
        name: 'Alexander Sterling',
        email: 'alexander@sterling.co',
        phone: '+1 (555) 723-9201',
        tier: 'Elite',
        points: 4250,
        cardId: 'LUXE-9021-ELITE',
        memberSince: 'JAN 2026',
        valetCode: 'VALET-882X',
      };
      setMember(defaultMember);
      localStorage.setItem('luxe_member', JSON.stringify(defaultMember));
    }

    if (savedMessages) {
      try {
        const parsedMsgs = JSON.parse(savedMessages);
        setMessages(
          parsedMsgs.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }))
        );
      } catch (e) {
        console.error('Error loading saved messages', e);
      }
    }
  }, []);

  // Save states to localStorage when changed
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('luxe_bookings', JSON.stringify(newBookings));
  };

  const saveMember = (newMember: LuxeMember | null) => {
    setMember(newMember);
    localStorage.setItem('luxe_member', JSON.stringify(newMember));
  };

  const saveMessages = (newMsgs: Message[]) => {
    setMessages(newMsgs);
    localStorage.setItem('luxe_messages', JSON.stringify(newMsgs));
  };

  // Register membership
  const handleRegister = (name: string, email: string, phone: string) => {
    const newMember: LuxeMember = {
      name,
      email,
      phone,
      tier: 'Signature',
      points: 500, // starting points bonus
      cardId: `LUXE-${Math.floor(1000 + Math.random() * 9000)}-SIGN`,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase(),
      valetCode: `VALET-${Math.floor(100 + Math.random() * 900)}X`,
    };
    saveMember(newMember);
  };

  // Cancel reservation
  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
  };

  // Create a reservation booking
  const handleBook = (type: BookingType, date: string, time: string, notes?: string) => {
    const targetStore = selectedStore;
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(7),
      storeId: targetStore?.id,
      storeName: targetStore?.name,
      type,
      date,
      time,
      status: 'confirmed',
      notes,
      createdAt: new Date().toISOString(),
    };

    const newBookingsList = [newBooking, ...bookings];
    saveBookings(newBookingsList);

    // Give points to member for bookings
    if (member) {
      const updatedMember = {
        ...member,
        points: member.points + 500,
        // Upgrade tier based on points
        tier: (member.points + 500 >= 10000
          ? 'Inner Circle'
          : member.points + 500 >= 5000
          ? 'Prestige'
          : 'Elite') as any,
      };
      saveMember(updatedMember);
    }
  };

  // Handle in-chat reservations
  const handleInChatBooking = (type: BookingType, storeName?: string) => {
    const storeObj = STORES.find((s) => s.name.toLowerCase() === storeName?.toLowerCase());
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(7),
      storeId: storeObj?.id,
      storeName: storeName || 'Luxe Valet Terminal',
      type,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: '3:00 PM', // Default slot
      status: 'confirmed',
      notes: 'Reserved via AI Shopper Concierge',
      createdAt: new Date().toISOString(),
    };

    saveBookings([newBooking, ...bookings]);

    // Add success confirmation message from AI
    const confirmationMsg: Message = {
      id: Math.random().toString(),
      sender: 'ai',
      text: `I have successfully reserved your ${type.replace('_', ' ')} booking${
        storeName ? ` at ${storeName}` : ''
      } for today at 3:00 PM. You can view your dynamic barcode pass in the Profile tab. Enjoy your exclusive treatment!`,
      timestamp: new Date(),
    };
    saveMessages([...messages, confirmationMsg]);

    // Switch to profile tab to showcase booking
    setActiveTab('profile');
    setIsConciergeOpen(false);
  };

  // Trigger AI chat window with optional query
  const handleOpenConcierge = (prompt?: string) => {
    setConciergeInitialPrompt(prompt);
    setIsConciergeOpen(true);
  };

  // Chat API call helper to Express server
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    const updatedMsgs = [...messages, userMsg];
    saveMessages(updatedMsgs);
    setIsLoadingConcierge(true);

    try {
      const historyPayload = updatedMsgs.slice(-8).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history: historyPayload }),
      });

      if (!res.ok) {
        throw new Error('API server unavailable');
      }

      const data = await res.json();
      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: data.reply,
        timestamp: new Date(),
        suggestions: data.suggestions || [],
        bookingOffer: data.bookingOffer,
      };

      saveMessages([...updatedMsgs, aiMsg]);
    } catch (err) {
      console.error('Error fetching concierge API', err);
      // Failback message offline
      const fallbackMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: "I apologies, but my connection to our main core network seems temporarily offline. However, I can still recommend you explore our Store Spotlight or register for the Luxe Membership to access valet options!",
        timestamp: new Date(),
        suggestions: ['Where is Gucci?', 'Book Valet parking', 'View Membership pass'],
      };
      saveMessages([...updatedMsgs, fallbackMsg]);
    } finally {
      setIsLoadingConcierge(false);
    }
  };

  const selectCategoryAndFilter = (cat: 'Fashion' | 'Tech' | 'Dining' | 'Beauty') => {
    setSelectedCategory(cat);
    setActiveTab('search');
  };

  return (
    <div className="min-h-screen bg-neutral-50/20 text-neutral-900 font-sans flex flex-col pb-24">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-40 bg-white/70 backdrop-blur-xl flex justify-between items-center px-6 h-16 border-b border-neutral-100/60 shadow-xs">
        {/* Toggle AI Concierge on Menu */}
        <button
          onClick={() => handleOpenConcierge()}
          className="text-neutral-900 hover:opacity-75 transition-opacity active:scale-95 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="font-sans text-xl font-bold tracking-widest text-neutral-900">LUXE</div>

        {/* View Profile/Membership on bag */}
        <button
          onClick={() => setActiveTab('profile')}
          className="relative text-neutral-900 hover:opacity-75 transition-opacity active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          {bookings.length > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              {bookings.length}
            </span>
          )}
        </button>
      </header>

      {/* Main View Container */}
      <main className="pt-20 flex-1 max-w-7xl w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {activeTab === 'home' && (
              <HomeView
                onSelectStore={setSelectedStore}
                onSelectCategory={selectCategoryAndFilter}
                onJoinMembership={() => setActiveTab('profile')}
                onOpenConcierge={() => handleOpenConcierge()}
                isMember={!!member}
                onSwitchTab={setActiveTab}
              />
            )}

            {activeTab === 'search' && (
              <SearchView
                onSelectStore={setSelectedStore}
                onOpenConcierge={handleOpenConcierge}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            )}

            {activeTab === 'stores' && (
              <StoresView onSelectStore={setSelectedStore} onBookAmenity={setSelectedStore} />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                member={member}
                onRegister={handleRegister}
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Sparkle Action button for Concierge Quick-access */}
      <div className="fixed bottom-28 right-6 z-40">
        <button
          onClick={() => handleOpenConcierge()}
          className="w-12 h-12 bg-neutral-950 hover:bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-neutral-800"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white/80 backdrop-blur-2xl border-t border-neutral-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] z-40 rounded-t-2xl">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 transition-all w-16 cursor-pointer ${
            activeTab === 'home' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1 uppercase tracking-wider">Home</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('All');
            setActiveTab('search');
          }}
          className={`flex flex-col items-center justify-center py-1.5 transition-all w-16 cursor-pointer ${
            activeTab === 'search' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1 uppercase tracking-wider">Search</span>
        </button>

        <button
          onClick={() => setActiveTab('stores')}
          className={`flex flex-col items-center justify-center py-1.5 transition-all w-16 cursor-pointer ${
            activeTab === 'stores' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <StoreIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1 uppercase tracking-wider">Stores</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center py-1.5 transition-all w-16 cursor-pointer ${
            activeTab === 'profile' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1 uppercase tracking-wider">Profile</span>
        </button>
      </nav>

      {/* Slide-over Chat Drawer */}
      <ConciergeChat
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoadingConcierge}
        onBookExperience={handleInChatBooking}
        initialPrompt={conciergeInitialPrompt}
      />

      {/* Boutique Detailed Experience Modals */}
      <StoreModal
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
        onBook={handleBook}
      />
    </div>
  );
}
