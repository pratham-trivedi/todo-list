import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5100/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary-color)' }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;