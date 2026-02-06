# Money Manager Frontend - React.js Application

A professional financial management application built with React.js that integrates with a Spring Boot backend.

## 🌟 Features

- **Dashboard**: Visual analytics with charts and graphs showing income vs expenses
- **Home Page**: Quick overview of financial health with recent transactions
- **Transactions Management**: Add, view, filter, and manage all transactions
- **Accounts & Transfers**: Manage multiple accounts and transfer funds between them
- **Reports**: Generate detailed financial reports with export to PDF
- **Settings**: User profile management and password changes
- **Responsive Design**: Modern, clean UI that works on all devices

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher) installed
2. **npm** or **yarn** package manager
3. **Spring Boot Backend** running on `http://localhost:8080`
4. **MongoDB** database running (for backend)

## 🚀 Getting Started

### Step 1: Install Dependencies

Navigate to the project directory and install required packages:

```bash
cd money-manager-frontend
npm install
```

Or with yarn:

```bash
yarn install
```

### Step 2: Configure Environment Variables

The `.env` file is already configured to connect to the backend at `http://localhost:8080/api`.

If your backend runs on a different port, update the `.env` file:

```env
REACT_APP_API_URL=http://localhost:YOUR_PORT/api
```

### Step 3: Start the Backend

Make sure your Spring Boot backend is running:

```bash
cd money-manager-backend
./mvnw spring-boot:run
```

Or if using an IDE, run the `MoneyManagerApplication.java` main class.

The backend should be accessible at `http://localhost:8080`

### Step 4: Start the React Frontend

In a new terminal, start the React development server:

```bash
cd money-manager-frontend
npm start
```

Or with yarn:

```bash
yarn start
```

The application will automatically open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
money-manager-frontend/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/          # Reusable components
│   │   ├── Sidebar.js       # Navigation sidebar
│   │   └── AddTransactionModal.js  # Transaction modal
│   ├── pages/               # Page components
│   │   ├── Home.js          # Home dashboard
│   │   ├── Dashboard.js     # Analytics dashboard
│   │   ├── Transactions.js  # Transactions page
│   │   ├── Accounts.js      # Accounts & transfers
│   │   ├── Reports.js       # Reports page
│   │   └── Settings.js      # Settings page
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── package.json             # Dependencies
└── README.md                # This file
```

## 🔌 API Integration

The frontend integrates with the following backend APIs:

### Authentication
- `POST /api/auth/signup` - User registration

### Home Dashboard
- `GET /api/home/dashboard` - Get dashboard overview

### Dashboard (with filters)
- `GET /api/dashboard/summary` - Get financial summary
- `GET /api/dashboard/transactions` - Get filtered transactions

### Transactions
- `POST /api/transactions/add` - Add new transaction
- `GET /api/transactions/overview` - Get transactions overview

### Entries (Alternative)
- `POST /api/entries` - Add financial entry
- `GET /api/entries?userId={userId}` - Get user entries

### Accounts
- `POST /api/accounts` - Create account
- `GET /api/accounts` - Get all accounts

### Transfers
- `POST /api/transfers` - Transfer funds between accounts

### Reports
- `GET /api/reports/transactions` - Get all transactions for reports
- `GET /api/reports/summary` - Get financial summary
- `GET /api/reports/download` - Download PDF report

### Settings
- `GET /api/settings/profile?authUserId={userId}` - Get user profile
- `PUT /api/settings/profile?authUserId={userId}` - Update profile

## 🎨 Key Technologies

- **React.js 18** - UI framework
- **React Router 6** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icon library

## 📊 Data Flow

The application follows this data flow:

1. **User Input** → User enters data through forms and UI
2. **React Component** → Component captures and validates data
3. **API Service** → Service layer sends HTTP request to backend
4. **Spring Boot Backend** → Processes request and interacts with MongoDB
5. **Response** → Backend returns data
6. **State Update** → React updates component state
7. **UI Render** → Component re-renders with new data
8. **Charts/Diagrams** → Recharts generates visualizations from backend data

## 🔧 Configuration

### CORS Configuration

The backend must allow CORS from the React frontend. Make sure your Spring Boot backend has proper CORS configuration:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

Or configure globally in `SecurityConfig.java`

### Backend Connection

If you need to change the backend URL:

1. Update `.env` file:
   ```env
   REACT_APP_API_URL=http://your-backend-url:port/api
   ```

2. Restart the React development server

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## 🐛 Troubleshooting

### Backend Connection Issues

If you see "Failed to load dashboard data":

1. Verify backend is running: `curl http://localhost:8080/api/home/dashboard`
2. Check CORS configuration in backend
3. Verify MongoDB is running and accessible
4. Check browser console for detailed error messages

### Port Conflicts

If port 3000 is already in use:
- The application will prompt to use a different port (e.g., 3001)
- Or manually specify: `PORT=3001 npm start`

### API Errors

Check the browser console (F12) for detailed error messages. Common issues:
- Backend not running
- CORS errors (update backend CORS config)
- Network connectivity issues
- Invalid request data

## 📝 Notes

- All monetary values are displayed in USD format
- Dates are formatted according to US locale
- The application uses a mock userId ('user123') - implement proper authentication in production
- Charts and diagrams are generated dynamically from backend data
- Transactions can be edited within 12 hours of creation

## 🚀 Production Build

To create a production build:

```bash
npm run build
```

The build folder will contain optimized production files that can be deployed to any static hosting service.

## 📞 Support

For issues or questions:
1. Check the backend logs for API errors
2. Check browser console for frontend errors
3. Verify all dependencies are installed
4. Ensure MongoDB is running and accessible

## 🔐 Security Note

This is a development setup. For production:
- Implement proper authentication (JWT, OAuth)
- Use environment-specific configuration
- Enable HTTPS
- Implement proper error handling
- Add input validation and sanitization
- Set up proper CORS policies
