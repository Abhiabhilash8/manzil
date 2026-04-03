import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-container">
      
      <div className="hero-section" style={{ flexDirection: 'row', textAlign: 'left', gap: '40px', justifyContent: 'space-between', padding: '60px 20px', maxWidth: '1200px' }}>
        
        {/* Left Column: Text & CTA */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="hero-title" style={{ textAlign: 'left', margin: '0 0 20px 0', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Rest Easy.<br/>We'll Wake You.
          </h2>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: '0 0 40px 0', maxWidth: '500px' }}>
            Manzil is your ultimate travel companion. Let us handle the smart alerts, live weather, and bookings so you can relax entirely.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                Start Sleeping
              </button>
            </Link>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem', backgroundColor: 'transparent', color: 'var(--primary-green)', border: '2px solid var(--primary-green)', boxShadow: 'none' }}>
                Sign In
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column: Motion UI Illustration */}
        <div style={{ flex: '1.2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="motion-hero-container">
            <img src="/motion-ui-hero.png" alt="Woman sleeping peacefully in a bus" className="motion-hero-img" />
            
            {/* Superimposed Floating UI Badge */}
            <div className="motion-badge">
              <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>📍</span>
              <div className="motion-badge-text">
                Destination 500m Away<br/>
                <span style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 500 }}>Alarm Active • Sleep Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card green">
          <div className="feature-icon">🔔</div>
          <h3 style={{ color: 'var(--primary-green)', marginBottom: '16px', fontSize: '1.5rem' }}>Smart Alerts</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Never miss your stop again. Get intelligent notifications precisely when you need to prepare for arrival based on real-time transit data.
          </p>
        </div>

        <div className="feature-card blue">
          <div className="feature-icon">🌤️</div>
          <h3 style={{ color: 'var(--secondary-blue)', marginBottom: '16px', fontSize: '1.5rem' }}>Live Weather</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Access real-time conditions and highly accurate 5-day forecasts for all your destinations directly within your itinerary dashboard.
          </p>
        </div>

        <div className="feature-card brown">
          <div className="feature-icon">🎫</div>
          <h3 style={{ color: 'var(--accent-brown)', marginBottom: '16px', fontSize: '1.5rem' }}>Quick Bookings</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Compare top operators like AbhiBus, RedBus, and Goibibo instantly. Secure the best rates and manage your tickets flawlessly.
          </p>
        </div>
      </div>
      
      <div style={{ padding: '20px', fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.5, textAlign: 'center' }}>
        © 24071A05M4@manzil Designed for Modern Travelers
      </div>
    </div>
  );
}
