import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users as UsersIcon, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Settings, 
  Bell, 
  Search, 
  Filter,
  Check,
  X,
  Zap,
  Plus,
  Trash2,
  LayoutDashboard,
  BookMarked,
  UserCircle
} from 'lucide-react';
import { books as initialBooks } from '../data/books';
import { cn } from '../lib/utils';

interface BookRequest {
  id: string;
  bookTitle: string;
  userName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'member' | 'admin';
}

const mockRequests: BookRequest[] = [
  { id: 'req-1', bookTitle: 'The Midnight Shadow', userName: 'John Doe', requestDate: '2026-03-15', status: 'pending' },
  { id: 'req-2', bookTitle: 'Ancient Star', userName: 'Jane Smith', requestDate: '2026-03-16', status: 'pending' },
  { id: 'req-3', bookTitle: 'Silent Secret', userName: 'Mike Johnson', requestDate: '2026-03-14', status: 'pending' },
];

const mockUsers: UserProfile[] = [
  { id: 'u-1', name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', address: '123 Library St', role: 'member' },
  { id: 'u-2', name: 'Jane Smith', email: 'jane@example.com', phone: '+91 87654 32109', address: '456 Book Ave', role: 'member' },
];

export const AdminHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'catalog' | 'users'>('requests');
  const [isAutoApprovalEnabled, setIsAutoApprovalEnabled] = useState(false);
  const [requests, setRequests] = useState<BookRequest[]>(mockRequests);
  const [booksList, setBooksList] = useState(initialBooks);
  const [usersList, setUsersList] = useState<UserProfile[]>(mockUsers);
  
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    cover: 'https://picsum.photos/seed/book/400/600'
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUsersList(prev => {
        const exists = prev.find(u => u.email === profile.email);
        if (exists) return prev;
        return [...prev, { ...profile, id: 'u-current', role: 'member' }];
      });
    }
  }, []);

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'approved' } : req));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    const bookToAdd = {
      ...newBook,
      id: booksList.length + 1,
      rating: 4.5,
      reviews: 0,
      description: 'Newly added book to the collection.',
      cost: 10
    };
    setBooksList([bookToAdd, ...booksList]);
    setNewBook({ title: '', author: '', genre: '', cover: 'https://picsum.photos/seed/book/400/600' });
    alert('Book added to catalog!');
  };

  const handleRemoveBook = (id: number) => {
    if (window.confirm('Are you sure you want to remove this book?')) {
      setBooksList(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf6] pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 pt-12 pb-8 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Administrator Console</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                Library <span className="text-emerald-600">Dashboard</span>
              </h1>
              <p className="mt-1 text-zinc-500">Manage book requests, users, and system settings.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAutoApprovalEnabled(!isAutoApprovalEnabled)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition-all active:scale-95",
                  isAutoApprovalEnabled 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                    : "bg-white text-zinc-900 ring-1 ring-black/5 hover:bg-zinc-50"
                )}
              >
                <Zap className={cn("h-4 w-4", isAutoApprovalEnabled ? "fill-white" : "text-emerald-600")} />
                {isAutoApprovalEnabled ? "Auto-Approval Active" : "Enable Auto-Approval"}
              </button>
              
              <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-600 shadow-sm ring-1 ring-black/5 hover:bg-zinc-50">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex gap-2 border-b border-zinc-100">
            {[
              { id: 'requests', label: 'Requests', icon: Clock },
              { id: 'catalog', label: 'Catalog', icon: BookMarked },
              { id: 'users', label: 'Users', icon: UsersIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "border-emerald-600 text-emerald-600" 
                    : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-200"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'requests' && (
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Stats Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                {[
                  { label: 'Total Users', value: usersList.length.toString(), icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Books Issued', value: '458', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Pending Requests', value: requests.filter(r => r.status === 'pending').length.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Success Rate', value: '98.2%', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
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

              <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-bold text-zinc-900">Recent Book Requests</h2>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                      <input 
                        type="text" 
                        placeholder="Search requests..." 
                        className="rounded-xl bg-zinc-50 py-2 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-100 text-xs font-bold uppercase tracking-wider text-zinc-400">
                        <th className="pb-4 px-4">Book Title</th>
                        <th className="pb-4 px-4">Requested By</th>
                        <th className="pb-4 px-4">Date</th>
                        <th className="pb-4 px-4 text-center">Status</th>
                        <th className="pb-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {requests.map((req) => (
                        <tr key={req.id} className="group transition-colors hover:bg-zinc-50/50">
                          <td className="py-4 px-4 font-bold text-zinc-900">{req.bookTitle}</td>
                          <td className="py-4 px-4 text-sm text-zinc-600">{req.userName}</td>
                          <td className="py-4 px-4 text-sm text-zinc-500">{req.requestDate}</td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center">
                              <span className={cn(
                                "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                                req.status === 'approved' ? "bg-emerald-100 text-emerald-700" :
                                req.status === 'rejected' ? "bg-red-100 text-red-700" :
                                "bg-amber-100 text-amber-700"
                              )}>
                                {req.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-end gap-2">
                              {req.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleApprove(req.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm transition-all hover:bg-emerald-600"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleReject(req.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white shadow-sm transition-all hover:bg-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-8 lg:grid-cols-3"
            >
              {/* Add Book Form */}
              <div className="lg:col-span-1">
                <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                  <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-emerald-600" />
                    Add New Book
                  </h2>
                  <form onSubmit={handleAddBook} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400">Title</label>
                      <input 
                        type="text"
                        value={newBook.title}
                        onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                        className="mt-1 w-full rounded-xl bg-zinc-50 px-4 py-2 text-sm ring-1 ring-black/5 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Book Title"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400">Author</label>
                      <input 
                        type="text"
                        value={newBook.author}
                        onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                        className="mt-1 w-full rounded-xl bg-zinc-50 px-4 py-2 text-sm ring-1 ring-black/5 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Author Name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400">Genre</label>
                      <input 
                        type="text"
                        value={newBook.genre}
                        onChange={(e) => setNewBook({...newBook, genre: e.target.value})}
                        className="mt-1 w-full rounded-xl bg-zinc-50 px-4 py-2 text-sm ring-1 ring-black/5 focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g. Fiction"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-500 active:scale-95"
                    >
                      Add to Catalog
                    </button>
                  </form>
                </section>
              </div>

              {/* Catalog List */}
              <div className="lg:col-span-2">
                <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-900">Book Catalog</h2>
                    <span className="text-sm font-medium text-zinc-500">{booksList.length} Books</span>
                  </div>
                  <div className="grid gap-4">
                    {booksList.map((book) => (
                      <div key={book.id} className="flex items-center justify-between rounded-2xl bg-zinc-50 p-4 transition-all hover:bg-zinc-100/50">
                        <div className="flex items-center gap-4">
                          <img src={book.cover} alt={book.title} className="h-16 w-12 rounded-lg object-cover shadow-sm" />
                          <div>
                            <h3 className="font-bold text-zinc-900">{book.title}</h3>
                            <p className="text-xs text-zinc-500">{book.author} • {book.genre}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveBook(book.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-zinc-900">Registered Users</h2>
                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700">
                    <UsersIcon className="h-3 w-3" />
                    {usersList.length} Total Members
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {usersList.map((user) => (
                    <div key={user.id} className="group relative overflow-hidden rounded-3xl bg-zinc-50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 ring-1 ring-black/5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-black/5">
                          <UserCircle className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-zinc-900">{user.name}</h3>
                            <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                              {user.role}
                            </span>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                              <Search className="h-3 w-3" /> {/* Using search as placeholder for email icon if not imported */}
                              {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                              <Zap className="h-3 w-3" /> {/* Using zap as placeholder for phone icon if not imported */}
                              {user.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                              <Filter className="h-3 w-3" /> {/* Using filter as placeholder for address icon if not imported */}
                              {user.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
