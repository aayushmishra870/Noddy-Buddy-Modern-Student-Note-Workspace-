import React from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onClick, onDelete }) => {
  return (
    <div 
      onClick={() => onClick(note)}
      className="flex items-center justify-between bg-slate-900/30 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 cursor-pointer transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
          <ChevronRight size={18}/>
        </div>
        <span className="font-bold text-slate-200 truncate max-w-xs md:max-w-md">{note.title}</span>
      </div>
      <button onClick={(e) => onDelete(note.id, e)} className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 size={18}/>
      </button>
    </div>
  );
};

export default NoteCard;