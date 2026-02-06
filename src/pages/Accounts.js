import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight, History } from 'lucide-react';
import apiService from '../services/api';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await apiService.accounts.getAllAccounts();
      setAccounts(response.data);
    } catch (err) {
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await apiService.transfers.transferFunds({
        fromAccountId: transferData.fromAccount,
        toAccountId: transferData.toAccount,
        amount: parseFloat(transferData.amount),
        date: transferData.date,
        note: transferData.note
      });
      
      alert('Transfer successful!');
      setTransferData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        note: ''
      });
      fetchAccounts();
    } catch (err) {
      alert('Transfer failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Mock recent activity data
  const recentActivity = [
    { id: 1, description: 'Salary Deposit', date: '2023-10-26', amount: 2500, type: 'income' },
    { id: 2, description: 'Coffee Shop', date: '2023-10-25', amount: -4.50, type: 'expense' },
    { id: 3, description: 'Online Purchase', date: '2023-10-24', amount: -55.99, type: 'expense' },
    { id: 4, description: 'Interest Payment', date: '2023-10-31', amount: 12.30, type: 'income' },
    { id: 5, description: 'Transfer from Checkin', date: '2023-10-20', amount: 500, type: 'income' },
    { id: 6, description: 'Dividend Income', date: '2023-10-10', amount: 75, type: 'income' },
  ];

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Loading accounts...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Accounts & Transfers</h1>
          <p className="page-subtitle">Manage your financial accounts and initiate fund transfers</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column - Accounts */}
        <div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="card-title" style={{ marginBottom: 0 }}>Your Accounts</h2>
              <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                <Plus size={16} />
                Add Account
              </button>
            </div>

            {accounts.length > 0 ? (
              <div style={{ display: 'grid', gap: '16px' }}>
                {accounts.map((account) => (
                  <div 
                    key={account.id} 
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '12px',
                      padding: '24px',
                      color: 'white'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                          {account.type || 'Main Checking Account'}
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
                          {formatCurrency(account.balance)}
                        </div>
                      </div>
                      <div style={{ fontSize: '24px' }}>💳</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button 
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.2)', 
                          border: 'none', 
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <History size={16} />
                        View History
                      </button>
                      <button 
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.2)', 
                          border: 'none', 
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ArrowRight size={16} />
                        Transfer Funds
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center" style={{ padding: '40px', color: '#6b7280' }}>
                No accounts found. Add your first account to get started!
              </div>
            )}

            {/* Mock accounts if API returns empty */}
            {accounts.length === 0 && (
              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { name: 'Main Checking Account', balance: 5240.75, type: '💳' },
                  { name: 'Savings Account', balance: 15800, type: '🏦' },
                  { name: 'Credit Card', balance: 2100, type: '💳' }
                ].map((account, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '12px',
                      padding: '24px',
                      color: 'white'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                          {account.name}
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
                          {formatCurrency(account.balance)}
                        </div>
                      </div>
                      <div style={{ fontSize: '24px' }}>{account.type}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button 
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.2)', 
                          border: 'none', 
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <History size={16} />
                        View History
                      </button>
                      <button 
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.2)', 
                          border: 'none', 
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ArrowRight size={16} />
                        Transfer Funds
                      </button>
                    </div>

                    {/* Recent Activity for each account */}
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                      <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px', opacity: 0.9 }}>
                        Recent Activity
                      </div>
                      {recentActivity.slice(0, 3).map((activity, idx) => (
                        <div 
                          key={idx} 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                            fontSize: '12px'
                          }}
                        >
                          <div>
                            <div style={{ opacity: 0.95 }}>{activity.description}</div>
                            <div style={{ opacity: 0.7, marginTop: '2px' }}>{activity.date}</div>
                          </div>
                          <div style={{ fontWeight: '600' }}>
                            {activity.type === 'income' ? '+' : ''}{formatCurrency(activity.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Fund Transfer */}
        <div>
          <div className="card">
            <h2 className="card-title">Fund Transfer</h2>
            <form onSubmit={handleTransfer}>
              <div className="form-group">
                <label className="form-label">From Account</label>
                <select 
                  className="form-select"
                  value={transferData.fromAccount}
                  onChange={(e) => setTransferData({...transferData, fromAccount: e.target.value})}
                  required
                >
                  <option value="">Main Checking Account</option>
                  <option value="account2">Savings Account</option>
                  <option value="account3">Credit Card</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">To Account</label>
                <select 
                  className="form-select"
                  value={transferData.toAccount}
                  onChange={(e) => setTransferData({...transferData, toAccount: e.target.value})}
                  required
                >
                  <option value="">Select destination account</option>
                  <option value="account1">Main Checking Account</option>
                  <option value="account2">Savings Account</option>
                  <option value="account3">Credit Card</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Amount</label>
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={transferData.date}
                  onChange={(e) => setTransferData({...transferData, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Note</label>
                <textarea 
                  className="form-textarea"
                  rows="3"
                  placeholder="Optional note for transfer..."
                  value={transferData.note}
                  onChange={(e) => setTransferData({...transferData, note: e.target.value})}
                />
              </div>

              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                Transactions are editable for up to 12 hours after creation.
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Transfer Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
