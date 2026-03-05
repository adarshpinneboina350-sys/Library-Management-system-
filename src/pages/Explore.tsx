import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { books } from '../data/books';
import { BookCard } from '../components/BookCard';
import { cn } from '../lib/utils';

interface ExploreProps {
  isLoggedIn: boolean;
}

export const Explore: React.FC<ExploreProps> = ({ isLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const navigate = useNavigate();

  const genres = useMemo(() => ['All', ...new Set(books.map((b) => b.genre))], []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 py-8 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="group mb-4 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Explore Collection</h1>
          <p className="mt-2 text-zinc-500">Browse through our extensive library of {books.length} books.</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {isLoggedIn ? (
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-xl bg-white pl-12 pr-4 text-zinc-900 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          ) : (
            <div className="flex-1 max-w-md rounded-xl bg-zinc-100 p-3 ring-1 ring-black/5">
              <p className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                <SearchIcon className="h-4 w-4" />
                <span>Search is available for members only. <button onClick={() => navigate('/login')} className="text-emerald-600 font-bold hover:underline">Login</button> to search.</span>
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter className="h-5 w-5 flex-shrink-0 text-zinc-400" />
            <div className="flex gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    selectedGenre === genre
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 ring-1 ring-black/5"
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-zinc-100 p-6">
              <SearchIcon className="h-12 w-12 text-zinc-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">No books found</h3>
            <p className="mt-2 text-zinc-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};
