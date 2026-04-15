import React, { useState, useEffect } from 'react';
import { ClipboardList, Check, Trash2, X } from 'lucide-react';

const TodoPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('manzil_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    localStorage.setItem('manzil_todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputVal.trim(),
        done: false,
      };
      setTodos([...todos, newTodo]);
      setInputVal('');
    }
  };

  const toggleDone = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    
    // Check if it's now done, and if so, schedule removal
    const item = todos.find(t => t.id === id);
    if (item && !item.done) {
        setTimeout(() => {
            setTodos(prev => prev.filter(t => t.id !== id));
        }, 1200);
    }
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const pendingCount = todos.filter(t => !t.done).length;
  const doneCount = todos.filter(t => t.done).length;

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 1100,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary-green)',
          boxShadow: '0 4px 24px rgba(45,106,79,0.5)',
          border: '1px solid rgba(255,255,255,0.25)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(45,106,79,0.65)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(45,106,79,0.5)';
        }}
      >
        <ClipboardList size={22} color="white" />
      </button>

      {/* Slide-in Panel */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          right: 0,
          height: 'calc(100vh - 64px)',
          width: '340px',
          zIndex: 1090,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          background: 'rgba(15,22,30,0.92)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardList size={18} color="var(--primary-green)" />
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'white', margin: 0 }}>Packing List</h2>
          </div>
          <span 
            onClick={() => setIsOpen(false)} 
            style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          >
            &times;
          </span>
        </div>

        {/* Add Task Row */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add item to pack..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: '0.9rem',
              fontFamily: 'DM Sans, sans-serif'
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-green)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            + Add
          </button>
        </div>

        {/* Task count summary */}
        <div style={{ padding: '8px 20px 4px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
          {pendingCount} items to pack · {doneCount} packed
        </div>

        {/* Task List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px 20px' }}>
          {todos.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2.5rem' }}>🧳</span>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', marginTop: '8px' }}>Nothing to pack yet</p>
            </div>
          ) : (
            todos.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  marginBottom: '6px',
                  borderRadius: 'var(--radius-md)',
                  background: item.done ? 'rgba(45,106,79,0.12)' : 'rgba(255,255,255,0.06)',
                  border: item.done ? '1px solid rgba(45,106,79,0.25)' : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  onClick={() => toggleDone(item.id)}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: item.done ? 'none' : '2px solid rgba(255,255,255,0.3)',
                    background: item.done ? 'var(--primary-green)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.done && <Check size={13} color="white" />}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: '0.9rem',
                    color: item.done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.9)',
                    textDecoration: item.done ? 'line-through' : 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  {item.text}
                </div>
                <div
                  onClick={() => deleteTodo(item.id)}
                  style={{
                    color: 'rgba(255,100,100,0.5)',
                    cursor: 'pointer',
                    padding: '2px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,100,100,0.9)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,100,100,0.5)'}
                >
                  <Trash2 size={15} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TodoPanel;
