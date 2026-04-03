import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    gender: 'Male',
    city: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { confirmPassword, ...dataToSubmit } = formData;
      await signUp(dataToSubmit);
    } catch (err) {
      setError(err.message || 'Failed to configure account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2 className="page-title text-green" style={{ textAlign: 'center' }}>Create Account</h2>
        <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: '24px' }}>Join Manzil for smart alerts</p>
        
        {error && <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="fullName" required onChange={handleChange} value={formData.fullName} />
          </div>
          
          <div className="input-group">
            <label>Gmail</label>
            <input type="email" name="email" required onChange={handleChange} value={formData.email} />
          </div>
          
          <div className="form-grid">
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" required onChange={handleChange} value={formData.password} />
            </div>
            <div className="input-group">
              <label>Confirm</label>
              <input type="password" name="confirmPassword" required onChange={handleChange} value={formData.confirmPassword} />
            </div>
          </div>
          
          <div className="input-group">
            <label>Phone</label>
            <input type="tel" name="phone" required onChange={handleChange} value={formData.phone} />
          </div>
          
          <div className="form-grid">
            <div className="input-group">
              <label>Age</label>
              <input type="number" name="age" required onChange={handleChange} value={formData.age} />
            </div>
            <div className="input-group">
              <label>Gender</label>
              <select name="gender" onChange={handleChange} value={formData.gender}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          
          <div className="input-group">
            <label>City</label>
            <input type="text" name="city" required onChange={handleChange} value={formData.city} />
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '16px' }}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/signin" style={{ color: 'var(--primary-green)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
