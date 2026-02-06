import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import apiService from '../services/api';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: '2026-01-01',
    to: '2026-02-28'
  });

  const userId = 'user123'; // In production, get from authentication

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryResponse, transactionsResponse] = await Promise.all([
        apiService.dashboard.getSummary(userId, dateRange.from, dateRange.to),
        apiService.dashboard.getTransactions(userId, dateRange.from, dateRange.to)
      ]);
      
      setSummaryData(summaryResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
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

  // Prepare chart data
  const incomeVsExpensesData = [
    { name: 'Jan', income: 4500, expenses: 2800 },
    { name: 'Feb', income: 5200, expenses: 3200 },
    { name: 'Mar', income: 4800, expenses: 2900 },
    { name: 'Apr', income: 5500, expenses: 3400 },
    { name: 'May', income: 6000, expenses: 3100 },
    { name: 'Jun', income: 5800, expenses: 3300 },
  ];

  const spendingCategoriesData = [
    { name: 'Food & Dining', value: 650, color: '#667eea' },
    { name: 'Transportation', value: 420, color: '#10b981' },
    { name: 'Shopping', value: 300, color: '#f59e0b' },
    { name: 'Utilities', value: 180, color: '#ef4444' },
    { name: 'Entertainment', value: 150, color: '#8b5cf6' },
  ];

  const incomeCategoriesData = [
    { name: 'Salary', value: 4500, color: '#667eea' },
    { name: 'Freelance', value: 1500, color: '#10b981' },
    { name: 'Investments', value: 800, color: '#f59e0b' },
    { name: 'Other', value: 200, color: '#ef4444' },
  ];

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Financial Dashboard</h1>
          <p className="page-subtitle">Overview of your financial health for the selected period</p>
        </div>
        <div className="header-actions">
          <select className="form-select" style={{ width: 'auto' }}>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} />
            <span>Jan 04, 2026 - Feb 03, 2026</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="stat-card">
          <div className="stat-label">Total Balance</div>
          <div className="stat-value" style={{ color: '#667eea' }}>
            {formatCurrency(summaryData?.totalBalance || 20650)}
          </div>
          <div className="stat-change">
            +2% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Monthly Income</div>
          <div className="stat-value" style={{ color: '#10b981' }}>
            {formatCurrency(summaryData?.monthlyIncome || 4500)}
          </div>
          <div className="stat-change positive">
            <TrendingUp size={16} />
            +12%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Monthly Expenses</div>
          <div className="stat-value" style={{ color: '#ef4444' }}>
            {formatCurrency(summaryData?.monthlyExpenses || 2800)}
          </div>
          <div className="stat-change negative">
            <TrendingDown size={16} />
            -5%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Savings Goal</div>
          <div className="stat-value" style={{ color: '#8b5cf6' }}>
            {formatCurrency(summaryData?.savingsGoal || 15000)}
          </div>
          <div className="stat-change">
            68% achieved
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Income vs Expenses Chart */}
        <div className="card">
          <h2 className="card-title">Income vs Expenses</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
            Last 12 Months (Feb 2026)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeVsExpensesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#667eea" 
                strokeWidth={2}
                dot={{ fill: '#667eea', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Categories Pie Chart */}
        <div className="card">
          <h2 className="card-title">Spending Categories</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
            Distribution by category
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingCategoriesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {spendingCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '16px' }}>
            {spendingCategoriesData.map((category, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: category.color }}></div>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>{category.name}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{formatCurrency(category.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income Categories Pie Chart */}
        <div className="card">
          <h2 className="card-title">Income Categories</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
            Distribution by source
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeCategoriesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {incomeCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '16px' }}>
            {incomeCategoriesData.map((category, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: category.color }}></div>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>{category.name}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{formatCurrency(category.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h2 className="card-title">Recent Transactions</h2>
          <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
            {transactions.length > 0 ? (
              transactions.slice(0, 6).map((transaction, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '12px 0',
                    borderBottom: index < 5 ? '1px solid #e5e7eb' : 'none'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '500', color: '#1f2937' }}>
                      {transaction.description}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      {transaction.category}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={transaction.type === 'income' ? 'text-success' : 'text-danger'} style={{ fontWeight: '600' }}>
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center" style={{ padding: '40px', color: '#6b7280' }}>
                No transactions found for this period
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Budget Overview & Division Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '24px' }}>
        {/* Budget Overview */}
        <div className="card">
          <h2 className="card-title">Budget Overview</h2>
          <div style={{ marginTop: '16px' }}>
            {[
              { name: 'Food & Dining', spent: 250, budget: 400, color: '#667eea' },
              { name: 'Shopping', spent: 150, budget: 300, color: '#10b981' },
              { name: 'Transportation', spent: 180, budget: 250, color: '#f59e0b' },
              { name: 'Utilities', spent: 60, budget: 100, color: '#ef4444' },
            ].map((item, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${(item.spent / item.budget) * 100}%`, 
                      height: '100%', 
                      backgroundColor: item.color,
                      transition: 'width 0.3s'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Division Breakdown */}
        <div className="card">
          <h2 className="card-title">Division Breakdown</h2>
          <div style={{ marginTop: '16px' }}>
            {[
              { name: 'Office expenses', amount: 2450, percentage: 65 },
              { name: 'Personal expenses', amount: 1350, percentage: 35 },
              { name: 'Rent', amount: 800, percentage: 20 },
              { name: 'Groceries', amount: 400, percentage: 10 },
              { name: 'Travel', amount: 300, percentage: 7 },
              { name: 'Education', amount: 250, percentage: 6 },
              { name: 'Healthcare', amount: 100, percentage: 2 },
            ].map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '12px 0',
                  borderBottom: index < 6 ? '1px solid #e5e7eb' : 'none'
                }}
              >
                <span style={{ fontSize: '14px', color: '#1f2937' }}>{item.name}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    {formatCurrency(item.amount)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    ({item.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
