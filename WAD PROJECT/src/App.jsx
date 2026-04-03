import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Trips from './pages/Trips';
import MyBookings from './pages/MyBookings';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WeatherWidget from './components/WeatherWidget';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" />;
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="home-bg-layer"></div>
      <div className="home-bg-overlay"></div>

      {user && <Navbar />}
      {user && <WeatherWidget />}
      
      <div className="main-content-wrapper" style={{ paddingTop: user ? '80px' : '0', position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
          
          <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
