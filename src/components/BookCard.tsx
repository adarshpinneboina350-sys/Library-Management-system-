import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, CheckCircle2, XCircle, Calendar, Tag, BookMarked } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Book } from '../data/books';
import { PrebookModal } from './PrebookModal';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-lg"
      >
        <Link to={`/book/${book.id}`} className="relative aspect-[2/3] overflow-hidden bg-zinc-100">
          <AnimatePresence>
            {isHovered ? (
              <motion.img
                key="cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <motion.div
                key="title-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
              >
                <BookMarked className="mb-4 h-12 w-12 text-emerald-600 opacity-20" />
                <h3 className="text-lg font-bold leading-tight text-zinc-900">
                  {book.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-500">{book.author}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute top-3 right-3 z-10">
            {book.available ? (
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                <CheckCircle2 className="h-3 w-3" />
                AVAILABLE
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-full bg-zinc-500/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                <XCircle className="h-3 w-3" />
                BORROWED
              </div>
            )}
          </div>

          <div className="absolute bottom-3 left-3 z-10">
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-zinc-900 shadow-sm backdrop-blur-sm">
              <Tag className="h-3 w-3 text-emerald-600" />
              ₹{book.pricePerDay}/day
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase">
              {book.genre}
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-zinc-500">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {book.rating}
            </div>
          </div>

          <div className="space-y-2">
            {!book.available && book.issueDate && (
              <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500">
                <Calendar className="h-3 w-3 text-zinc-400" />
                <span>Issued: {book.issueDate}</span>
              </div>
            )}
            {!book.available && book.nextAvailableDate && (
              <div className="flex items-center gap-2 text-[10px] font-medium text-emerald-600">
                <Clock className="h-3 w-3" />
                <span>Available: {book.nextAvailableDate}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Link
              to={`/book/${book.id}`}
              className="flex-1 rounded-xl bg-zinc-900 py-2 text-center text-xs font-bold text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              Details
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-bold text-zinc-900 transition-all hover:bg-zinc-50 active:scale-95"
            >
              Prebook
            </button>
          </div>
        </div>
      </motion.div>

      <PrebookModal
        book={book}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
