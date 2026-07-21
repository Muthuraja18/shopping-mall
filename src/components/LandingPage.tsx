import { motion } from "motion/react";
import {
  Sparkles,
  Crown,
  ShieldCheck,
  Store,
  ShoppingBag,
  MapPin,
  ArrowRight,
  Star,
  ChevronDown,
  Quote,
} from "lucide-react";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

const brands = [
  "Apple",
  "Gucci",
  "Nike",
  "Rolex",
  "Louis Vuitton",
  "Zara",
  "Prada",
  "Samsung",
];

const features = [
  {
    icon: Crown,
    title: "VIP Membership",
    desc: "Unlock exclusive rewards, cashback, premium lounges, and luxury shopping experiences.",
  },
  {
    icon: Sparkles,
    title: "AI Shopping Concierge",
    desc: "Personalized recommendations, smart navigation, and instant assistance powered by AI.",
  },
  {
    icon: ShoppingBag,
    title: "Luxury Shopping",
    desc: "Explore premium collections from the world's most iconic fashion and lifestyle brands.",
  },
  {
    icon: MapPin,
    title: "Indoor Navigation",
    desc: "Navigate effortlessly through every floor with intelligent store guidance.",
  },
];

const stats = [
  { value: "500+", label: "Luxury Stores" },
  { value: "120K+", label: "Happy Members" },
  { value: "250+", label: "Premium Brands" },
  { value: "24/7", label: "AI Support" },
];

const testimonials = [
  {
    quote:
      "The AI concierge found me a private fitting slot at Gucci in under a minute. This is what luxury retail should feel like.",
    name: "Ananya R.",
    tier: "Inner Circle Member",
  },
  {
    quote:
      "Booking valet and lounge access before I even arrive has completely changed how I shop. Worth the membership alone.",
    name: "Kabir M.",
    tier: "Prestige Member",
  },
  {
    quote:
      "Beautifully designed, genuinely useful, and the indoor navigation actually works. No more wandering three floors for one store.",
    name: "Divya S.",
    tier: "Elite Member",
  },
];

export default function LandingPage({
  onLogin,
  onRegister,
}: Props) {
  return (
    <div className="relative overflow-hidden min-h-screen bg-black text-white">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-neutral-900" />

      {/* Glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute -top-40 left-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[100px] sm:blur-[150px]"
      />

      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-10 sm:right-20 top-32 h-32 w-32 sm:h-52 sm:w-52 rounded-full bg-purple-600/10 blur-[80px] sm:blur-[120px]"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute left-10 sm:left-20 bottom-32 h-36 w-36 sm:h-60 sm:w-60 rounded-full bg-blue-600/10 blur-[80px] sm:blur-[120px]"
      />

      {/* Limited-time promo banner */}
      <div className="relative z-10 bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4">
        <p className="text-center text-[11px] sm:text-xs text-amber-300 font-medium tracking-wide">
          ✦ Fall Couture Trunk Show at Gucci — July 25, 2026 — Inner Circle members get priority RSVP
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-14">

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-white/5 px-4 sm:px-5 py-2 backdrop-blur-lg">
              <Crown className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-center">
                India's Most Premium Shopping Experience
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 sm:mt-8 text-center text-5xl sm:text-6xl md:text-7xl font-black tracking-[6px] sm:tracking-[9px] md:tracking-[12px]"
          >
            LUXE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .5 }}
            className="mx-auto mt-6 sm:mt-8 max-w-3xl text-center text-base sm:text-lg md:text-xl leading-7 sm:leading-8 md:leading-9 text-neutral-300 px-2"
          >
            Experience the next generation of luxury shopping with AI-powered
            concierge services, premium memberships, indoor navigation,
            exclusive rewards, and world-class brands—all in one destination.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, scale: .9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .8 }}
            className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-5 px-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              onClick={onLogin}
              className="flex items-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-black shadow-xl w-full sm:w-auto justify-center"
            >
              Login
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              onClick={onRegister}
              className="rounded-xl border border-white/30 bg-white/5 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold backdrop-blur-lg w-full sm:w-auto"
            >
              Create Account
            </motion.button>
          </motion.div>

          {/* Stats */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-14 sm:mt-20 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4"
          >
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-xl"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400">
                  {item.value}
                </h2>

                <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-neutral-400">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features */}

        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">

          <div className="mb-10 sm:mb-14 text-center">

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Premium Experiences
            </h2>

            <p className="mt-3 sm:mt-5 text-sm sm:text-base text-neutral-400">
              Designed for modern luxury shopping.
            </p>

          </div>

          <div className="grid gap-5 sm:gap-8 md:grid-cols-2">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * .15 }}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl"
                >
                  <Icon className="mb-4 sm:mb-5 h-9 w-9 sm:h-12 sm:w-12 text-amber-400" />

                  <h3 className="text-xl sm:text-2xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-8 text-neutral-400">
                    {feature.desc}
                  </p>

                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}

        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">

          <div className="mb-10 sm:mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Loved by Our Members
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base text-neutral-400">
              Real experiences from the LUXE community.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur-xl flex flex-col"
              >
                <Quote className="h-6 w-6 text-amber-400/70 mb-4" />
                <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-300 flex-1">
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.tier}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Brands */}

        <section className="container mx-auto px-4 sm:px-6 py-14 sm:py-20">

          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold">
            Featured Brands
          </h2>

          <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">

            {brands.map((brand) => (
              <motion.div
                key={brand}
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8 text-center text-sm sm:text-lg font-semibold backdrop-blur-xl"
              >
                {brand}
              </motion.div>
            ))}

          </div>

        </section>

        {/* AI */}

        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-[24px] sm:rounded-[40px] border border-white/10 bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 sm:p-12"
          >

            <div className="flex flex-col items-center text-center">

              <Sparkles className="h-10 w-10 sm:h-16 sm:w-16 text-amber-400" />

              <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-bold">
                AI Concierge
              </h2>

              <p className="mt-4 sm:mt-6 max-w-3xl text-sm sm:text-base md:text-lg leading-6 sm:leading-8 md:leading-9 text-neutral-300">
                Shop smarter with intelligent recommendations, instant booking,
                premium assistance, loyalty rewards, QR membership cards,
                indoor navigation, exclusive offers, and personalized shopping
                journeys.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: .95 }}
                onClick={onRegister}
                className="mt-8 flex items-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-black shadow-xl"
              >
                Start Shopping Smarter
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>

            </div>

          </motion.div>

        </section>

        {/* Footer */}

        <footer className="pb-12 sm:pb-16">

          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="h-8 w-8 sm:h-10 sm:w-10 text-neutral-500" />

            <p className="mt-2 text-sm sm:text-base text-neutral-500">
              Discover Luxury
            </p>
          </motion.div>

          <div className="mt-10 sm:mt-14 flex justify-center gap-6 sm:gap-8 text-neutral-500">

            <Store className="w-5 h-5 sm:w-6 sm:h-6" />

            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />

            <Star className="w-5 h-5 sm:w-6 sm:h-6" />

            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />

          </div>

          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-neutral-600 px-4">
            © 2026 LUXE Mall • AI Powered Luxury Shopping Platform
          </p>

        </footer>

      </div>

    </div>
  );
}
