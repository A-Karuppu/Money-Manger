import React, { useState, useEffect } from 'react';
import { User, Save, Plus, Trash } from 'lucide-react';
import apiService from '../services/api';

const Settings = () => {

  const [activeTab, setActiveTab] = useState('profile');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
    fetchCategories();
    fetchAccounts();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await apiService.settings.getProfile();
      setProfile({
        name: response.data?.name || '',
        email: response.data?.email || '',
        phone: response.data?.phone || '',
        avatar: response.data?.avatar || ''
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const response = await apiService.category.getAll();
    setCategories(response.data || []);
  };

  const fetchAccounts = async () => {
    const response = await apiService.accounts.getAll();
    setAccounts(response.data || []);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    await apiService.settings.updateProfile(profile);

    setMessage('Profile updated successfully');
    setTimeout(() => setMessage(''), 3000);
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    await apiService.category.create({ name: newCategory });
    setNewCategory('');
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    await apiService.category.delete(id);
    fetchCategories();
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'categories', label: 'Categories' },
    { id: 'accounts', label: 'Accounts' }
  ];

  return (
    <div className="main-content">
      <div className="card" style={{ padding: '30px' }}>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '20px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '15px',
          marginBottom: '30px'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '15px',
                fontWeight: '600',
                paddingBottom: '10px',
                borderBottom: activeTab === tab.id
                  ? '2px solid #6366f1'
                  : '2px solid transparent',
                color: activeTab === tab.id ? '#6366f1' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {message && (
          <div style={{
            padding: '12px',
            marginBottom: '20px',
            background: '#dcfce7',
            borderRadius: '8px'
          }}>
            {message}
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileUpdate}>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="avatar"
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#6366f1',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  {profile.name?.charAt(0)}
                </div>
              )}
              <input type="file" onChange={handleImageUpload} />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                className="form-input"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="form-input"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-input"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>

            <button className="btn btn-primary" disabled={loading}>
              <Save size={18} /> Save Profile
            </button>

          </form>
        )}

        {/* Categories */}
        {activeTab === 'categories' && (
          <div>

            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <input
                className="form-input"
                placeholder="Add new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />

              <button
                className="btn btn-primary"
                onClick={handleAddCategory}
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {categories.map(cat => (
              <div key={cat.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                border: '1px solid #eee',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                {cat.name}

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCategory(cat.id)}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}

          </div>
        )}

        {/* Accounts */}
        {activeTab === 'accounts' && (
          <div>

            <h3 style={{ marginBottom: '20px' }}>
              Total Accounts : {accounts.length}
            </h3>

            {accounts.map(acc => (
              <div key={acc.id} style={{
                padding: '18px',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <strong>{acc.name}</strong>
                <p style={{ marginTop: '5px', color: '#6b7280' }}>
                  Balance : ₹{acc.balance}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
