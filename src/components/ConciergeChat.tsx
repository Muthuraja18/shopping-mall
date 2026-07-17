import React, { useState, useRef, useEffect } from 'react';
import { Message, BookingType } from '../types';
import { Send, Sparkles, X, User, Bot, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConciergeChatProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onBookExperience: (type: BookingType, storeName?: string) => void;
  initialPrompt?: string;
}

export default function ConciergeChat({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isLoading,
  onBookExperience,
  initialPrompt,
}: ConciergeChatProps) {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Where is the Gucci boutique?',
    'Book a Valet parking spot',
    'What events are happening today?',
    'Help me find high-end dining',
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Handle auto-triggering initial prompt if passed
  useEffect(() => {
    if (isOpen && initialPrompt) {
      onSendMessage(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Sliding Chat Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10"
        >
          {/* Chat Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-950 text-white rounded-tl-[24px]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight">LUXE AI Concierge</h3>
                <p className="text-[10px] text-neutral-400 font-light">
                  Elite Mall Personal Shopper &amp; Guide
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-neutral-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Icon Avatar */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="w-4 h-4 text-amber-300" />
                  </div>
                )}

                <div className="max-w-[75%] space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-black text-white rounded-tr-none font-light'
                        : 'bg-white text-neutral-800 border border-neutral-100 rounded-tl-none font-light'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggestions Chips (If AI sends quick chips) */}
                  {msg.sender === 'ai' && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sug) => (
                        <button
                          key={sug}
                          onClick={() => onSendMessage(sug)}
                          className="px-2.5 py-1 bg-white border border-neutral-100 hover:border-black rounded-lg text-[10px] text-neutral-600 hover:text-black transition-all cursor-pointer shadow-xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Embedded interactive Booking Offer Box */}
                  {msg.sender === 'ai' && msg.bookingOffer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-3"
                    >
                      <div className="flex gap-2 items-start">
                        <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[11px] font-semibold text-neutral-900">
                            Book {msg.bookingOffer.type.replace('_', ' ')}
                          </h4>
                          <p className="text-[10px] text-neutral-500 font-light">
                            {msg.bookingOffer.storeName
                              ? `At ${msg.bookingOffer.storeName} boutique.`
                              : 'Secured priority service slot.'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          onBookExperience(
                            msg.bookingOffer!.type,
                            msg.bookingOffer!.storeName
                          )
                        }
                        className="w-full py-2 bg-neutral-950 hover:bg-black text-white text-[10px] font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Reserve Spot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* User Icon Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center text-neutral-700 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Generation Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-lg bg-neutral-950 flex items-center justify-center text-white flex-shrink-0">
                  <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
                </div>
                <div className="p-4 bg-white border border-neutral-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick prompt assistant section (only if no custom user inputs exist or just starting) */}
          {messages.length === 1 && (
            <div className="px-5 py-3 border-t border-neutral-100 bg-white">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block mb-2.5">
                Suggested Queries
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => onSendMessage(p)}
                    className="p-3 text-left border border-neutral-100 hover:border-black rounded-xl text-[10px] text-neutral-600 hover:text-black transition-all cursor-pointer font-light line-clamp-1"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-neutral-100 bg-white">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the luxury concierge..."
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-3.5 bg-neutral-50 hover:bg-neutral-100 focus:bg-white focus:ring-1 focus:ring-black rounded-xl text-xs transition-all duration-200 border-none outline-none font-light"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-black hover:bg-neutral-900 text-white rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-black cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
