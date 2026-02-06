import React, { useState, useEffect } from 'react';
import { Download, Calendar } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import apiService from '../services/api';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const [transactionsResponse, summaryResponse] = await Promise.all([
        apiService.reports.getTransactions(),
        apiService.reports.getSummary()
      ]);
      
      setTransactions(transactionsResponse.data);
      setSummary(summaryResponse.data);
    } catch (err) {
      console.error('Error fetching report data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await apiService.reports.downloadPdf();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'financial-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF report');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  // Prepare chart data
  const incomeVsExpenseTrend = [
    { name: 'Jan', income: 5350, expense: 4275 },
    { name: 'Feb', income: 6200, expense: 4050 },
    { name: 'Mar', income: 5900, expense: 4425 },
    { name: 'Apr', income: 6425, expense: 4600 },
    { name: 'May', income: 7100, expense: 4800 },
    { name: 'Jun', income: 7350, expense: 4550 },
    { name: 'Jul', income: 6800, expense: 4275 },
    { name: 'Aug', income: 7200, expense: 4680 },
    { name: 'Sep', income: 6950, expense: 4400 },
    { name: 'Oct', income: 7450, expense: 4850 },
    { name: 'Nov', income: 7650, expense: 5100 },
    { name: 'Dec', income: 7900, expense: 5350 },
  ];

  const expenseCategoryData = [
    { name: 'Housing', value: 1500, percentage: 33.3 },
    { name: 'Transportation', value: 800, percentage: 17.8 },
    { name: 'Food & Dining', value: 750, percentage: 16.7 },
    { name: 'Utilities', value: 400, percentage: 8.9 },
    { name: 'Shopping', value: 500, percentage: 11.1 },
    { name: 'Entertainment', value: 300, percentage: 6.7 },
    { name: 'Healthcare', value: 200, percentage: 4.5 },
    { name: 'Education', value: 100, percentage: 2.2 },
  ];

  const incomeCategoryData = [
    { name: 'Salary', value: 4500, percentage: 64.3 },
    { name: 'Freelance', value: 1500, percentage: 21.4 },
    { name: 'Investments', value: 800, percentage: 11.4 },
    { name: 'Gifts', value: 200, percentage: 2.9 },
  ];

  const COLORS = ['#667eea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Loading report data...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Report Settings</h1>
        </div>
        <div className="header-actions">
          <select className="form-select" style={{ width: 'auto' }}>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <Calendar size={20} />
            <span>Nov 1, 2023 - Nov 30, 2023</span>
          </div>
          <button className="btn btn-primary" onClick={handleDownloadPdf}>
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Income vs Expense Trend */}
      <div className="card">
        <h2 className="card-title">Income vs. Expense Trend</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={incomeVsExpenseTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#667eea" 
              strokeWidth={3}
              dot={{ fill: '#667eea', r: 5 }}
              name="Income"
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 5 }}
              name="Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Spending Categories */}
        <div className="card">
          <h2 className="card-title">Spending Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Income Categories */}
        <div className="card">
          <h2 className="card-title">Income Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {incomeCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Expense Category Breakdown */}
        <div className="card">
          <h2 className="card-title">Expense Category Breakdown</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {expenseCategoryData.map((category, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          borderRadius: '2px', 
                          backgroundColor: COLORS[index % COLORS.length] 
                        }}></div>
                        {category.name}
                      </div>
                    </td>
                    <td style={{ fontWeight: '600' }}>{formatCurrency(category.value)}</td>
                    <td>{category.percentage.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #e5e7eb', fontWeight: '700' }}>
                  <td>Total Expenses</td>
                  <td>{formatCurrency(expenseCategoryData.reduce((sum, cat) => sum + cat.value, 0))}</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Income Category Breakdown */}
        <div className="card">
          <h2 className="card-title">Income Category Breakdown</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {incomeCategoryData.map((category, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          borderRadius: '2px', 
                          backgroundColor: COLORS[index % COLORS.length] 
                        }}></div>
                        {category.name}
                      </div>
                    </td>
                    <td style={{ fontWeight: '600' }}>{formatCurrency(category.value)}</td>
                    <td>{category.percentage.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #e5e7eb', fontWeight: '700' }}>
                  <td>Total Income</td>
                  <td>{formatCurrency(incomeCategoryData.reduce((sum, cat) => sum + cat.value, 0))}</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
