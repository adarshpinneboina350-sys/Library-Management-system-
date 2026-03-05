import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Bookmark, Share2, CheckCircle2, XCircle, User, Tag, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { books } from '../data/books';
import { cn } from '../lib/utils';
import { PrebookModal } from '../components/PrebookModal';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900">Book not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-emerald-600 hover:underline"
          >
            Return to library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to collection
        </button>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Cover */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-24 overflow-hidden rounded-3xl bg-white p-4 shadow-2xl shadow-zinc-200 ring-1 ring-black/5"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="aspect-[2/3] w-full rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wider text-emerald-700 uppercase">
                  {book.genre}
                </span>
                <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {book.rating} Rating
                </div>
                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 ring-1 ring-emerald-200">
                  <Tag className="h-3 w-3" />
                  ₹{book.pricePerDay}/day
                </div>
                {book.available ? (
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                    <CheckCircle2 className="h-3 w-3" />
                    AVAILABLE
                  </div>
                ) : (
                  <div className="flex items-center gap-1 rounded-full bg-zinc-500 px-3 py-1 text-xs font-bold text-white">
                    <XCircle className="h-3 w-3" />
                    BORROWED
                  </div>
                )}
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                {book.title}
              </h1>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-4 text-lg text-zinc-600">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-zinc-400" />
                    <span className="font-semibold">{book.author}</span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-zinc-300" />
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-zinc-400" />
                    <span>Published {book.publishedYear}</span>
                  </div>
                </div>

                {!book.available && (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {book.issueDate && (
                      <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <span>Issued on: <span className="text-zinc-900">{book.issueDate}</span></span>
                      </div>
                    )}
                    {book.nextAvailableDate && (
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                        <Clock className="h-4 w-4" />
                        <span>Available from: <span className="font-bold">{book.nextAvailableDate}</span></span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-10">
                <h2 className="text-lg font-bold text-zinc-900">About this book</h2>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                  {book.description}
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <button
                  disabled={!book.available}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold transition-all active:scale-[0.98]",
                    book.available
                      ? "bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-xl"
                      : "cursor-not-allowed bg-zinc-200 text-zinc-400"
                  )}
                >
                  {book.available ? 'Borrow Now' : 'Currently Borrowed'}
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-zinc-900 px-8 py-4 text-base font-bold text-zinc-900 transition-all hover:bg-zinc-50 active:scale-[0.98]"
                >
                  Prebook Now
                </button>
                <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-600 shadow-sm ring-1 ring-black/5 transition-all hover:bg-zinc-50 hover:shadow-md active:scale-95">
                  <Bookmark className="h-6 w-6" />
                </button>
                <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-600 shadow-sm ring-1 ring-black/5 transition-all hover:bg-zinc-50 hover:shadow-md active:scale-95">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { label: 'Pages', value: '342' },
                  { label: 'Language', value: 'English' },
                  { label: 'Format', value: 'Hardcover' },
                  { label: 'ISBN', value: '978-3-16-148410-0' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">{stat.label}</p>
                    <p className="mt-1 text-sm font-bold text-zinc-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <PrebookModal
        book={book}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
