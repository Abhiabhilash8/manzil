import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Map, Ticket, Star, ClipboardList, Trash2, Plus, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Home() {
  const { user } = useAuth();
  const userName = user?.fullName?.split(' ')[0] || 'Traveler';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  const featureSlides = [
    {
      id: 1,
      icon: '🗺️',
      title: 'Plan a Trip',
      subtitle: 'Schedule New Alert',
      description: 'Set From/To destinations, pick a date and time, choose time-based or location-based trigger and schedule your alert instantly.',
      accentColor: 'var(--primary-green)',
      borderColor: 'rgba(45,106,79,0.5)',
      glowColor: 'rgba(45,106,79,0.2)',
    },
    {
      id: 2,
      icon: '📍',
      title: 'Live Maps',
      subtitle: 'Interactive Destination Picker',
      description: 'Click anywhere on the live Leaflet map to pin your destination. Switch between Source and Destination modes seamlessly.',
      accentColor: '#7FB3D5',
      borderColor: 'rgba(127,179,213,0.5)',
      glowColor: 'rgba(127,179,213,0.2)',
    },
    {
      id: 3,
      icon: '🌤️',
      title: 'Weather Forecast',
      subtitle: 'Destination Weather Chart',
      description: 'View temperature, feels-like, and humidity trends across the day for your destination with a clean multi-line chart.',
      accentColor: '#7FB3D5',
      borderColor: 'rgba(127,179,213,0.4)',
      glowColor: 'rgba(127,179,213,0.15)',
    },
    {
      id: 4,
      icon: '⭐',
      title: 'Subscriptions',
      subtitle: 'Basic · Gold · Premium',
      description: 'Choose the plan that fits your travel style. Unlock Bus & Train bookings on Gold, and Live Flight Alerts on Premium.',
      accentColor: '#D4AF37',
      borderColor: 'rgba(212,175,55,0.5)',
      glowColor: 'rgba(212,175,55,0.2)',
    },
    {
      id: 5,
      icon: '👤',
      title: 'Profile',
      subtitle: 'Your Travel Identity',
      description: 'Manage your personal info, city, phone, age and gender. Change password and view your current active subscription plan.',
      accentColor: 'var(--accent-brown)',
      borderColor: 'rgba(139,90,43,0.5)',
      glowColor: 'rgba(139,90,43,0.2)',
    },
  ];

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('manzil-todos', JSON.stringify(todos));
  }, [todos]);

  // Carousel auto-play
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % featureSlides.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isPaused, featureSlides.length]);

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

        {/* Feature Showcase Carousel */}
        <div style={{ width: '100%', marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Outfit,sans-serif', opacity: 0.9, margin: 0 }}>
              ✨ Explore Features
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {featureSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
                  style={{
                    width: activeIndex === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: activeIndex === i ? 'var(--primary-green)' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              transform: `translateX(calc(-${activeIndex} * (280px + 16px)))`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            >
              {featureSlides.map((slide, i) => (
                <div
                  key={slide.id}
                  onClick={() => { setActiveIndex(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
                  style={{
                    minWidth: '280px',
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px 24px',
                    background: activeIndex === i
                      ? `linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))`
                      : 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(16px)',
                    border: activeIndex === i
                      ? `1px solid ${slide.borderColor}`
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: activeIndex === i
                      ? `0 8px 32px ${slide.glowColor}, 0 0 0 1px ${slide.borderColor}`
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    transform: activeIndex === i ? 'scale(1.02)' : 'scale(0.97)',
                    opacity: activeIndex === i ? 1 : 0.6,
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>{slide.icon}</div>
                  <div style={{
                    display: 'inline-block',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: slide.accentColor,
                    marginBottom: '8px',
                    background: `${slide.glowColor}`,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-pill)',
                    border: `1px solid ${slide.borderColor}`,
                  }}>
                    {slide.subtitle}
                  </div>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    fontFamily: 'Outfit,sans-serif',
                    fontWeight: 700,
                    margin: '8px 0 10px',
                  }}>
                    {slide.title}
                  </h4>
                  <p style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    margin: 0,
                    fontFamily: 'DM Sans,sans-serif',
                  }}>
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button
              onClick={() => { setActiveIndex(prev => (prev - 1 + featureSlides.length) % featureSlides.length); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            >‹</button>
            <button
              onClick={() => { setActiveIndex(prev => (prev + 1) % featureSlides.length); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            >›</button>
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
