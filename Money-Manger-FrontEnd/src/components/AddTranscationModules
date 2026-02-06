import React, { useState } from 'react';
import { X } from 'lucide-react';
import apiService from '../services/api';

const AddTransactionModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    description: '',
    category: '',
    division: '',
    account: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Education',
    'Salary',
    'Freelance',
    'Investment',
    'Other'
  ];

  const divisions = [
    'Personal',
    'Office',
    'Business'
  ];

  const accounts = [
    'Main Checking Account',
    'Savings Account',
    'Credit Card',
    'Investment Account'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const transactionData = {
        type: formData.type,
        amount: formData.type === 'expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount)),
        date: formData.date,
        time: formData.time,
        dateTime: `${formData.date}T${formData.time}`,
        description: formData.description,
        category: formData.category,
        division: formData.division,
        account: formData.account
      };

      // Try using the transactions API
      await apiService.transactions.addTransaction(transactionData);
      
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Transaction</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
              Input details for your income or expense.
            </div>

            {error && (
              <div className="error" style={{ marginBottom: '16px' }}>
                {error}
              </div>
            )}

            {/* Type Selection */}
            <div className="form-group">
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'income'})}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: formData.type === 'income' ? '2px solid #667eea' : '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: formData.type === 'income' ? '#eef2ff' : 'white',
                    color: formData.type === 'income' ? '#667eea' : '#6b7280',
                    fontWeight: formData.type === 'income' ? '600' : '400',
                    cursor: 'pointer'
                  }}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: formData.type === 'expense' ? '2px solid #667eea' : '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: formData.type === 'expense' ? '#eef2ff' : 'white',
                    color: formData.type === 'expense' ? '#667eea' : '#6b7280',
                    fontWeight: formData.type === 'expense' ? '600' : '400',
                    cursor: 'pointer'
                  }}
                >
                  Expense
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="form-group">
              <label className="form-label">Amount</label>
              <div style={{ position: 'relative' }}>
                <span style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  $
                </span>
                <input 
                  type="number" 
                  name="amount"
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  style={{ paddingLeft: '32px' }}
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Date and Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time</label>
                <input 
                  type="time" 
                  name="time"
                  className="form-input"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                name="description"
                className="form-textarea"
                rows="3"
                placeholder="e.g., Monthly salary, Freelance project payment"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div className="form-group">
              <label className="form-label">Division</label>
              <select 
                name="division"
                className="form-select"
                value={formData.division}
                onChange={handleChange}
                required
              >
                <option value="">Select a division</option>
                {divisions.map(div => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
            </div>

            {/* Account */}
            <div className="form-group">
              <label className="form-label">Account</label>
              <select 
                name="account"
                className="form-select"
                value={formData.account}
                onChange={handleChange}
                required
              >
                <option value="">Select an account</option>
                {accounts.map(acc => (
                  <option key={acc} value={acc}>{acc}</option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px' }}>
              Transactions are editable for up to 12 hours after creation.
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
