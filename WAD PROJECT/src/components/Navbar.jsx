import { NavLink } from 'react-router-dom';
import { User, Map, Ticket, Star } from 'lucide-react';
import './Navbar.css'; // Let's make a mini css or just use index.css

export default function Navbar() {
  const navItems = [
    { path: '/profile', icon: <User size={18} />, label: 'Profile' },
    { path: '/trips', icon: <Map size={18} />, label: 'Trips' },
    { path: '/bookings', icon: <Ticket size={18} />, label: 'My Bookings' },
    { path: '/subscriptions', icon: <Star size={18} />, label: 'Subscriptions' },
  ];

  return (
    <>
      <nav className="bottom-navbar">
        <div className="nav-container">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="icon-container">
                {item.icon}
              </div>
              <span className="nav-label">{item.label}</span>
              <div className="active-dot"></div>
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="footer-text">© 24071A05M4@manzil</div>
    </>
  );
}
