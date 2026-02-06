# Money Manager API Documentation

Complete API reference for the Money Manager Backend

Base URL: `http://localhost:8080/api`

---

## 🔐 Authentication APIs

### Register New User
**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
"Signup successful"
```

---

## 🏠 Home Dashboard APIs

### Get Home Dashboard
**Endpoint:** `GET /home/dashboard`

**Response:**
```json
{
  "totalBalance": 25320.50,
  "monthlyIncome": 5800.00,
  "monthlyExpense": 3150.75,
  "recentTransactions": [
    {
      "description": "Salary Deposit",
      "category": "Salary",
      "date": "2026-02-03",
      "amount": 2500.00
    }
  ]
}
```

---

## 📊 Dashboard APIs (with Date Filters)

### Get Financial Summary
**Endpoint:** `GET /dashboard/summary`

**Query Parameters:**
- `userId` (required): User identifier
- `from` (required): Start date (YYYY-MM-DD)
- `to` (required): End date (YYYY-MM-DD)

**Example:**
```
GET /dashboard/summary?userId=user123&from=2026-01-01&to=2026-02-28
```

**Response:**
```json
{
  "totalBalance": 20650.00,
  "monthlyIncome": 4500.00,
  "monthlyExpenses": 2800.00,
  "savingsGoal": 15000.00
}
```

### Get Dashboard Transactions
**Endpoint:** `GET /dashboard/transactions`

**Query Parameters:**
- `userId` (required): User identifier
- `from` (required): Start date (YYYY-MM-DD)
- `to` (required): End date (YYYY-MM-DD)

**Example:**
```
GET /dashboard/transactions?userId=user123&from=2026-01-01&to=2026-02-28
```

**Response:**
```json
[
  {
    "id": "123",
    "description": "Grocery Shopping",
    "category": "Food",
    "division": "Personal",
    "account": "Credit Card",
    "amount": -75.50,
    "date": "2026-02-03",
    "type": "expense"
  }
]
```

---

## 💳 Transaction APIs

### Add Transaction
**Endpoint:** `POST /transactions/add`

**Request Body:**
```json
{
  "type": "expense",
  "amount": -75.50,
  "date": "2026-02-03",
  "dateTime": "2026-02-03T10:30:00",
  "description": "Grocery Shopping",
  "category": "Food & Dining",
  "division": "Personal",
  "account": "Credit Card"
}
```

**Response:**
```json
{
  "id": "123",
  "type": "expense",
  "amount": -75.50,
  "description": "Grocery Shopping",
  "category": "Food & Dining",
  "date": "2026-02-03T10:30:00"
}
```

### Get Transactions Overview
**Endpoint:** `GET /transactions/overview`

**Response:**
```json
{
  "totalIncome": 4780.00,
  "totalExpense": -690.75,
  "netBalance": 4089.25,
  "transactions": [
    {
      "id": "123",
      "description": "Monthly Salary",
      "category": "Salary",
      "division": "Personal",
      "account": "Bank Account",
      "amount": 3500.00,
      "date": "2026-02-02T08:00:00"
    }
  ]
}
```

---

## 📝 Entry APIs (Alternative Transaction Management)

### Add Financial Entry
**Endpoint:** `POST /entries`

**Request Body:**
```json
{
  "userId": "user123",
  "type": "income",
  "amount": 1200.00,
  "description": "Freelance Project",
  "category": "Freelance",
  "division": "Office",
  "account": "Bank Account",
  "date": "2026-02-03"
}
```

**Response:**
```json
{
  "id": "entry123",
  "userId": "user123",
  "type": "income",
  "amount": 1200.00,
  "description": "Freelance Project",
  "category": "Freelance",
  "date": "2026-02-03"
}
```

### Get User Entries
**Endpoint:** `GET /entries`

**Query Parameters:**
- `userId` (required): User identifier

**Example:**
```
GET /entries?userId=user123
```

**Response:**
```json
[
  {
    "id": "entry123",
    "userId": "user123",
    "type": "income",
    "amount": 1200.00,
    "description": "Freelance Project",
    "date": "2026-02-03"
  }
]
```

---

## 🏦 Account APIs

### Create Account
**Endpoint:** `POST /accounts`

**Request Body:**
```json
{
  "name": "Savings Account",
  "type": "savings",
  "balance": 15000.00,
  "userId": "user123"
}
```

**Response:**
```json
{
  "id": "acc123",
  "name": "Savings Account",
  "type": "savings",
  "balance": 15000.00
}
```

### Get All Accounts
**Endpoint:** `GET /accounts`

**Response:**
```json
[
  {
    "id": "acc123",
    "name": "Main Checking Account",
    "type": "checking",
    "balance": 5240.75
  },
  {
    "id": "acc124",
    "name": "Savings Account",
    "type": "savings",
    "balance": 15800.00
  }
]
```

---

## 💸 Transfer APIs

### Transfer Funds Between Accounts
**Endpoint:** `POST /transfers`

**Request Body:**
```json
{
  "fromAccountId": "acc123",
  "toAccountId": "acc124",
  "amount": 500.00,
  "date": "2026-02-03",
  "note": "Monthly savings transfer"
}
```

**Response:**
```json
{
  "id": "transfer123",
  "fromAccountId": "acc123",
  "toAccountId": "acc124",
  "amount": 500.00,
  "date": "2026-02-03",
  "status": "completed"
}
```

---

## 📊 Report APIs

### Get Report Transactions
**Endpoint:** `GET /reports/transactions`

**Response:**
```json
[
  {
    "id": "123",
    "description": "Salary - Executive",
    "category": "Salary",
    "amount": 3800.00,
    "date": "2024-07-21"
  }
]
```

### Get Report Summary
**Endpoint:** `GET /reports/summary`

**Response:**
```json
{
  "totalIncome": 7000.00,
  "totalExpense": 4550.00,
  "netBalance": 2450.00,
  "incomeCategories": {
    "Salary": 4500.00,
    "Freelance": 1500.00,
    "Investments": 800.00
  },
  "expenseCategories": {
    "Housing": 1500.00,
    "Transportation": 800.00,
    "Food": 750.00
  }
}
```

### Download PDF Report
**Endpoint:** `GET /reports/download`

**Response:** PDF file (binary)

**Usage in Frontend:**
```javascript
const response = await apiService.reports.downloadPdf();
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'financial-report.pdf');
document.body.appendChild(link);
link.click();
```

---

## ⚙️ Settings / User Profile APIs

### Get User Profile
**Endpoint:** `GET /settings/profile`

**Query Parameters:**
- `authUserId` (required): Authenticated user ID

**Example:**
```
GET /settings/profile?authUserId=user123
```

**Response:**
```json
{
  "id": "profile123",
  "userId": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Update User Profile
**Endpoint:** `PUT /settings/profile`

**Query Parameters:**
- `authUserId` (required): Authenticated user ID

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response:**
```json
{
  "id": "profile123",
  "userId": "user123",
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

---

## 🔧 Common Headers

All requests should include:
```
Content-Type: application/json
```

For authenticated requests (when implemented):
```
Authorization: Bearer <token>
```

---

## ❌ Error Responses

### Standard Error Format:
```json
{
  "timestamp": "2026-02-03T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/transactions/add"
}
```

### Common HTTP Status Codes:
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 📝 Data Models

### Transaction Model
```javascript
{
  id: string,
  type: "income" | "expense",
  amount: number,
  date: string (ISO 8601),
  dateTime: string (ISO 8601),
  description: string,
  category: string,
  division: string,
  account: string,
  userId: string
}
```

### Account Model
```javascript
{
  id: string,
  name: string,
  type: string,
  balance: number,
  userId: string
}
```

### User Profile Model
```javascript
{
  id: string,
  userId: string,
  name: string,
  email: string,
  avatar: string
}
```

---

## 🚀 Usage Examples with JavaScript/Axios

### Example 1: Add Transaction
```javascript
import axios from 'axios';

const addTransaction = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/transactions/add',
      {
        type: 'expense',
        amount: -50.00,
        description: 'Dinner',
        category: 'Food & Dining',
        division: 'Personal',
        account: 'Credit Card',
        date: '2026-02-03',
        dateTime: '2026-02-03T19:30:00'
      }
    );
    console.log('Transaction added:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};
```

### Example 2: Get Dashboard Data
```javascript
const getDashboard = async (userId, from, to) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/dashboard/summary',
      {
        params: { userId, from, to }
      }
    );
    console.log('Dashboard:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

getDashboard('user123', '2026-01-01', '2026-02-28');
```

### Example 3: Transfer Funds
```javascript
const transferFunds = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/transfers',
      {
        fromAccountId: 'acc123',
        toAccountId: 'acc124',
        amount: 500,
        date: '2026-02-03',
        note: 'Savings transfer'
      }
    );
    console.log('Transfer successful:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};
```

---

## 📌 Notes

- All dates should be in `YYYY-MM-DD` format
- DateTime values should be in ISO 8601 format
- Amounts should be numbers (negative for expenses, positive for income)
- The backend uses MongoDB, so IDs are MongoDB ObjectIds
- CORS is enabled for `http://localhost:3000` (React frontend)

---

## 🔍 Testing APIs

### Using cURL:
```bash
# Get dashboard
curl http://localhost:8080/api/home/dashboard

# Add transaction
curl -X POST http://localhost:8080/api/transactions/add \
  -H "Content-Type: application/json" \
  -d '{"type":"income","amount":1000,"description":"Salary","category":"Salary","date":"2026-02-03"}'
```

### Using Postman:
1. Import the API endpoints
2. Set base URL: `http://localhost:8080/api`
3. Use the examples above for request bodies
4. Make sure backend is running on port 8080

---

This documentation covers all available endpoints in the Money Manager backend. Refer to this when integrating the React frontend with the Spring Boot backend.
