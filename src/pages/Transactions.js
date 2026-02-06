import React, { useState, useEffect } from 'react';
import { Plus, Search, Download, Edit, Filter } from 'lucide-react';
import apiService from '../services/api';
import AddTransactionModal from '../components/AddTransactionModal';

const Transactions = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');

  useEffect(() => {
    fetchTransactionsOverview();
  }, []);

  const fetchTransactionsOverview = async () => {
    try {
      setLoading(true);
      const response = await apiService.transactions.getOverview();
      setOverview(response.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const filteredTransactions = overview?.transactions?.filter(transaction => {
    const matchesSearch = transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.account?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesDivision = selectedDivision === 'all' || transaction.division === selectedDivision;
    
    return matchesSearch && matchesCategory && matchesDivision;
  }) || [];

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Transactions Overview</h1>
          <p className="page-subtitle">Manage and review all your financial transactions</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Income</div>
          <div className="stat-value" style={{ color: '#10b981' }}>
            {formatCurrency(overview?.totalIncome)}
          </div>
          <div className="stat-change">From current filters</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value" style={{ color: '#ef4444' }}>
            {formatCurrency(overview?.totalExpense)}
          </div>
          <div className="stat-change">From current filters</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Net Balance</div>
          <div className="stat-value" style={{ color: '#667eea' }}>
            {formatCurrency(overview?.netBalance)}
          </div>
          <div className="stat-change">Income - Expenses</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={20} 
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} 
              />
              <input
                type="text"
                placeholder="Search by description or account..."
                className="form-input"
                style={{ paddingLeft: '40px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <select 
            className="form-select" 
            style={{ width: 'auto', minWidth: '150px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Food">Food</option>
            <option value="Salary">Salary</option>
            <option value="Supplies">Supplies</option>
            <option value="Utilities">Utilities</option>
            <option value="Freelance">Freelance</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Software">Software</option>
            <option value="Investment">Investment</option>
            <option value="Transportation">Transportation</option>
          </select>

          <select 
            className="form-select" 
            style={{ width: 'auto', minWidth: '150px' }}
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="all">All Divisions</option>
            <option value="Personal">Personal</option>
            <option value="Office">Office</option>
          </select>

          <button className="btn btn-secondary">
            <Download size={20} />
            Bulk Export
          </button>
        </div>

        {/* Transactions Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Description</th>
                <th>Category</th>
                <th>Division</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id || index}>
                    <td>
                      <div>{formatDate(transaction.date || transaction.dateTime)}</div>
                    </td>
                    <td>{transaction.description}</td>
                    <td>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151'
                      }}>
                        {transaction.category}
                      </span>
                    </td>
                    <td>{transaction.division}</td>
                    <td>{transaction.account}</td>
                    <td className={transaction.amount >= 0 ? 'text-success' : 'text-danger'} style={{ fontWeight: '600' }}>
                      {formatCurrency(Math.abs(transaction.amount))}
                    </td>
                    <td>
                      <button 
                        className="btn" 
                        style={{ 
                          padding: '6px 12px', 
                          fontSize: '12px',
                          background: 'none',
                          border: '1px solid #d1d5db'
                        }}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center" style={{ padding: '40px' }}>
                    {searchTerm || selectedCategory !== 'all' || selectedDivision !== 'all' 
                      ? 'No transactions match your filters'
                      : 'No transactions found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>
              Showing 1 to {Math.min(10, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn" style={{ padding: '8px 16px', fontSize: '14px' }}>Previous</button>
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>1</button>
              <button className="btn" style={{ padding: '8px 16px', fontSize: '14px' }}>2</button>
              <button className="btn" style={{ padding: '8px 16px', fontSize: '14px' }}>3</button>
              <button className="btn" style={{ padding: '8px 16px', fontSize: '14px' }}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <AddTransactionModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchTransactionsOverview}
        />
      )}
    </div>
  );
};

export default Transactions;
