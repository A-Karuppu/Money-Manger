import React, { useState, useEffect } from 'react';
import { Download, Calendar } from 'lucide-react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import apiService from '../services/api';

const Reports = () => {

  const [trendData, setTrendData] = useState([]);
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#667eea','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#84cc16'];

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);

      const [
        trendResponse,
        expenseCategoryResponse,
        incomeCategoryResponse
      ] = await Promise.all([
        apiService.reports.getIncomeExpenseTrend(),
        apiService.reports.getExpenseCategories(),
        apiService.reports.getIncomeCategories()
      ]);

      setTrendData(trendResponse.data || []);
      setExpenseCategoryData(expenseCategoryResponse.data || []);
      setIncomeCategoryData(incomeCategoryResponse.data || []);

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
      alert('Failed to download PDF report');
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);

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
          <h1 className="page-title">Reports</h1>
        </div>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleDownloadPdf}>
            <Download size={20}/> Export Report
          </button>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="card">
        <h2 className="card-title">Income vs Expense Trend</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>

            <Line type="monotone" dataKey="income" stroke="#667eea" strokeWidth={3}/>
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(400px,1fr))',gap:'24px'}}>

        <div className="card">
          <h2 className="card-title">Expense Categories</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={expenseCategoryData} dataKey="value" innerRadius={80} outerRadius={120}>
                {expenseCategoryData.map((entry,index)=>(
                  <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}
              </Pie>
              <Tooltip formatter={(v)=>formatCurrency(v)}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="card-title">Income Categories</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={incomeCategoryData} dataKey="value" innerRadius={80} outerRadius={120}>
                {incomeCategoryData.map((entry,index)=>(
                  <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}
              </Pie>
              <Tooltip formatter={(v)=>formatCurrency(v)}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Tables */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(400px,1fr))',gap:'24px'}}>

        <div className="card">
          <h2 className="card-title">Expense Breakdown</h2>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>%</th>
              </tr>
            </thead>

            <tbody>
              {expenseCategoryData.map((c,i)=>(
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{formatCurrency(c.value)}</td>
                  <td>{c.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 className="card-title">Income Breakdown</h2>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>%</th>
              </tr>
            </thead>

            <tbody>
              {incomeCategoryData.map((c,i)=>(
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{formatCurrency(c.value)}</td>
                  <td>{c.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default Reports;
