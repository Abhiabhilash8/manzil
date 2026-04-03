import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Map, Ticket, Star, Bell } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const userName = user?.name || 'Traveler';

  return (
    <div className="page-container" style={{ padding: '24px', maxWidth: '700px', marginLeft: '40px', marginRight: 'auto', zIndex: 1, position: 'relative' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'white', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
            Welcome back,<br/> {userName}!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)', marginTop: '8px' }}>Where are we heading today?</p>
        </div>
        
      </div>

      <div className="features-grid" style={{ padding: '0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '100%' }}>
        
        {/* Plan Trip Quick Action */}
        <div className="feature-card green" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
             <Map size={32} color="var(--primary-green)" />
          </div>
          <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Plan a Trip</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Set smart destinations alerts and live weather tracking for your next journey.</p>
          <Link to="/trips" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', border: '1px solid rgba(255,255,255,0.4)' }}>Start Planning</button>
          </Link>
        </div>

        {/* Bookings Action */}
        <div className="feature-card blue" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
             <Ticket size={32} color="var(--secondary-blue)" />
          </div>
          <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>My Bookings</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Manage your upcoming bus, flight, and train tickets effortlessly.</p>
          <Link to="/bookings" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', background: 'var(--secondary-blue)', border: '1px solid rgba(255,255,255,0.4)' }}>View Tickets</button>
          </Link>
        </div>

        {/* Premium Upgrade */}
        <div className="feature-card brown" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)', gridColumn: 'span 2' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
             <Star size={32} color="var(--accent-brown)" />
          </div>
          <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Premium Features</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Unlock insights, faster alerts, and exclusive discounts.</p>
          <Link to="/subscriptions" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-brown)', border: '1px solid rgba(255,255,255,0.4)' }}>Upgrade Now</button>
          </Link>
        </div>

      </div>
    </div>
  );
}
