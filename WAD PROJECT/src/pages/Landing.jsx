import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-container">
      
      <div className="hero-section">
        <h2 className="hero-title">
          Your Ultimate<br/>Travel Companion
        </h2>
        <p className="hero-subtitle">
          Smart alerts, live weather, and seamless bookings perfectly integrated into one beautiful, immersive experience.
        </p>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              Get Started
            </button>
          </Link>
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ 
              padding: '16px 40px', 
              fontSize: '1.1rem', 
              backgroundColor: 'transparent', 
              color: 'var(--primary-green)', 
              border: '2px solid var(--primary-green)',
              boxShadow: 'none'
            }}>
              Sign In
            </button>
          </Link>
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
