# Complete Setup Guide - Money Manager Application

## 📦 What You Need to Run Both Backend and Frontend Together

### Prerequisites Checklist

- [ ] Java 17 or higher installed
- [ ] Maven installed (or use ./mvnw included in backend)
- [ ] Node.js (v14+) and npm installed
- [ ] MongoDB installed and running
- [ ] Git (optional, for version control)

---

## 🔧 STEP-BY-STEP SETUP INSTRUCTIONS

### Part 1: Set Up MongoDB Database

#### Option A: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   - Download from: https://www.mongodb.com/try/download/community
   - Install following the instructions for your OS

2. **Start MongoDB Service**
   
   **Windows:**
   ```cmd
   net start MongoDB
   ```
   
   **macOS:**
   ```bash
   brew services start mongodb-community
   ```
   
   **Linux:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Verify MongoDB is Running**
   ```bash
   mongosh
   ```
   If you see the MongoDB shell, you're good to go!

#### Option B: MongoDB Atlas (Cloud)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `application.properties` in backend with your connection string

---

### Part 2: Set Up and Run the Backend (Spring Boot)

1. **Navigate to Backend Directory**
   ```bash
   cd money-manager-backend
   ```

2. **Verify application.properties**
   
   Open `src/main/resources/application.properties` and verify:
   ```properties
   spring.application.name=money-manager-backend
   server.port=8080
   
   # MongoDB Local Connection
   spring.data.mongodb.host=localhost
   spring.data.mongodb.port=27017
   spring.data.mongodb.database=moneymanager
   
   spring.data.mongodb.auto-index-creation=true
   ```

3. **Build the Backend**
   
   **Windows:**
   ```cmd
   mvnw.cmd clean install
   ```
   
   **macOS/Linux:**
   ```bash
   ./mvnw clean install
   ```

4. **Run the Backend**
   
   **Option A - Using Maven:**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   **Option B - Using JAR:**
   ```bash
   ./mvnw package
   java -jar target/money-manager-backend-0.0.1-SNAPSHOT.jar
   ```
   
   **Option C - Using IDE:**
   - Open the project in IntelliJ IDEA or Eclipse
   - Run the `MoneyManagerApplication.java` main class

5. **Verify Backend is Running**
   
   Open browser and go to: `http://localhost:8080/api/home/dashboard`
   
   You should see a JSON response (even if empty, that's OK!)

---

### Part 3: Set Up and Run the Frontend (React.js)

1. **Open a NEW Terminal/Command Prompt**
   (Keep the backend terminal running!)

2. **Navigate to Frontend Directory**
   ```bash
   cd money-manager-frontend
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This will install:
   - React and React-DOM
   - React Router for navigation
   - Axios for API calls
   - Recharts for charts/graphs
   - Lucide React for icons
   - And other dependencies

4. **Verify Environment Configuration**
   
   Check `.env` file contains:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   ```

5. **Start the Frontend**
   ```bash
   npm start
   ```
   
   The React development server will start and automatically open your browser to:
   `http://localhost:3000`

---

## ✅ Verification: Is Everything Working?

### Backend Verification

1. **Check Backend Console**
   - You should see: "Started MoneyManagerApplication"
   - No red error messages

2. **Test API Endpoint**
   ```bash
   curl http://localhost:8080/api/home/dashboard
   ```
   Or open in browser: http://localhost:8080/api/home/dashboard

### Frontend Verification

1. **Check Browser**
   - Application opens at http://localhost:3000
   - No errors in browser console (Press F12)
   - You can see the sidebar and navigate pages

2. **Test API Connection**
   - Navigate to Home page
   - Check if data loads (even if it's empty initially)
   - Try adding a transaction
   - Check browser console for any errors

---

## 🎯 Usage Instructions

### Adding Your First Transaction

1. Click "Add Transaction" button (top right)
2. Select Income or Expense
3. Fill in the amount (e.g., 1000)
4. Select a date
5. Add description (e.g., "Monthly Salary")
6. Select category, division, and account
7. Click "Save Transaction"
8. Check if it appears in the transactions list

### Navigating the Application

- **Home**: Overview dashboard with total balance and recent activity
- **Dashboard**: Detailed analytics with charts and graphs
- **Transactions**: Complete list of all transactions with filters
- **Accounts & Transfer**: Manage accounts and transfer funds
- **Reports**: Generate and download financial reports
- **Settings**: Update profile and preferences

---

## 🔄 Typical Workflow

### Running Both Applications Daily

1. **Start MongoDB** (if not running as service)
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```

2. **Start Backend** (in Terminal 1)
   ```bash
   cd money-manager-backend
   ./mvnw spring-boot:run
   ```
   Wait for: "Started MoneyManagerApplication"

3. **Start Frontend** (in Terminal 2)
   ```bash
   cd money-manager-frontend
   npm start
   ```
   Browser opens automatically

4. **Use the Application**
   - Navigate through pages
   - Add transactions
   - View reports
   - Manage accounts

5. **Stop Applications**
   - Press `Ctrl+C` in both terminals to stop
   - Stop MongoDB if needed

---

## 🐛 Common Issues and Solutions

### Issue 1: "Port 8080 already in use"

**Solution:**
```bash
# Find process using port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8080 | xargs kill -9
```

Or change backend port in `application.properties`:
```properties
server.port=8081
```
And update frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:8081/api
```

### Issue 2: "Port 3000 already in use"

**Solution:**
- React will prompt you to use port 3001
- Type 'Y' to accept

Or manually specify port:
```bash
PORT=3001 npm start
```

### Issue 3: "Cannot connect to MongoDB"

**Solution:**
```bash
# Verify MongoDB is running
mongosh

# If not running, start it:
# macOS:
brew services start mongodb-community

# Windows:
net start MongoDB

# Linux:
sudo systemctl start mongod
```

### Issue 4: "CORS Error" or "Network Error"

**Solution:**
1. Verify backend is running
2. Check backend has CORS enabled
3. Verify `.env` has correct backend URL
4. Clear browser cache and reload

### Issue 5: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 6: Backend compilation errors

**Solution:**
```bash
# Clean and rebuild
./mvnw clean install -DskipTests

# If still fails, check Java version
java -version
# Should be Java 17 or higher
```

---

## 📊 Understanding Data Flow

```
User Interface (React)
         ↓
    User Action (e.g., Add Transaction)
         ↓
    React Component captures data
         ↓
    API Service (axios) sends HTTP request
         ↓
    Spring Boot Backend receives request
         ↓
    Service Layer processes business logic
         ↓
    Repository Layer interacts with MongoDB
         ↓
    MongoDB stores/retrieves data
         ↓
    Response flows back through layers
         ↓
    React receives response
         ↓
    Component updates state
         ↓
    UI re-renders with new data
         ↓
    Charts/Diagrams generated from real data
```

---

## 🚀 Quick Start Commands (Copy-Paste Ready)

### Terminal 1 - Backend:
```bash
cd money-manager-backend
./mvnw spring-boot:run
```

### Terminal 2 - Frontend:
```bash
cd money-manager-frontend
npm install
npm start
```

---

## 📝 Important Notes

1. **Always start backend BEFORE frontend**
2. **Keep MongoDB running** while using the application
3. **Don't close terminal windows** while applications are running
4. **Both applications must be running** for full functionality
5. **Backend URL in frontend `.env`** must match actual backend port

---

## 🎓 For First-Time Setup

If this is your first time setting up:

1. Follow Part 1 (MongoDB) - only once
2. Follow Part 2 (Backend) - once, then daily start
3. Follow Part 3 (Frontend) - once, then daily start
4. After first setup, use Quick Start Commands daily

---

## 📞 Getting Help

If you encounter issues:

1. **Check Backend Console**: Look for error messages
2. **Check Frontend Console**: Press F12 in browser
3. **Verify MongoDB**: Run `mongosh` to check connection
4. **Check Ports**: Ensure 8080 and 3000 are not in use
5. **Restart Everything**: Sometimes a clean restart solves issues

---

## ✨ Success Indicators

You know everything is working when:

- ✅ Backend console shows "Started MoneyManagerApplication"
- ✅ Frontend opens in browser at localhost:3000
- ✅ No red errors in either console
- ✅ You can navigate all pages
- ✅ You can add and see transactions
- ✅ Charts display data
- ✅ API calls complete successfully

Happy coding! 🎉
