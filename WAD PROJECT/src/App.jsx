import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Trips from './pages/Trips';
import MyBookings from './pages/MyBookings';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';
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
      <div className="global-header">
        <h1>MANZIL</h1>
      </div>
      
      {user && <WeatherWidget />}
      
      <div className="main-content-wrapper">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/trips" /> : <Landing />} />
          <Route path="/signin" element={user ? <Navigate to="/trips" /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/trips" /> : <SignUp />} />
          
          <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>

      {user && <Navbar />}
    </>
  );
}

export default App;
