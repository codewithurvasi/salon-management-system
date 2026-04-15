# 🚀 Salon Management System - Quick Start Guide

## 📋 Project Overview

A complete salon management system with:
- **Admin Dashboard** - Real-time analytics and management
- **Booking System** - Appointment scheduling
- **Staff Management** - Employee profiles and performance
- **Service Catalog** - Services with pricing
- **Customer Management** - Customer records and history

---

## ⚡ Quick Start (5 Minutes)

### 1️⃣ MongoDB Setup
```bash
# Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Copy to backend/.env as MONGO_URI

# Option 2: Local MongoDB
# Make sure MongoDB is running locally
# MONGO_URI=mongodb://localhost:27017/salon_db
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MONGO_URI
npm run seed
npm run dev
```

✅ You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### 3️⃣ Frontend Setup
```bash
cd ..
npm install
npm run dev
```

✅ Open `http://localhost:5173` in browser

---

## 🎯 What's Working Right Now

### ✅ Dashboard Features
- Real-time statistics (total bookings, revenue, etc.)
- Appointment management with status tracking
- Customer records with booking history
- Staff profiles with performance ratings
- Service catalog with pricing
- Revenue analytics charts
- Appointment trends
- Top services and staff listings

### ✅ Backend Features
- 12 API endpoints
- MongoDB database with 5 models
- Pagination and filtering
- Error handling
- CORS enabled

### ✅ Data Included
- 6 Sample services
- 5 Sample staff members
- 5 Sample customers
- 6 Sample appointments

---

## 📚 Project Structure

```
salon-management-system/
├── backend/
│   ├── models/              # Database schemas
│   │   ├── Appointment.js
│   │   ├── Customer.js
│   │   ├── Service.js
│   │   ├── StaffMember.js
│   │   └── DashboardMetric.js
│   ├── controllers/         # Business logic
│   │   └── dashboardController.js
│   ├── routes/             # API endpoints
│   │   └── dashboardRoutes.js
│   ├── utils/              # Helper functions
│   │   └── seedDatabase.js
│   ├── config/             # Configuration
│   │   └── db.js
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env               # Configuration (create from .env.example)
│
├── src/
│   ├── api/               # API communication
│   │   ├── axios.js       # Axios setup
│   │   └── dashboardApi.js
│   ├── pages/             # React pages
│   │   ├── dashboard/
│   │   │   ├── DashboardHome.jsx    # ✅ Updated - Real Data
│   │   │   ├── Appointments.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── Staff.jsx
│   │   │   └── ...
│   │   └── website/
│   ├── components/        # Reusable components
│   │   ├── dashboard/
│   │   └── common/
│   └── ...
│
├── BACKEND_SETUP.md       # Detailed backend setup
└── README.md
```

---

## 🔌 API Endpoints

### Dashboard Analytics
```
GET  /api/dashboard/overview              # Main dashboard stats
GET  /api/dashboard/revenue/analytics     # Monthly revenue
GET  /api/dashboard/appointments/trend    # Appointment trends
```

### Appointments
```
GET    /api/dashboard/appointments                    # List all
POST   /api/dashboard/appointments                    # Create
PATCH  /api/dashboard/appointments/:id/status        # Update status
DELETE /api/dashboard/appointments/:id               # Cancel
```

### Customers & Staff
```
GET /api/dashboard/customers              # List customers
GET /api/dashboard/staff                  # List staff
GET /api/dashboard/staff/top              # Top staff by rating
```

### Services
```
GET /api/dashboard/services               # All services
GET /api/dashboard/services/top           # Top services
```

---

## 🔍 Test Backend API

### Using curl
```bash
# Get dashboard overview
curl http://localhost:5000/api/dashboard/overview

# Get appointments
curl "http://localhost:5000/api/dashboard/appointments?page=1&limit=10"

# Get top staff
curl http://localhost:5000/api/dashboard/staff/top?limit=4
```

### Using Postman
1. Import these endpoints
2. Set base URL: `http://localhost:5000/api/dashboard`
3. Test each endpoint

---

## 🛠️ Common Commands

### Backend
```bash
cd backend

npm install              # Install dependencies
npm run dev             # Start with hot reload
npm run seed            # Seed database with sample data
node utils/seedDatabase.js  # Alternative seed command
```

### Frontend
```bash
npm install             # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

---

## ⚙️ Configuration

### Backend Environment Variables (`.env`)

```env
# Required
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/salon_db
PORT=5000

# Optional
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration
- API Base URL: `http://localhost:5000/api/dashboard`
- Located in: `src/api/axios.js`

---

## 🚨 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is free
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Change port in .env
PORT=3001
```

### MongoDB connection error
```bash
# Verify .env file exists in backend folder
cd backend && ls -la | grep .env

# Check MONGO_URI format
# Should be: mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

### Frontend can't reach backend
```bash
# 1. Make sure backend is running
curl http://localhost:5000/api/dashboard/overview

# 2. Check console for CORS errors
# CORS is enabled in server.js, should work

# 3. Verify API URL in src/api/axios.js
```

### Port already in use
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

---

## 📊 Database Schema (Quick Reference)

### Appointment
- customerName, email, phone, service, stylist, date, time, duration, price, status, notes

### Customer
- name, email (unique), phone, address, city, totalSpent, totalBookings, lastVisit, status, notes

### Service
- name (unique), description, price, duration, category, totalBookings, revenue, rating, image, isActive

### StaffMember
- name, email (unique), phone, specialization, experience, joinDate, totalBookings, completedBookings, rating, totalEarnings, status, avatar, biography

### DashboardMetric
- totalBookings, completedBookings, pendingBookings, cancelledBookings, todayAppointments, monthlyRevenue, dailyRevenue, activeCustomers, repeatCustomers, averageRating, completionRate

---

## ✨ Next Steps

### Phase 1: Current Status ✅
- [x] Database models created
- [x] Backend API endpoints built
- [x] DashboardHome connected to real data
- [x] Sample data seeded

### Phase 2: Complete (If Needed)
- [ ] Connect Appointments.jsx to API
- [ ] Connect Customers.jsx to API
- [ ] Connect Staff.jsx to API
- [ ] Add form validations
- [ ] Implement user authentication

### Phase 3: Advanced (Optional)
- [ ] Add more analytics
- [ ] Email notifications
- [ ] SMS integration
- [ ] Payment integration
- [ ] Advanced reporting

---

## 🎓 Learning Resources

### Tech Stack Used
- **Frontend**: React 18+, Tailwind CSS, Recharts, React Router, Axios
- **Backend**: Express.js, Mongoose, MongoDB, CORS
- **Tools**: Vite, Nodemon, ES6 Modules

### Useful Links
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📞 Support

### Check Logs
1. Backend console for API errors
2. Browser console for frontend errors
3. MongoDB logs in Atlas dashboard

### Common Issues
1. **Port in use**: Use different port in `.env`
2. **MongoDB error**: Verify MONGO_URI
3. **CORS error**: Already enabled, check network tab
4. **Data not loading**: Check if backend is running

---

## 📝 Notes

- All data is currently in memory (MongoDB)
- Seed script resets database each time it runs
- Sample data is realistic for salon business
- Charts show 6-month trends
- Pagination limit is 10 by default

---

## 🎉 You're All Set!

Your salon management system is ready to use. Start the backend and frontend, and begin managing your salon!

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
npm run dev
```

Then open `http://localhost:5173` and start using the dashboard! 🚀

