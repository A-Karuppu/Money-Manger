import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import apiService from '../services/api';

const Accounts = () => {

  const [accounts, setAccounts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW ACCOUNT STATE
  const [accountData, setAccountData] = useState({
    name: '',
    type: '',
    balance: ''
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);

      const [accountsRes, activityRes] = await Promise.all([
        apiService.accounts.getAllAccounts(),
        apiService.accounts.getRecentActivity()
      ]);

      setAccounts(accountsRes.data || []);
      setRecentActivity(activityRes.data || []);

    } catch (err) {
      console.error('Accounts Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ADD ACCOUNT FUNCTION
  const handleAddAccount = async (e) => {
    e.preventDefault();

    try {
      await apiService.accounts.createAccount({
        name: accountData.name,
        type: accountData.type,
        balance: parseFloat(accountData.balance)
      });

      alert('Account Created Successfully');

      setAccountData({
        name: '',
        type: '',
        balance: ''
      });

      fetchAccounts();

    } catch (err) {
      alert(err.response?.data?.message || 'Account creation failed');
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Loading accounts...</div>
      </div>
    );
  }

  return (
    <div className="main-content">

      <div className="page-header">
        <div>
          <h1 className="page-title">Accounts</h1>
          <p className="page-subtitle">
            Manage your financial accounts
          </p>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'24px'}}>

        {/* ACCOUNTS LIST */}
        <div>
          <div className="card">
            <h2 className="card-title">Your Accounts</h2>

            {accounts.length > 0 ? (
              accounts.map((account)=>(
                <div key={account.id} className="account-card">

                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                      <div>{account.name}</div>
                      <div style={{fontSize:'28px',fontWeight:'700'}}>
                        {formatCurrency(account.balance)}
                      </div>
                    </div>
                    <div>💳</div>
                  </div>

                  <div style={{marginTop:'15px'}}>
                    {recentActivity
                      .filter(a=>a.accountId===account.id)
                      .slice(0,3)
                      .map((activity)=>(
                        <div key={activity.id}
                          style={{display:'flex',justifyContent:'space-between'}}>

                          <div>
                            <div>{activity.description}</div>
                            <small>{formatDate(activity.date)}</small>
                          </div>

                          <div>
                            {formatCurrency(activity.amount)}
                          </div>

                        </div>
                    ))}
                  </div>

                </div>
              ))
            ) : (
              <div>No accounts found</div>
            )}

          </div>
        </div>

        {/* ADD ACCOUNT FORM */}
        <div>
          <div className="card">
            <h2 className="card-title">Add Account</h2>

            <form onSubmit={handleAddAccount}>

              <input
                type="text"
                className="form-input"
                placeholder="Account Name"
                value={accountData.name}
                onChange={(e)=>
                  setAccountData({...accountData,name:e.target.value})
                }
                required
              />

              <select
                className="form-select"
                value={accountData.type}
                onChange={(e)=>
                  setAccountData({...accountData,type:e.target.value})
                }
                required
              >
                <option value="">Select Account Type</option>
                <option value="BANK">Bank</option>
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
                <option value="WALLET">Wallet</option>
              </select>

              <input
                type="number"
                className="form-input"
                placeholder="Initial Money"
                value={accountData.balance}
                onChange={(e)=>
                  setAccountData({...accountData,balance:e.target.value})
                }
                required
              />

              <button className="btn btn-primary" style={{width:'100%'}}>
                <Plus size={16}/> Add Account
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Accounts;
