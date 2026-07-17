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
import { auth, googleAuthProvider } from './lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'stores' | 'profile'>('home');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'Fashion' | 'Tech' | 'Dining' | 'Beauty' | 'All'>('All');
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isLoadingConcierge, setIsLoadingConcierge] = useState(false);
  const [conciergeInitialPrompt, setConciergeInitialPrompt] = useState<string | undefined>(undefined);

  // Authentication & Database-backed state
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

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

  // Load chat messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('luxe_messages');
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

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        try {
          const token = await user.getIdToken();
          setAuthToken(token);
          await fetchUserProfileAndBookings(token);
        } catch (error) {
          console.error('Error getting auth token or profiles:', error);
        }
      } else {
        setAuthUser(null);
        setAuthToken(null);
        setMember(null);
        setBookings([]);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfileAndBookings = async (token: string) => {
    try {
      // Fetch profile
      const userRes = await fetch('/api/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        setMember(userData.user);
      } else {
        setMember(null);
      }

      // Fetch bookings
      const bookingsRes = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData.bookings);
      }
    } catch (error) {
      console.error('Error fetching database data:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthLoading(true);
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsAuthLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Sign out failed:', error);
      setIsAuthLoading(false);
    }
  };

  const saveMessages = (newMsgs: Message[]) => {
    setMessages(newMsgs);
    localStorage.setItem('luxe_messages', JSON.stringify(newMsgs));
  };

  // Register membership in PostgreSQL
  const handleRegister = async (name: string, email: string, phone: string) => {
    if (!authToken) return;
    try {
      setIsAuthLoading(true);
      const res = await fetch('/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ name, phone })
      });

      if (res.ok) {
        const data = await res.json();
        setMember(data.user);
      } else {
        console.error('Failed to register user in db:', res.statusText);
      }
    } catch (error) {
      console.error('Error registering user in db:', error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Cancel reservation in PostgreSQL
  const handleCancelBooking = async (id: string) => {
    if (!authToken) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (res.ok) {
        setBookings(prev => prev.filter(b => b.id !== id));
      } else {
        console.error('Failed to cancel booking:', res.statusText);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  // Create a reservation booking in PostgreSQL
  const handleBook = async (type: BookingType, date: string, time: string, notes?: string) => {
    if (!authToken) {
      setActiveTab('profile');
      return;
    }

    try {
      const targetStore = selectedStore;
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          storeId: targetStore?.id,
          storeName: targetStore?.name,
          type,
          date,
          time,
          notes
        })
      });

      if (res.ok) {
        const data = await res.json();
        setBookings(prev => [data.booking, ...prev]);

        // Refresh user details to reflect added points & tier
        const userRes = await fetch('/api/me', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setMember(userData.user);
        }
      } else {
        console.error('Failed to create booking:', res.statusText);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  // Handle in-chat reservations in PostgreSQL
  const handleInChatBooking = async (type: BookingType, storeName?: string) => {
    if (!authToken) {
      const signinMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: 'To secure your VIP reservation, please sign in via the Profile tab first. Once authenticated, I can instantly book your appointment.',
        timestamp: new Date(),
      };
      saveMessages([...messages, signinMsg]);
      setActiveTab('profile');
      setIsConciergeOpen(false);
      return;
    }

    try {
      const storeObj = STORES.find((s) => s.name.toLowerCase() === storeName?.toLowerCase());
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          storeId: storeObj?.id,
          storeName: storeName || 'Luxe Valet Terminal',
          type,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '3:00 PM',
          notes: 'Reserved via AI Shopper Concierge'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setBookings(prev => [data.booking, ...prev]);

        // Refresh profile
        const userRes = await fetch('/api/me', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setMember(userData.user);
        }

        const confirmationMsg: Message = {
          id: Math.random().toString(),
          sender: 'ai',
          text: `I have successfully reserved your ${type.replace('_', ' ')} booking${
            storeName ? ` at ${storeName}` : ''
          } for today at 3:00 PM. You can view your dynamic barcode pass in the Profile tab. Enjoy your exclusive treatment!`,
          timestamp: new Date(),
        };
        saveMessages([...messages, confirmationMsg]);
        setActiveTab('profile');
        setIsConciergeOpen(false);
      }
    } catch (error) {
      console.error('Error creating in-chat booking:', error);
    }
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
                onGoogleSignIn={handleGoogleSignIn}
                onSignOut={handleSignOut}
                isAuthLoading={isAuthLoading}
                authUser={authUser}
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
