import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/repeat-transaction.css';

const RepeatTransaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transaction } = location.state || {};
  const [sendAmount, setSendAmount] = useState('1');
  const [receiveAmount, setReceiveAmount] = useState('906.6454');
  const [promotionCode, setPromotionCode] = useState('1212');

  useEffect(() => {
    if (!transaction) navigate('/dashboard');
  }, [transaction, navigate]);

  const handleSendNow = () => {
    console.log('Transaction sent:', { sendAmount, receiveAmount, promotionCode });
    navigate('/dashboard');
  };

  return (
    <div className="repeat-transaction-container">
      {/* Header */}
      <div className="repeat-header">
        <img src="/images/logo.svg" alt="Al Muzaini Exchange Logo" className="logo" />
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#transactions">Transactions</a>
          <a href="#beneficiary">Beneficiary</a>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search Something..." />
        </div>
        <div className="user-icons">
          <img src="/images/bell.svg" alt="Notification" />
          <img src="/images/profile.svg" alt="Profile" />
        </div>
      </div>

      {/* Main Content */}
      <div className="repeat-main-content">
        <div className="transaction-panel">
          <div className="sender-info">
            <div className="profile-icon">MI</div>
            <div>
              <h3>Mohammed Ibrahim</h3>
              <p>Account Number: 13400048605</p>
              <p>Branch: Panthapath Branch, Dhaka</p>
              <p>Bank Name: Social Islami Bank Limited</p>
            </div>
          </div>

          <div className="amount-section">
            <div className="amount-field">
              <label>You Send</label>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
              <div className="currency">
                <img src="/images/KWD.svg" alt="KWD Flag" />
                <span>KWD (Kuwaiti Dinar)</span>
              </div>
            </div>

            <div className="amount-field">
              <label>They Receive</label>
              <input type="number" value={receiveAmount} />
              <div className="currency">
                <img src="/images/PKR.svg" alt="PKR Flag" />
                <span>PKR (Pakistani Rupees)</span>
              </div>
            </div>

            <div className="purpose-field">
              <label>Purpose of Transfer*</label>
              <select>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Funding">Funding</option>
                <option value="Important">Important</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="promotion-field">
              <label>Select Promotions*</label>
              <input
                type="text"
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
              />
              <p>*Promotion Applied</p>
            </div>
          </div>

          <div className="summary">
            <h3>Summary</h3>
            <div className="summary-item">
              <span>Receive Amount</span>
              <span>100.000 KWD</span>
            </div>
            <div className="summary-item">
              <span>Conversion Rate</span>
              <span>1.000 KWD</span>
            </div>
            <div className="summary-item">
              <span>Send Amount</span>
              <span>100.000 KWD</span>
            </div>
            <div className="summary-item">
              <span>Commission</span>
              <span>1.000 KWD</span>
            </div>
            <div className="summary-item discount">
              <span>Discount</span>
              <span>-1.250 KWD</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount</span>
              <span>250.000 KWD</span>
            </div>
            <button className="send-now" onClick={handleSendNow}>Send Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatTransaction;
