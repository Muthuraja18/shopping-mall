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
        className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[150px]"
      />

      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-20 top-32 h-52 w-52 rounded-full bg-purple-600/10 blur-[120px]"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute left-20 bottom-32 h-60 w-60 rounded-full bg-blue-600/10 blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10">

        {/* Hero */}
        <section className="container mx-auto px-6 pt-20 pb-14">

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-white/5 px-5 py-2 backdrop-blur-lg">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm">
                India's Most Premium Shopping Experience
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 text-center text-7xl font-black tracking-[12px]"
          >
            LUXE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .5 }}
            className="mx-auto mt-8 max-w-3xl text-center text-xl leading-9 text-neutral-300"
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
            className="mt-12 flex flex-wrap justify-center gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              onClick={onLogin}
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-black shadow-xl"
            >
              Login
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              onClick={onRegister}
              className="rounded-xl border border-white/30 bg-white/5 px-8 py-4 font-semibold backdrop-blur-lg"
            >
              Create Account
            </motion.button>
          </motion.div>

          {/* Stats */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
              >
                <h2 className="text-4xl font-bold text-amber-400">
                  {item.value}
                </h2>

                <p className="mt-2 text-neutral-400">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features */}

        <section className="container mx-auto px-6 py-24">

          <div className="mb-14 text-center">

            <h2 className="text-5xl font-bold">
              Premium Experiences
            </h2>

            <p className="mt-5 text-neutral-400">
              Designed for modern luxury shopping.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2">

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
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                >
                  <Icon className="mb-5 h-12 w-12 text-amber-400" />

                  <h3 className="text-2xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-8 text-neutral-400">
                    {feature.desc}
                  </p>

                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Brands */}

        <section className="container mx-auto px-6 py-20">

          <h2 className="text-center text-5xl font-bold">
            Featured Brands
          </h2>

          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">

            {brands.map((brand) => (
              <motion.div
                key={brand}
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-lg font-semibold backdrop-blur-xl"
              >
                {brand}
              </motion.div>
            ))}

          </div>

        </section>

        {/* AI */}

        <section className="container mx-auto px-6 py-24">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-[40px] border border-white/10 bg-gradient-to-r from-neutral-900 to-neutral-800 p-12"
          >

            <div className="flex flex-col items-center text-center">

              <Sparkles className="h-16 w-16 text-amber-400" />

              <h2 className="mt-6 text-5xl font-bold">
                AI Concierge
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-9 text-neutral-300">
                Shop smarter with intelligent recommendations, instant booking,
                premium assistance, loyalty rewards, QR membership cards,
                indoor navigation, exclusive offers, and personalized shopping
                journeys.
              </p>

            </div>

          </motion.div>

        </section>

        {/* Footer */}

        <footer className="pb-16">

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
            <ChevronDown className="h-10 w-10 text-neutral-500" />

            <p className="mt-2 text-neutral-500">
              Discover Luxury
            </p>
          </motion.div>

          <div className="mt-14 flex justify-center gap-8 text-neutral-500">

            <Store />

            <ShieldCheck />

            <Star />

            <Sparkles />

          </div>

          <p className="mt-8 text-center text-sm text-neutral-600">
            © 2026 LUXE Mall • AI Powered Luxury Shopping Platform
          </p>

        </footer>

      </div>

    </div>
  );
}