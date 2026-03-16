import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Save, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    bio: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-zinc-200/50 ring-1 ring-black/5"
        >
          <div className="bg-zinc-900 px-8 py-12 text-white">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
                <User className="h-12 w-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{profile.name || 'My Profile'}</h1>
                <p className="text-zinc-400">Manage your personal information</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-xl border-0 bg-zinc-50 py-3 pl-10 text-zinc-900 ring-1 ring-inset ring-zinc-200 focus:ring-2 focus:ring-emerald-600"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full rounded-xl border-0 bg-zinc-50 py-3 pl-10 text-zinc-900 ring-1 ring-inset ring-zinc-200 focus:ring-2 focus:ring-emerald-600"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-xl border-0 bg-zinc-50 py-3 pl-10 text-zinc-900 ring-1 ring-inset ring-zinc-200 focus:ring-2 focus:ring-emerald-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="w-full rounded-xl border-0 bg-zinc-50 py-3 pl-10 text-zinc-900 ring-1 ring-inset ring-zinc-200 focus:ring-2 focus:ring-emerald-600"
                    placeholder="123 Library St, Booktown"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-bold text-zinc-700">Bio</label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full rounded-xl border-0 bg-zinc-50 p-4 text-zinc-900 ring-1 ring-inset ring-zinc-200 focus:ring-2 focus:ring-emerald-600"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-lg active:scale-95"
              >
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
