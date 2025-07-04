import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RateCalculator from './RateCalculator';
// import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('sample');
  const [password, setPassword] = useState('sample');
  const [showRateCalculator, setShowRateCalculator] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Field validation
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Enter username to login';
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Enter password to login';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    // Demo credential check
    if (username === 'sample' && password === 'sample') {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/dashboard');
      }, 1000);
    } else {
      setErrors({
        username: '',
        password: 'Invalid username or password',
      });
    }
  };

  const handleImageError = (e) => {
    console.error('Failed to load image:', e.target.src);
    e.target.alt = 'Image not found';
  };

  const handleRateCalculatorClick = (e) => {
    e.preventDefault();
    setShowRateCalculator(true);
  };

  const handleCloseRateCalculator = () => {
    setShowRateCalculator(false);
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <div className="logo">
          <img src="/images/logo.svg" alt="Al Muzaini Exchange Logo" onError={handleImageError} />
          <h1>Al Muzaini Exchange</h1>
        </div>
        <div className="map">
          <img src="/images/map.svg" alt="World Map" onError={handleImageError} />
        </div>
        <p className="slogan">Always Near You - Since 1942</p>
        <p className="description">
          Transfer money safely, securely and conveniently with the number one exchange company in Kuwait.
        </p>
        <div className="links">
          <a href="#" className="link-with-icon" onClick={handleRateCalculatorClick}>
            <img src="/images/rc.svg" alt="Rate Calculator Icon" onError={handleImageError} />
            Rate Calculator
          </a>
          <a href="/branches" className="link-with-icon">
            <img src="/images/branches.svg" alt="Branches Icon" onError={handleImageError} />
            Branches
          </a>
          <a href="/support" className="link-with-icon">
            <img src="/images/support.svg" alt="Support Icon" onError={handleImageError} />
            Support
          </a>
        </div>
      </div>
      <div className="right-panel">
        <div className="language-switch">English ▼</div>
        <div className="form-group">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: '' }));
                }}
                required
                autoComplete="username"
              />
              {errors.username && (
                <div className="field-error">{errors.username}</div>
              )}
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                required
                autoComplete="current-password"
              />
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>
            <div className="forgot-links">
              <a href="/forgot-username">Forgot username?</a>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </form>
        </div>
        {showPopup && <div className="success-popup">Successfully logged in!</div>}
      </div>
      {showRateCalculator && <RateCalculator onClose={handleCloseRateCalculator} />}
    </div>
  );
};

export default Login;