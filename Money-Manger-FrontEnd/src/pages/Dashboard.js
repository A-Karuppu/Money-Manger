import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
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
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import apiService from '../services/api';

const Dashboard = () => {

  const [summaryData, setSummaryData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState({
     
  });

  const userId = 'user123';

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

      setSummaryData(summaryResponse.data || {});
      setTransactions(transactionsResponse.data || []);

    } catch (err) {
      console.error('Dashboard Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);

  const incomeVsExpensesData = summaryData?.incomeVsExpenses || [];
  const spendingCategoriesData = summaryData?.spendingCategories || [];
  const incomeCategoriesData = summaryData?.incomeCategories || [];
  const budgetOverviewData = summaryData?.budgetOverview || [];
  const divisionBreakdownData = summaryData?.divisionBreakdown || [];

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="main-content">

      <div className="page-header">
        <div>
          <h1 className="page-title">Financial Dashboard</h1>
          <p className="page-subtitle">
            Overview of your financial health
          </p>
        </div>

        <div className="header-actions">
          <select className="form-select">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20}/>
            <span>{dateRange.from} - {dateRange.to}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">

        <div className="stat-card">
          <div>Total Balance</div>
          <div>{formatCurrency(summaryData.totalBalance)}</div>
        </div>

        <div className="stat-card">
          <div>Monthly Income</div>
          <div style={{ color:'#10b981'}}>
            {formatCurrency(summaryData.monthlyIncome)}
          </div>
          <TrendingUp size={16}/>
        </div>

        <div className="stat-card">
          <div>Monthly Expenses</div>
          <div style={{ color:'#ef4444'}}>
            {formatCurrency(summaryData.monthlyExpenses)}
          </div>
          <TrendingDown size={16}/>
        </div>

        <div className="stat-card">
          <div>Savings Goal</div>
          <div style={{ color:'#8b5cf6'}}>
            {formatCurrency(summaryData.savingsGoal)}
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="chart-grid">

        <div className="card">
          <h2>Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeVsExpensesData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="income" stroke="#667eea"/>
              <Line type="monotone" dataKey="expenses" stroke="#ef4444"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Spending Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={spendingCategoriesData} dataKey="value">
                {spendingCategoriesData.map((e,i)=>(
                  <Cell key={i} fill={e.color}/>
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Income Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={incomeCategoriesData} dataKey="value">
                {incomeCategoriesData.map((e,i)=>(
                  <Cell key={i} fill={e.color}/>
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions */}
        <div className="card">
          <h2>Recent Transactions</h2>
          {transactions.slice(0,6).map((t,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                <div>{t.description}</div>
                <small>{t.category}</small>
              </div>
              <div>
                {formatCurrency(t.amount)}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Budget */}
      <div className="card">
        <h2>Budget Overview</h2>
        {budgetOverviewData.map((item,i)=>(
          <div key={i}>
            {item.name} {formatCurrency(item.spent)} /
            {formatCurrency(item.budget)}
          </div>
        ))}
      </div>

      {/* Division */}
      <div className="card">
        <h2>Division Breakdown</h2>
        {divisionBreakdownData.map((item,i)=>(
          <div key={i}>
            {item.name} - {formatCurrency(item.amount)}
            ({item.percentage}%)
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
