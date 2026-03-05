import React from 'react';
import { BookOpen, Shield, Zap, Globe, Users, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: BookOpen,
    title: "Vast Collection",
    description: "Access over 500+ titles ranging from classic literature to modern scientific journals.",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: Zap,
    title: "Instant Borrowing",
    description: "Borrow your favorite books with a single click and start reading immediately.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    icon: Shield,
    title: "Secure Management",
    description: "Your reading history and personal data are protected with industry-leading security.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Globe,
    title: "Anywhere Access",
    description: "Manage your library account from any device, anywhere in the world.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of readers, share reviews, and discover trending titles.",
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  {
    icon: Star,
    title: "Personalized Picks",
    description: "Receive smart recommendations based on your unique reading preferences.",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  }
];

interface PublicHomeProps {
  isLoggedIn: boolean;
}

export const PublicHome: React.FC<PublicHomeProps> = ({ isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-[#fdfcf6]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-900 py-32 text-white">
        <div className="absolute inset-0 opacity-20 attractive-gradient" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-emerald-400 backdrop-blur-sm"
          >
            <Star className="h-4 w-4 fill-emerald-400" />
            The Future of Library Management
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-6xl font-extrabold tracking-tight sm:text-8xl"
          >
            Lumina <span className="text-emerald-500">Library</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-xl text-zinc-400"
          >
            Experience a modern, digital-first approach to library management. Explore 500+ books and manage your reading journey with ease.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="group flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="group flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            
            {isLoggedIn && (
              <Link
                to="/explore"
                className="rounded-2xl bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
              >
                Explore Books
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Why Choose Lumina?
            </h2>
            <p className="mt-4 text-lg text-zinc-500">
              Everything you need to manage your personal or institutional library.
            </p>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} mb-6 transition-transform group-hover:scale-110`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{feature.title}</h3>
                <p className="mt-3 text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white border-y border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Total Books", value: "500+" },
              { label: "Active Readers", value: "12k" },
              { label: "Daily Borrows", value: "450" },
              { label: "Genres", value: "15+" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-extrabold text-emerald-600">{stat.value}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
