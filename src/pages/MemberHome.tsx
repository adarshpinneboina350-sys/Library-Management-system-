import React from 'react';
import { BookOpen, Clock, Star, TrendingUp, Bookmark, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import { BookCard } from '../components/BookCard';
import { cn } from '../lib/utils';

export const MemberHome: React.FC = () => {
  const borrowedBooks = books.slice(0, 3);
  // Sort by rating to get "famous" books
  const topFamousBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const recommendedBooks = books.slice(10, 15);

  return (
    <div className="min-h-screen bg-[#fdfcf6] pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 pt-12 pb-8 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Authenticated Member</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                Welcome back, <span className="text-emerald-600">Adarsh</span>
              </h1>
              <p className="mt-1 text-zinc-500">Your library account is active and ready.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/explore"
                className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95"
              >
                <Compass className="h-4 w-4" />
                Explore All Books
              </Link>
              
              <div className="flex items-center gap-2 rounded-2xl bg-zinc-50 px-4 py-2 ring-1 ring-black/5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Star className="h-4 w-4 fill-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Points</p>
                  <p className="text-sm font-bold text-zinc-900">1,250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {/* Currently Reading */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-zinc-900">Your Current Reads</h2>
            </div>
            <button className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:underline">
              View History <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {borrowedBooks.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md"
              >
                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="h-full w-full object-cover opacity-0 transition-opacity group-hover:opacity-100" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-center group-hover:hidden">
                    <span className="text-[10px] font-bold leading-tight text-zinc-400">{book.title}</span>
                  </div>
                </div>
                <div className="flex flex-col py-1 flex-1">
                  <h3 className="font-bold text-zinc-900 line-clamp-1">{book.title}</h3>
                  <p className="text-xs text-zinc-500">{book.author}</p>
                  <div className="mt-auto">
                    <div className="mb-1 flex items-center justify-between text-[10px] font-bold text-zinc-400">
                      <span>PROGRESS</span>
                      <span>{65 + i * 10}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${65 + i * 10}%` }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <Clock className="h-3 w-3" />
                      DUE IN {3 + i} DAYS
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top 3 Famous Books */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
              <h2 className="text-xl font-bold text-zinc-900">Top 3 Famous Books</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {topFamousBooks.map((book, i) => (
              <div key={book.id} className="relative">
                <div className="absolute -top-4 -left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-lg font-black text-white shadow-lg">
                  #{i + 1}
                </div>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-zinc-900">Recommended for You</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {recommendedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Bookmark, label: 'Saved Books', value: '24', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Star, label: 'Reviews Given', value: '12', color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: BookOpen, label: 'Books Read', value: '156', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", stat.bg, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">{stat.label}</p>
                <p className="text-2xl font-extrabold text-zinc-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
