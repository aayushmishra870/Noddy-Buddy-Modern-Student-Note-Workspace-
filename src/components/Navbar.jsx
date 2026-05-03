import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Navbar = ({ user }) => {
  return (
    <header className="flex justify-between items-center mb-16">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-indigo-500/20">N</div>
        <h2 className="text-2xl font-black tracking-tighter text-white uppercase">Noddy Workspace</h2>
      </div>
      <div className="flex items-center gap-4 bg-slate-900/50 p-2 pr-6 rounded-full border border-slate-800">
        <img src={user.photoURL} alt="pfp" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
        <span className="text-sm font-bold text-white ml-2">{user.displayName}</span>
        <button onClick={() => signOut(auth)} className="text-red-400 hover:text-red-300 transition-colors ml-4"><LogOut size={20}/></button>
      </div>
    </header>
  );
};

export default Navbar;