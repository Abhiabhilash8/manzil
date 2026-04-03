import { useState, useEffect, useRef } from 'react';
import TripCard from '../components/TripCard';
import RealMap from '../components/RealMap';
import WeatherForecastChart from '../components/WeatherForecastChart';
import { calculateDistance, getCoordinates, getLocationName } from '../utils/locationService';

export default function Trips() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    alertType: 'time', // 'time' or 'location'
    alertTime: '15 min',
    radius: '1 km',
    mode: 'Bus',
    fromCoords: null, // {lat, lon, name}
    toCoords: null    // {lat, lon, name}
  });
  const [submitted, setSubmitted] = useState(false);
  const [trips, setTrips] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const audioRef = useRef(null);
  
  // Mock forecast data for chart
  const mockForecast = [
    { time: '10:00', temp: 24, feelsLike: 26, humidity: 60, description: 'Clear sky' },
    { time: '13:00', temp: 28, feelsLike: 30, humidity: 55, description: 'Sunny' },
    { time: '16:00', temp: 27, feelsLike: 29, humidity: 65, description: 'Partly cloudy' },
    { time: '19:00', temp: 22, feelsLike: 22, humidity: 70, description: 'Clear' },
    { time: '22:00', temp: 19, feelsLike: 19, humidity: 75, description: 'Cool' },
  ];

  const [trackingTrip, setTrackingTrip] = useState(null);
  const [currentDist, setCurrentDist] = useState(null);

  // Geolocation watcher
  useEffect(() => {
    let watcher = null;
    
    const checkProximity = async (position) => {
      const { latitude, longitude } = position.coords;
      
      let targetLat, targetLon;
      if (trackingTrip.toCoords) {
        targetLat = trackingTrip.toCoords.lat;
        targetLon = trackingTrip.toCoords.lon; // FIXED: from lng
      } else {
        const coords = await getCoordinates(trackingTrip.to);
        targetLat = coords.lat;
        targetLon = coords.lon;
      }

      const distance = calculateDistance(latitude, longitude, targetLat, targetLon);
      setCurrentDist(distance.toFixed(3));

      // Radius unit conversion
      const radiusValue = parseFloat(trackingTrip.radius);
      const isMeters = trackingTrip.radius.includes('m') && !trackingTrip.radius.includes('km');
      const radiusInKm = isMeters ? radiusValue / 1000 : radiusValue;

      if (distance <= radiusInKm) {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.warn("Audio play blocked", e));
        }
        setIsAlarmRinging(true);
        setTrackingTrip(null); 
      }
    };

    if (trackingTrip && trackingTrip.alertType === 'location') {
      // Immediate check
      navigator.geolocation.getCurrentPosition(checkProximity, (err) => console.error(err));
      
      // Continuous watcher
      watcher = navigator.geolocation.watchPosition(
        checkProximity,
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
    return () => {
      if (watcher) navigator.geolocation.clearWatch(watcher);
    };
  }, [trackingTrip]);

  const handleMapSelect = async (lat, lng, mode) => {
    const name = await getLocationName(lat, lng);
    if (mode === 'source') {
      setFormData(prev => ({ 
        ...prev, 
        from: name, 
        fromCoords: { lat, lon: lng, name } 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        to: name, 
        toCoords: { lat, lon: lng, name } 
      }));
    }
  };

  const handleQuickTrip = (from, to) => {
    setFormData(prev => ({ ...prev, from, to }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newTrip = { ...formData };
    setTrips([newTrip, ...trips]);

    if (newTrip.alertType === 'location') {
      setTrackingTrip(newTrip);
    }
    
    // reset form
    setFormData({
      from: '', to: '', date: '', time: '', alertType: 'time', alertTime: '15 min', radius: '1 km', mode: 'Bus',
      fromCoords: null, toCoords: null
    });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleStopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlarmRinging(false);
  };

  return (
    <div className="page-container">
      {isAlarmRinging && (
        <div style={{ position: 'sticky', top: '80px', zIndex: 2000, margin: '0 16px 16px 16px', padding: '16px', background: '#d00000', color: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 8px 32px rgba(208, 0, 0, 0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', animation: 'pulse 2s infinite' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem' }}>📍</span> Destination Reached!
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>You have entered the alert radius.</p>
          <button 
            onClick={handleStopAlarm}
            style={{ padding: '8px 24px', background: 'white', color: '#d00000', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          >
            STOP ALARM
          </button>
        </div>
      )}

      <div className="page-header">
        <h1 className="page-title text-green">{trackingTrip ? 'Transit Mode' : 'Plan a Trip'}</h1>
        <p className="page-subtitle">{trackingTrip ? 'Rest easy, we will wake you.' : 'Schedule your journey and get alerts'}</p>
      </div>

      {trackingTrip ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
          <div className="motion-hero-container" style={{ marginBottom: '40px' }}>
            <img src="/motion-ui-hero.png" alt="Woman sleeping peacefully in a bus" className="motion-hero-img" />
            
            {/* Superimposed Floating UI Badge */}
            <div className="motion-badge">
              <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>📍</span>
              <div className="motion-badge-text">
                Destination: {trackingTrip.to}<br/>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Currently <strong style={{color: 'var(--primary-green)'}}>{currentDist || '...'} km</strong> away</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setTrackingTrip(null)}
            className="btn-primary"
            style={{ backgroundColor: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', boxShadow: 'none' }}
          >
            Cancel Trip Tracking
          </button>
        </div>
      ) : (
        <>

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
              <label>Alert Trigger</label>
              <select name="alertType" value={formData.alertType} onChange={handleChange}>
                <option value="time">Time-based</option>
                <option value="location">Location-based</option>
              </select>
            </div>
            
            {formData.alertType === 'time' ? (
              <div className="input-group">
                <label>Alert me</label>
                <select name="alertTime" value={formData.alertTime} onChange={handleChange}>
                  <option>15 min</option>
                  <option>30 min</option>
                  <option>1 hour</option>
                </select>
              </div>
            ) : (
              <div className="input-group">
                <label>Alert Radius</label>
                <select name="radius" value={formData.radius} onChange={handleChange}>
                  <option>500 m</option>
                  <option>1 km</option>
                  <option>2 km</option>
                  <option>5 km</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-grid">
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
            🎉 {formData.alertType === 'location' ? 'Location tracking active!' : 'Trip scheduled successfully!'}
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

      <RealMap 
        source={formData.fromCoords}
        destination={formData.toCoords} 
        radius={formData.radius}
        onLocationSelect={handleMapSelect}
      />
      </>
      )}

      {/* Hidden audio element for the alarm */}
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" 
        preload="auto"
        loop
      />

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
