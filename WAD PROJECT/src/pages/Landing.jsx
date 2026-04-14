import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignInForm } from './SignIn';
import { SignUpForm } from './SignUp';
import { ChevronLeft, ChevronRight, X, Map, Ticket, Star, CloudSun, MapPin, Bell, Globe } from 'lucide-react';

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authModal, setAuthModal] = useState(null); // null, 'signin', 'signup'
  const [featureIndex, setFeatureIndex] = useState(0);

  const features = [
    { icon: <MapPin size={48} />, title: 'Plan a Trip', desc: 'Schedule journeys with smart time or location-based alerts.', color: 'var(--primary-green)' },
    { icon: <Ticket size={48} />, title: 'My Bookings', desc: 'Manage all your bus, train and flight tickets in one place.', color: 'var(--secondary-blue)' },
    { icon: <Bell size={48} />, title: 'Smart Alerts', desc: 'Get precisely timed wake-up calls exactly when you need them.', color: 'var(--primary-green)' },
    { icon: <Star size={48} />, title: 'Premium Features', desc: 'Unlock live flight tracking, priority support, and exclusive deals.', color: '#D4AF37', isPremium: true }
  ];

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e) => {
      if (authModal) return;
      if (e.key === 'ArrowDown') {
        setCurrentSlide(prev => Math.min(prev + 1, 2));
      } else if (e.key === 'ArrowUp') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [authModal]);

  // Auto-rotating feature cards
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const slides = [
    { id: 'hero', label: 'Hero' },
    { id: 'features', label: 'Explore' },
    { id: 'join', label: 'Join Us' }
  ];

  const cardWidth = 450;
  const cardGap = 24;

  return (
    <div className="landing-paginated-container" style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 10
    }}>
      
      {/* Top Bar */}
      <div style={{
        position: 'fixed', top: 0, width: '100%', height: '64px', zIndex: 1000, background: 'rgba(5, 10, 15, 0.7)',
        backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        padding: '0 40px', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            onClick={() => setAuthModal('signin')}
            style={{ 
              padding: '8px 24px', borderRadius: 'var(--radius-pill)', border: '1px solid white', 
              color: 'white', fontWeight: 600, fontSize: '0.9rem', background: 'none', cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button 
            onClick={() => setAuthModal('signup')}
            className="btn-primary" 
            style={{ padding: '8px 24px', fontSize: '0.9rem' }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Pages Wrapper */}
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        transform: `translateY(-${currentSlide * 100}vh)`,
        transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)'
      }}>
        
        {/* Slide 0: Hero + Big Rotating Features */}
        <div style={{ 
          width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', paddingTop: '40px', textAlign: 'center', position: 'relative'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{
              fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(3rem, 10vw, 7rem)',
              letterSpacing: '0.15em', margin: 0, animation: 'manzil-glow 4s infinite ease-in-out',
              textTransform: 'uppercase', lineHeight: 1
            }}>
              MANZIL
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'white', opacity: 0.9, marginTop: '12px', letterSpacing: '4px', fontWeight: 300 }}>
              REST EASY. WE'LL WAKE YOU.
            </p>
          </div>

          <button 
            onClick={() => setAuthModal('signup')}
            className="btn-primary" 
            style={{ padding: '16px 56px', fontSize: '1.2rem', zIndex: 5, borderRadius: 'var(--radius-pill)', boxShadow: '0 8px 32px rgba(45, 106, 79, 0.4)' }}
          >
            Get Started →
          </button>

          {/* Change 5: BIG Rotating Feature Cards */}
          <div style={{ 
            marginTop: '50px', width: '100%', overflow: 'hidden', padding: '40px 0',
            position: 'relative', display: 'flex', alignItems: 'center'
          }}>
            {/* Nav Arrows */}
            <button 
              onClick={() => setFeatureIndex(prev => (prev - 1 + features.length) % features.length)}
              style={{ position: 'absolute', left: '40px', zIndex: 30, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
            ><ChevronLeft size={32} /></button>
            <button 
              onClick={() => setFeatureIndex(prev => (prev + 1) % features.length)}
              style={{ position: 'absolute', right: '40px', zIndex: 30, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
            ><ChevronRight size={32} /></button>

            {/* Cards Track */}
            <div style={{ 
              display: 'flex', gap: `${cardGap}px`, transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
              transform: `translateX(calc(50% - (${featureIndex * (cardWidth + cardGap)}px) - ${cardWidth / 2}px))`,
              width: `${features.length * (cardWidth + cardGap)}px`
            }}>
              {features.map((f, i) => (
                <div key={i} style={{ 
                  width: `${cardWidth}px`, height: '280px', flexShrink: 0, padding: '40px',
                  background: f.isPremium ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.12)', 
                  backdropFilter: 'blur(20px)', borderRadius: '40px', 
                  border: i === featureIndex ? `2px solid ${f.color}` : '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                  boxShadow: i === featureIndex ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${f.color}44` : 'none',
                  opacity: i === featureIndex ? 1 : 0.3,
                  transform: i === featureIndex ? 'scale(1.1)' : 'scale(0.85)',
                  transition: 'all 0.6s ease',
                  position: 'relative'
                }}>
                  {f.isPremium && (
                    <div style={{ position: 'absolute', top: '20px', right: '40px', background: '#D4AF37', color: 'black', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>PREMIUM</div>
                  )}
                  <div style={{ marginBottom: '20px', color: f.color, transform: i === featureIndex ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.6s ease' }}>{f.icon}</div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.8rem', color: 'white', fontWeight: 700 }}>{f.title}</h3>
                  <p style={{ margin: 0, fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, maxWidth: '320px' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explore Slide */}
        <div style={{ width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="features-grid" style={{ padding: '0 40px', gap: '32px' }}>
            {features.slice(0, 3).map((f, i) => (
              <div key={i} className={`feature-card ${['green', 'blue', 'brown'][i]}`}>
                <div className="feature-icon" style={{ fontSize: '2.5rem' }}>{f.icon}</div>
                <h3 style={{ marginBottom: '16px', fontSize: '1.5rem', fontWeight: 700 }}>{f.title}</h3>
                <p style={{ color: '#444', fontSize: '1.05rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Slide */}
        <div style={{ 
          width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '4.5rem', color: 'white', marginBottom: '24px', fontWeight: 800, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Join 10,000+ travelers</h2>
          <p style={{ fontSize: '1.5rem', color: 'white', opacity: 0.9, marginBottom: '48px', maxWidth: '600px', fontWeight: 300 }}>
            Experience the future of stress-free travel alerts and intelligent trip planning.
          </p>
          <button onClick={() => setAuthModal('signup')} className="btn-primary" style={{ padding: '24px 72px', fontSize: '1.5rem', borderRadius: 'var(--radius-pill)' }}>
            Sign Up Now
          </button>
          <div style={{ position: 'absolute', bottom: '30px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>
            © 2026 MANZIL | SMART TRAVEL INTELLIGENCE
          </div>
        </div>
      </div>

      {/* Auth Modal Overlay */}
      {authModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 5000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ position: 'relative', width: '90%', maxWidth: '420px', animation: 'scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <button 
              onClick={() => setAuthModal(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            ><X size={20} /></button>
            
            {authModal === 'signin' ? (
              <SignInForm onToggleAuth={(type) => setAuthModal(type)} />
            ) : (
              <SignUpForm onToggleAuth={(type) => setAuthModal(type)} />
            )}
          </div>
        </div>
      )}

      {/* Navigation Dot Indicators */}
      <div style={{ position: 'fixed', right: '32px', top: '50%', transform: 'translateY(-50%)', zIndex: 200, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {slides.map((slide, i) => (
          <div key={slide.id} onClick={() => setCurrentSlide(i)} style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentSlide === i ? 'white' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transform: currentSlide === i ? 'scale(1.8)' : 'scale(1)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
        ))}
      </div>

      {currentSlide < 2 && (
        <button onClick={() => setCurrentSlide(prev => prev + 1)} style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 200, width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'arrow-bounce 1.5s infinite ease-in-out', color: 'white', cursor: 'pointer' }}>
          <ChevronRight size={28} style={{ transform: 'rotate(90deg)' }} />
        </button>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
