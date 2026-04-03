import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title text-green">Profile</h1>
          <p className="page-subtitle">Manage your account</p>
        </div>
        <span className={`badge badge-${user?.plan}`} style={{ textTransform: 'capitalize' }}>
          {user?.plan} Plan
        </span>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Personal Info</h2>
          <button style={{ color: 'var(--secondary-blue)', fontWeight: 600 }} onClick={() => editing ? handleSave() : setEditing(true)}>
            {editing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="form-grid" style={{ marginBottom: '16px' }}>
          <div className="input-group">
            <label>Full Name</label>
            {editing ? <input name="fullName" value={formData.fullName} onChange={handleChange} /> : <div style={{ padding: '8px 0', fontWeight: 500 }}>{user?.fullName}</div>}
          </div>
          <div className="input-group">
            <label>City</label>
            {editing ? <input name="city" value={formData.city} onChange={handleChange} /> : <div style={{ padding: '8px 0', fontWeight: 500 }}>{user?.city}</div>}
          </div>
        </div>

        <div className="form-grid" style={{ marginBottom: '16px' }}>
          <div className="input-group">
            <label>Email</label>
            <div style={{ padding: '8px 0', fontWeight: 500, color: 'var(--text-muted)' }}>{user?.email}</div>
          </div>
          <div className="input-group">
            <label>Phone</label>
            {editing ? <input name="phone" value={formData.phone} onChange={handleChange} /> : <div style={{ padding: '8px 0', fontWeight: 500 }}>{user?.phone}</div>}
          </div>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>Age</label>
            {editing ? <input name="age" type="number" value={formData.age} onChange={handleChange} /> : <div style={{ padding: '8px 0', fontWeight: 500 }}>{user?.age}</div>}
          </div>
          <div className="input-group">
            <label>Gender</label>
            {editing ? (
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            ) : <div style={{ padding: '8px 0', fontWeight: 500 }}>{user?.gender}</div>}
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={() => setShowPasswordModal(true)}
          style={{ width: '100%', padding: '12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)' }}
        >
          🔑 Change Password
        </button>
        <button 
          onClick={signOut}
          style={{ width: '100%', padding: '12px', textAlign: 'left', fontWeight: 600, color: '#E74C3C' }}
        >
          🚪 Sign Out
        </button>
      </div>

      {showPasswordModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '90%', maxWidth: '350px' }}>
            <h3 style={{ marginBottom: '16px' }}>Change Password</h3>
            <input type="password" placeholder="Old Password" style={{ marginBottom: '12px' }} />
            <input type="password" placeholder="New Password" style={{ marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => setShowPasswordModal(false)}>Update</button>
              <button style={{ flex: 1, backgroundColor: '#f5f5f5', borderRadius: 'var(--radius-md)', fontWeight: 600 }} onClick={() => setShowPasswordModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
