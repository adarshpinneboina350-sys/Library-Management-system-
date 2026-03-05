import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { Book } from '../data/books';
import { cn } from '../lib/utils';
import 'react-day-picker/dist/style.css';

interface PrebookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export const PrebookModal: React.FC<PrebookModalProps> = ({ book, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selectedDate) {
      setIsConfirmed(true);
      setTimeout(() => {
        setIsConfirmed(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {isConfirmed ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
                <h3 className="text-2xl font-bold text-zinc-900">Prebook Confirmed!</h3>
                <p className="mt-2 text-zinc-500">
                  You have successfully reserved <span className="font-bold text-zinc-900">{book.title}</span> for {selectedDate && format(selectedDate, 'PPP')}.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-zinc-100 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">Prebook Book</h3>
                      <p className="text-xs text-zinc-500">Select your preferred date</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex gap-4 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-20 w-14 rounded-lg object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-zinc-900 line-clamp-1">{book.title}</h4>
                      <p className="text-xs text-zinc-500">{book.author}</p>
                      <div className="mt-2 text-[10px] font-bold text-emerald-600">
                        ₹{book.pricePerDay}/day
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center rounded-2xl border border-zinc-100 bg-white p-2">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={{ before: new Date() }}
                      className="m-0"
                    />
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Selected Date:</span>
                      <span className="font-bold text-zinc-900">
                        {selectedDate ? format(selectedDate, 'PPP') : 'None'}
                      </span>
                    </div>
                    <button
                      onClick={handleConfirm}
                      disabled={!selectedDate}
                      className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-200"
                    >
                      Confirm Prebook
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
