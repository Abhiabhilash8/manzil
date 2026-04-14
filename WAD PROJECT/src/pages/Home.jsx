import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Map, Ticket, Star, ClipboardList, Trash2, Plus, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Home() {
  const { user } = useAuth();
  const userName = user?.fullName?.split(' ')[0] || 'Traveler';

  // TODO State
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('manzil-todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Check weather for college', completed: false },
      { id: 2, text: 'Book bus for weekend trip', completed: false }
    ];
  });
  const [showTodos, setShowTodos] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const todoPanelRef = useRef(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('manzil-todos', JSON.stringify(todos));
  }, [todos]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (todoPanelRef.current && !todoPanelRef.current.contains(e.target) && !e.target.closest('.todo-trigger')) {
        setShowTodos(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    setTodos([newTask, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    
    // Auto-remove after 600ms if checked
    setTimeout(() => {
      setTodos(prev => prev.filter(t => t.id !== id || !t.completed));
    }, 600);
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <PageTransition>
      <div className="page-container" style={{ padding: '24px', maxWidth: '750px', marginLeft: '40px', marginRight: 'auto', zIndex: 1, position: 'relative' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexDirection: 'column', gap: '8px' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'white', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
            Welcome back,<br/> {userName}!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>Where are we heading today?</p>
        </div>

        <div className="features-grid" style={{ padding: '0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '100%' }}>
          
          <div className="feature-card green" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
               <Map size={32} color="var(--primary-green)" />
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Plan a Trip</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>Set smart destinations alerts and live weather tracking for your next journey.</p>
            <Link to="/trips" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', border: '1px solid rgba(255,255,255,0.4)' }}>Start Planning</button>
            </Link>
          </div>

          <div className="feature-card blue" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
               <Ticket size={32} color="var(--secondary-blue)" />
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>My Bookings</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>Manage your upcoming bus, flight, and train tickets effortlessly.</p>
            <Link to="/bookings" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--secondary-blue)', border: '1px solid rgba(255,255,255,0.4)' }}>View Tickets</button>
            </Link>
          </div>

          <div className="feature-card brown" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)', gridColumn: 'span 2' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
               <Star size={32} color="var(--accent-brown)" />
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Premium Features</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>Unlock insights, faster alerts, and exclusive discounts.</p>
            <Link to="/subscriptions" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-brown)', border: '1px solid rgba(255,255,255,0.4)' }}>Upgrade Now</button>
            </Link>
          </div>
        </div>

        {/* Change 1: TODO Widget */}
        <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 1000 }}>
          {/* Floating Action Button */}
          <button 
            className="todo-trigger"
            onClick={() => setShowTodos(!showTodos)}
            style={{ 
              width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-green)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(45, 106, 79, 0.4)',
              border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'transform 0.2s',
              transform: showTodos ? 'rotate(90deg)' : 'rotate(0)'
            }}
          >
            {showTodos ? <X size={24} /> : <ClipboardList size={24} />}
          </button>

          {/* Expanded Panel */}
          <div 
            ref={todoPanelRef}
            style={{ 
              position: 'absolute', bottom: '72px', left: '0', width: '320px', maxHeight: '420px',
              background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)', borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              opacity: showTodos ? 1 : 0,
              transform: showTodos ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(40px)',
              pointerEvents: showTodos ? 'all' : 'none',
              transformOrigin: 'bottom left'
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClipboardList size={18} /> My Trip Tasks
              </h3>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }} className="custom-scrollbar">
              <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                  type="text" 
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a task..." 
                  style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', color: 'white', fontSize: '0.9rem' }}
                />
                <button type="submit" style={{ background: 'var(--primary-green)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Plus size={18} />
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {todos.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '20px 0' }}>No tasks. Ready for your trip! ⛵</p>
                ) : todos.map(todo => (
                  <div 
                    key={todo.id} 
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: 'var(--radius-sm)', 
                      background: 'rgba(255,255,255,0.05)', transition: 'all 0.3s',
                      opacity: todo.completed ? 0.5 : 1
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary-green)', cursor: 'pointer' }}
                    />
                    <span style={{ flex: 1, color: 'white', fontSize: '0.9rem', textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.text}
                    </span>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer', padding: '4px', opacity: 0.7 }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        `}</style>
      </div>
    </PageTransition>
  );
}
