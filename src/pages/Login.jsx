import React from 'react';
import Hero from '../components/Hero';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Glows (UI Decoration) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="text-2xl font-black italic tracking-tighter text-white">NODDY BUDDY</div>
        <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Future University</div>
      </nav>

      <Hero />
    </div>
  );
};

export default Login;