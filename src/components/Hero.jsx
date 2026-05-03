import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { LogIn, Zap, Shield, Globe } from 'lucide-react';

const Hero = () => {
  const features = [
    { icon: <Zap size={20} />, text: "Instant Sync" },
    { icon: <Shield size={20} />, text: "Secure Auth" },
    { icon: <Globe size={20} />, text: "Cloud Access" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 text-xs font-bold mb-8 animate-bounce">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Let's get you organized!
      </div>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-tight">
        Master Your Notes 📝<br />
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
          With Noddy Buddy 
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
        Organize, edit, and access your study materials from anywhere. 
        Designed specifically for fast-paced student life.
      </p>

      {/* Action Button */}
      <button 
        onClick={() => signInWithPopup(auth, googleProvider)}
        className="group relative bg-white text-black px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-3"
      >
        <LogIn className="group-hover:translate-x-1 transition-transform" />
        GET STARTED WITH GOOGLE
      </button>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-6 mt-20">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-slate-500 font-medium">
            <div className="text-indigo-500">{f.icon}</div>
            {f.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;