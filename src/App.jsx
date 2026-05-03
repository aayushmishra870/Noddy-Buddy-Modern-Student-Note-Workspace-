import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const q = query(collection(db, "notes"), where("userId", "==", currentUser.uid));
        onSnapshot(q, (snapshot) => {
          setNotes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="h-screen bg-[#0f172a] flex items-center justify-center text-white italic font-black text-3xl animate-pulse">NODDY...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {!user ? <Login /> : <Dashboard user={user} notes={notes} />}
    </div>
  );
}

export default App;