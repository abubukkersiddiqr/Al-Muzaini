import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [sendCurrency, setSendCurrency] = useState('KWD');
  const [receiveCurrency, setReceiveCurrency] = useState('PKR');
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeSection, setActiveSection] = useState('recent');
  const navigate = useNavigate();

  const currencyFlags = {
    KWD: '/images/KWD.svg',
    PKR: '/images/PKR.svg',
    USD: '/images/USD.svg',
    INR: '/images/INR.svg',
    ZAR: '/images/ZAR.svg',
  };

  const conversionRates = {
    'KWD-PKR': 906.6454,
    'KWD-USD': 3.262,
    'USD-PKR': 277.95,
    'PKR-KWD': 0.002989,
    'USD-KWD': 0.3066,
    'PKR-USD': 0.003597,
    'KWD-INR': 273.78,
    'INR-KWD': 0.003652,
    'KWD-ZAR': 60.45,
    'ZAR-KWD': 0.01654,
  };

  const statsData = [
    { title: 'Total Transactions', change: '+11.01%', value: '20', icon: '/images/tt.svg' },
    { title: 'Pending Transactions', change: '+11.01%', value: '20', icon: '/images/pt.svg' },
    { title: 'Exchange Rates', change: '+10.00%', value: '', icon: '/images/er.svg' },
    { title: 'Recent Transactions', change: '+11.01%', value: '', icon: '/images/rt.svg' },
  ];

  const transactions = [
    { id: 1, name: 'Rakeesh Namniar', amount: '100,000 KWD', date: '2025-07-01', bank: 'Bank' },
    { id: 2, name: 'Ali Mohammed', amount: '100,000 KWD', date: '2025-06-30', bank: 'Bank' },
    { id: 3, name: 'Fatima Ahmed', amount: '100,000 KWD', date: '2025-06-29', bank: 'Bank' },
    { id: 4, name: 'Sample 1', amount: '100,000 KWD', date: '2025-07-01', bank: 'Bank' },
    { id: 5, name: 'Sample 2', amount: '100,000 KWD', date: '2025-06-30', bank: 'Bank' },
    { id: 6, name: 'Sample 3', amount: '100,000 KWD', date: '2025-06-29', bank: 'Bank' },
  ];

  const favoriteBeneficiaries = [
    { id: 1, name: 'Rakeesh Namniar', amount: '100,000 KWD', bank: 'Bank' },
    { id: 2, name: 'Rakeesh Namniar', amount: '100,000 KWD', bank: 'Bank' },
    { id: 3, name: 'Rakeesh Namniar', amount: '100,000 KWD', bank: 'Bank' },
    { id: 4, name: 'Rakeesh Namniar', amount: '100,000 KWD', bank: 'Bank' },
    { id: 5, name: 'Rakeesh Namniar', amount: '100,000 KWD', bank: 'Bank' },
    { id: 6, name: 'Rakeesh Namniar', amount: '100,000 KWD', bank: 'Bank' },
    { id: 7, name: 'Rakeesh Namniar', amount: '100,000 KWD', bank: 'Bank' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const newZoom = Math.max(0.8, 1 - scrollY * 0.001);
      setZoomLevel(newZoom);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (sendAmount && sendCurrency && receiveCurrency) {
      const rateKey = `${sendCurrency}-${receiveCurrency}`;
      const rate = conversionRates[rateKey] || 1;
      setReceiveAmount((sendAmount * rate).toFixed(2));
    } else {
      setReceiveAmount('');
    }
  }, [sendAmount, sendCurrency, receiveCurrency]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date.includes(searchQuery)
    );
    setSearchResults(filteredResults);
  }, [searchQuery]);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const handleSwapCurrencies = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  const handleRepeatClick = (transaction) => {
    navigate('/repeat-transaction', { state: { transaction } });
  };

  const handleViewDetailsClick = (transaction) => {
    console.log(`View details for ${transaction.name}`);
  };

  return (
    <div className="dashboard-container" style={{ '--zoom-level': zoomLevel }}>
      <div className="left-nav">
        <div className="logo">
          <img src="/images/logo.svg" alt="Al Muzaini Exchange Logo" className="logo-white" />
        </div>
        <nav className="nav-menu">
          <button className="nav-btn home-btn">
            <span role="img" aria-label="home"></span> Home
          </button>
          <button className="nav-btn logout-btn" onClick={handleLogoutClick}>
            <span role="img" aria-label="logout">Logout</span> Logout
          </button>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h2>Welcome to Al-Muzaini Portal</h2>
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Something..."
            />
          </div>
          <div className="user-icons">
            <img src="/images/bell.svg" alt="Notification" className="notification-icon" />
            <img src="/images/profile.svg" alt="Profile" className="profile-icon" />
          </div>
        </div>

        <div className="dashboard-content">
          {searchQuery && (
            <div className="search-results" data-tilt>
              <h3>Search Results</h3>
              {searchResults.length > 0 ? (
                <div className="transaction-list">
                  {searchResults.map((transaction) => (
                    <div key={transaction.id} className="transaction-item" data-tilt>
                      <span className="transaction-name">{transaction.name}</span>
                      <span className="transaction-amount">{transaction.amount}</span>
                      <span className="transaction-date">{transaction.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No results found for "{searchQuery}"</p>
              )}
            </div>
          )}

          <div className="stats">
            {statsData.map((stat, index) => (
              <div className="stat-box" key={index} data-tilt>
                <img src={stat.icon} alt={`${stat.title} Icon`} className="stat-icon" />
                <span className="stat-title">{stat.title}</span>
                <span className="stat-change">{stat.change}</span>
                <div className="stat-value">{stat.value || ''}</div>
              </div>
            ))}
          </div>

          {/* 3-column grid: Rate Calculator | Rate Chart | Transactions */}
          <div className="main-section main-section-3col">
            <div className="rate-calculator" data-tilt>
              <h3>Rate Calculator <span role="img" aria-label="dollar">💵</span></h3>
              <div className="calculator-content">
                <div className="exchange-row">
                  <div className="currency-input">
                    <label>You Send</label>
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      placeholder="0.00"
                    />
                    <div className="currency-select">
                      <img
                        src={currencyFlags[sendCurrency]}
                        alt={`${sendCurrency} Flag`}
                        className="currency-flag"
                      />
                      <select
                        value={sendCurrency}
                        onChange={(e) => setSendCurrency(e.target.value)}
                      >
                        <option value="KWD">Kuwaiti Dinar</option>
                        <option value="USD">US Dollar</option>
                        <option value="PKR">Pakistani Rupees</option>
                        <option value="INR">Indian Rupees</option>
                        <option value="ZAR">South African Rand</option>
                      </select>
                    </div>
                  </div>

                  <div className="swap-button" onClick={handleSwapCurrencies} data-tilt>
                    ⇄
                  </div>

                  <div className="currency-input">
                    <label>They Receive</label>
                    <input
                      type="number"
                      value={receiveAmount}
                      readOnly
                      placeholder="0.00"
                    />
                    <div className="currency-select">
                      <img
                        src={currencyFlags[receiveCurrency]}
                        alt={`${receiveCurrency} Flag`}
                        className="currency-flag"
                      />
                      <select
                        value={receiveCurrency}
                        onChange={(e) => setReceiveCurrency(e.target.value)}
                      >
                        <option value="KWD">Kuwaiti Dinar</option>
                        <option value="USD">US Dollar</option>
                        <option value="PKR">Pakistani Rupees</option>
                        <option value="INR">Indian Rupees</option>
                        <option value="ZAR">South African Rand</option>
                      </select>
                    </div>
                  </div>
                </div>
                <p className="indicative-rate">*Indicative Rates Only</p>
                <p className="conversion-rate">
                  1 {sendCurrency} = {(conversionRates[`${sendCurrency}-${receiveCurrency}`] || 1).toFixed(4)} {receiveCurrency}
                </p>
              </div>
            </div>

            {/* Rate Chart in the middle */}
            <div className="rate-chart" data-tilt>
              <h3>Rate Chart</h3>
              <div className="chart-placeholder">
                <img src="/images/chart.jpg" alt="Exchange Rate Chart" />
              </div>
            </div>

            <div className="transaction-beneficiary-panel" data-tilt>
              <div className="panel-header">
                <button
                  className={`panel-tab ${activeSection === 'recent' ? 'active' : ''}`}
                  onClick={() => setActiveSection('recent')}
                >
                  Recent Transactions
                </button>
                <button
                  className={`panel-tab ${activeSection === 'favorite' ? 'active' : ''}`}
                  onClick={() => setActiveSection('favorite')}
                >
                  Favourite Beneficiaries
                </button>
              </div>
              <div className="panel-content">
                {activeSection === 'recent' && (
                  <div className="transaction-list">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="transaction-item">
                        <img src="/images/bank.svg" alt="Bank Icon" className="bank-icon" />
                        <span className="transaction-name">{transaction.name}</span>
                        <span className="transaction-amount">{transaction.amount}</span>
                        <div className="transaction-actions">
                          <img
                            src="/images/repeat.svg"
                            alt="Repeat Transaction"
                            className="action-icon repeat-icon"
                            onClick={() => handleRepeatClick(transaction)}
                            title="Repeat"
                          />
                          <img
                            src="/images/view-details.svg"
                            alt="View Details"
                            className="action-icon view-details-icon"
                            onClick={() => handleViewDetailsClick(transaction)}
                            title="View Details"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeSection === 'favorite' && (
                  <div className="beneficiary-list">
                    {favoriteBeneficiaries.map((beneficiary) => (
                      <div key={beneficiary.id} className="beneficiary-item">
                        <img src="/images/bank.svg" alt="Bank Icon" className="bank-icon" />
                        <span className="beneficiary-name">{beneficiary.name}</span>
                        <span className="beneficiary-amount">{beneficiary.amount}</span>
                        <div className="beneficiary-actions">
                          <img
                            src="/images/repeat.svg"
                            alt="Repeat Transaction"
                            className="action-icon repeat-icon"
                            onClick={() => handleRepeatClick(beneficiary)}
                            title="Repeat"
                          />
                          <img
                            src="/images/view-details.svg"
                            alt="View Details"
                            className="action-icon view-details-icon"
                            onClick={() => handleViewDetailsClick(beneficiary)}
                            title="View Details"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="transaction-insights" data-tilt>
            <h3>Transaction Insights</h3>
            <div className="insights-placeholder">
              <img src="/images/USD-Insights.jpg" alt="Transaction Insights" />
            </div>
          </div>

          <div className="bottom-section">
            <div className="currency-section" data-tilt>
              <h3>Currency</h3>
              <div className="currency-list">
                {Object.entries(currencyFlags).map(([code, flag]) => (
                  <div key={code} className="currency-item" data-tilt>
                    <img src={flag} alt={`${code} Flag`} className="currency-flag" />
                    <span className="currency-name">
                      {code === 'KWD' ? 'Kuwaiti Dinar' :
                       code === 'USD' ? 'US Dollar' :
                       code === 'PKR' ? 'Pakistani Rupees' :
                       code === 'INR' ? 'Indian Rupees' :
                       'South African Rand'}
                    </span>
                    <span className="currency-change">-0.54%</span>
                    <span className="currency-amount">800,000 KWD</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showLogoutPopup && (
            <div className="logout-popup">
              <div className="popup-content" data-tilt>
                <p>Are you sure you want to logout?</p>
                <div className="popup-buttons">
                  <button className="confirm-btn" onClick={handleConfirmLogout}>Logout</button>
                  <button className="cancel-btn" onClick={handleCancelLogout}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;