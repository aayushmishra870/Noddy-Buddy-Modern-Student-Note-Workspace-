import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { Plus, BookOpen, X, Trash2, Edit3, Save, Sparkles, Clock } from 'lucide-react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Dashboard = ({ user, notes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    setIsSaving(true);
    await addDoc(collection(db, "notes"), {
      title, content, userId: user.uid, createdAt: new Date()
    });
    setTitle(''); setContent('');
    setIsSaving(false);
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "notes", selectedNote.id), { 
      title: selectedNote.title, content: selectedNote.content 
    });
    setSelectedNote(null);
  };

  const deleteNote = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this note forever?")) {
      await deleteDoc(doc(db, "notes", id));
      setSelectedNote(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Navbar user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          
          {/* LEFT: CREATE PANEL */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] sticky top-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
                  <Sparkles size={18}/>
                </div>
                <h3 className="font-black text-white tracking-tight italic">NEW THOUGHT</h3>
              </div>
              
              <form onSubmit={handleSaveNote} className="space-y-6">
                <input 
                  value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note Headline..." 
                  className="w-full bg-transparent text-2xl font-bold outline-none text-white placeholder:text-slate-700"
                />
                <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
                <textarea 
                  value={content} onChange={(e) => setContent(e.target.value)}
                  placeholder="Dump your knowledge here..." 
                  className="w-full bg-transparent outline-none text-slate-400 min-h-[250px] resize-none leading-relaxed text-lg"
                />
                <button 
                  disabled={isSaving}
                  type="submit" 
                  className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
                >
                  {isSaving ? "SYNCING..." : <><Save size={18}/> SAVE TO CLOUD</>}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: LIST PANEL */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="font-bold text-slate-500 uppercase tracking-widest text-xs flex items-center gap-2">
                <BookOpen size={14}/> Library Collection ({notes.length})
              </h3>
              <div className="text-[10px] bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full font-bold border border-emerald-500/20">
                LIVE SYNC ON
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map(note => (
                <div 
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className="group bg-slate-900/20 hover:bg-slate-800/40 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-[2rem] transition-all cursor-pointer relative"
                >
                  <div className="flex flex-col h-full">
                    <h4 className="text-white font-black text-xl mb-3 group-hover:text-indigo-400 transition-colors truncate">
                      {note.title}
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6">
                      {note.content}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                        <Clock size={12}/> 
                        {note.createdAt?.toDate().toLocaleDateString()}
                      </div>
                      <button 
                        onClick={(e) => deleteNote(note.id, e)}
                        className="p-2 bg-slate-800 rounded-xl text-slate-500 hover:bg-red-500/20 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {notes.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-600">
                <div className="w-12 h-12 bg-slate-800 rounded-full mb-4 animate-pulse"></div>
                <p className="font-bold italic">Your library is empty. Start writing!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULL SCREEN READER MODAL */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-slate-800 p-12 relative shadow-3xl">
            <button 
              onClick={() => setSelectedNote(null)} 
              className="fixed md:absolute top-8 right-8 p-3 bg-slate-800 hover:bg-indigo-600 text-white rounded-full transition-all"
            >
              <X size={24}/>
            </button>
            
            <div className="max-w-2xl mx-auto">
                <input 
                  value={selectedNote.title} 
                  onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                  className="bg-transparent text-5xl font-black text-white outline-none mb-10 w-full tracking-tighter"
                />
                <textarea 
                  value={selectedNote.content} 
                  onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
                  className="bg-transparent text-slate-400 text-xl outline-none w-full min-h-[400px] leading-relaxed resize-none mb-12"
                />
                <div className="flex justify-between items-center border-t border-slate-800 pt-10">
                  <button 
                    onClick={() => deleteNote(selectedNote.id, {stopPropagation:()=>{}})}
                    className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-500/10 px-6 py-3 rounded-2xl"
                  >
                    <Trash2 size={20}/> ERASE
                  </button>
                  <button 
                    onClick={handleUpdate}
                    className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20 flex items-center gap-2"
                  >
                    <Edit3 size={20}/> SYNC CHANGES
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;