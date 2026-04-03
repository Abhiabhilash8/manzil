import { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';
import MapPlaceholder from '../components/MapPlaceholder';
import WeatherForecastChart from '../components/WeatherForecastChart';

export default function Trips() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    alertTime: '15 min',
    mode: 'Bus'
  });
  const [submitted, setSubmitted] = useState(false);
  const [trips, setTrips] = useState([]);
  const [showChart, setShowChart] = useState(false);
  
  // Mock forecast data for chart
  const mockForecast = [
    { time: '10:00', temp: 24, feelsLike: 26, humidity: 60, description: 'Clear sky' },
    { time: '13:00', temp: 28, feelsLike: 30, humidity: 55, description: 'Sunny' },
    { time: '16:00', temp: 27, feelsLike: 29, humidity: 65, description: 'Partly cloudy' },
    { time: '19:00', temp: 22, feelsLike: 22, humidity: 70, description: 'Clear' },
    { time: '22:00', temp: 19, feelsLike: 19, humidity: 75, description: 'Cool' },
  ];

  const handleQuickTrip = (from, to) => {
    setFormData(prev => ({ ...prev, from, to }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTrips([{ ...formData }, ...trips]);
    
    // reset form
    setFormData({
      from: '', to: '', date: '', time: '', alertTime: '15 min', mode: 'Bus'
    });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title text-green">Plan a Trip</h1>
        <p className="page-subtitle">Schedule your journey and get alerts</p>
      </div>

      <div className="card" style={{ marginBottom: '8px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Quick Trips</h3>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          <button onClick={() => handleQuickTrip('Home', 'College')} className="badge badge-basic" style={{ cursor: 'pointer', border: '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>
            Home → College
          </button>
          <button onClick={() => handleQuickTrip('Hostel', 'Station')} className="badge badge-basic" style={{ cursor: 'pointer', border: '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>
            Hostel → Station
          </button>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>From</label>
              <input type="text" name="from" required value={formData.from} onChange={handleChange} placeholder="Current City" />
            </div>
            <div className="input-group">
              <label>To</label>
              <input type="text" name="to" required value={formData.to} onChange={handleChange} placeholder="Destination" />
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Time</label>
              <input type="time" name="time" required value={formData.time} onChange={handleChange} />
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Alert me</label>
              <select name="alertTime" value={formData.alertTime} onChange={handleChange}>
                <option>15 min</option>
                <option>30 min</option>
                <option>1 hour</option>
              </select>
            </div>
            <div className="input-group">
              <label>Mode</label>
              <select name="mode" value={formData.mode} onChange={handleChange}>
                <option>Bus</option>
                <option>Train</option>
                <option>Flight</option>
                <option>Cab</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
            Schedule Alert
          </button>
        </form>
        
        {submitted && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'rgba(45, 106, 79, 0.1)', color: 'var(--primary-green)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontWeight: 600 }}>
            🎉 Trip scheduled successfully! Alert is active.
          </div>
        )}
      </div>

      <div style={{ marginTop: '8px' }}>
        <button 
          onClick={() => setShowChart(!showChart)}
          style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--secondary-blue)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>🌤️ Destination Weather Forecast</span>
          <span>{showChart ? '▲' : '▼'}</span>
        </button>
        {showChart && (
          <div className="card" style={{ marginTop: '8px' }}>
            <WeatherForecastChart forecastData={mockForecast} />
          </div>
        )}
      </div>

      <MapPlaceholder />

      {trips.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-main)' }}>Your Active Trips</h2>
          {trips.map((trip, idx) => (
            <TripCard key={idx} {...trip} />
          ))}
        </div>
      )}
    </div>
  );
}
