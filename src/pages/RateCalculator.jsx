import React, { useState, useEffect } from 'react';

const RateCalculator = ({ onClose }) => {
  const [sendCurrency, setSendCurrency] = useState('KWD');
  const [receiveCurrency, setReceiveCurrency] = useState('PKR');
  const [sendAmount, setSendAmount] = useState();
  const [receiveAmount, setReceiveAmount] = useState();

  const currencyFlags = {
    KWD: '/images/KWD.svg',
    PKR: '/images/PKR.svg',
    USD: '/images/USD.svg',
    INR: '/images/INR.svg',
  };
  const conversionRates = {
    'KWD-PKR': 906.6454,
    'KWD-USD': 3.262,
    'USD-PKR': 277.95,
    'PKR-KWD': 0.002989,
    'USD-KWD': 0.3066,
    'PKR-USD': 0.003597,
    'INR-KWD': 0.003686,
    'KWD-INR': 271.35,
    'USD-INR': 83.15,
    'INR-USD': 0.01203,
    'PKR-INR': 0.2989,
    'INR-PKR': 3.344,
  };
  useEffect(() => {
    const rateKey = `${sendCurrency}-${receiveCurrency}`;
    const rate = conversionRates[rateKey] || 1;
    setReceiveAmount((sendAmount * rate).toFixed(2));
  }, [sendAmount, sendCurrency, receiveCurrency]);

  return (
    <div className="rate-calculator-overlay">
      <div className="rate-calculator">
        <h3>Rate Calculator</h3>
        <div className="calculator-content">
          <div className="exchange-row">
            <div className="you-send">
              <span>You Send</span>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(parseFloat(e.target.value) || 0)}
              />
              <div className="currency-select">
                <img
                  src={currencyFlags[sendCurrency] || '/images/default.svg'}
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
                </select>
              </div>
            </div>
            <div className="they-receive">
              <span>They Receive</span>
              <input
                type="number"
                value={receiveAmount}
                readOnly
              />
              <div className="currency-select">
                <img
                  src={currencyFlags[receiveCurrency] || '/images/default.svg'}
                  alt={`${receiveCurrency} Flag`}
                  className="currency-flag"
                />
                <select
                  value={receiveCurrency}
                  onChange={(e) => setReceiveCurrency(e.target.value)}
                >
                  <option value="PKR">Pakistani Rupees</option>
                  <option value="KWD">Kuwaiti Dinar</option>
                  <option value="USD">US Dollar</option>
                  <option value="INR">Indian Rupees</option>
                </select>
              </div>
            </div>
          </div>
          <p className="indicative-rate">*Indicative Rates Only</p>
          <p className="conversion-rate">
            1 {sendCurrency} = {(conversionRates[`${sendCurrency}-${receiveCurrency}`] || 1).toFixed(6)} {receiveCurrency}
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RateCalculator;
