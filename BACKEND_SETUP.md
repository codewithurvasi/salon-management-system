# Admin Dashboard - Backend & Database Setup

## ✅ What's Been Created

### Database Models
- **Appointment** - Salon appointments with status tracking
- **Customer** - Customer information and booking history
- **Service** - Services offered with pricing and ratings
- **StaffMember** - Staff/stylist information
- **DashboardMetric** - Dashboard metrics and analytics

### Backend API Endpoints
- `/api/dashboard/overview` - Dashboard overview stats
- `/api/dashboard/appointments` - All appointments (with filter & pagination)
- `/api/dashboard/customers` - All customers (with filter & pagination)
- `/api/dashboard/staff` - All staff (with filter & pagination)
- `/api/dashboard/staff/top` - Top performing staff
- `/api/dashboard/services` - All services (with filter & pagination)
- `/api/dashboard/services/top` - Top services
- `/api/dashboard/revenue/analytics` - Monthly revenue data
- `/api/dashboard/appointments/trend` - Appointment trends

### Frontend Integration
- DashboardHome now fetches real data from backend
- Fully dynamic dashboard with real-time updates

---

## 🚀 How to Run

### 1. Setup Backend

#### Step 1: Install Dependencies
```bash
cd backend
npm install
```

#### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/salon_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**Get MongoDB Connection String:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy connection string
4. Replace `username` and `password`
5. Change `salon_db` to your database name

#### Step 3: Seed Database with Initial Data

```bash
npm run seed
```

Or add this to your `package.json` scripts:
```json
"scripts": {
  "dev": "nodemon server.js",
  "seed": "node utils/seedDatabase.js"
}
```

#### Step 4: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

---

### 2. Setup Frontend

The frontend is already configured to use the backend API at `http://localhost:5000/api/dashboard`

Make sure:
1. Backend is running on port 5000
2. Frontend is running (usually on port 5173 with Vite)
3. CORS is enabled (already configured in `server.js`)

---

## 📊 Database Schema

### Appointment
```javascript
{
  customerName: String,
  email: String,
  phone: String,
  service: String,
  stylist: String,
  date: Date,
  time: String,
  duration: Number (minutes),
  price: Number,
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled",
  notes: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Customer
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  address: String,
  city: String,
  totalSpent: Number,
  totalBookings: Number,
  lastVisit: Date,
  status: "Active" | "Inactive",
  notes: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Service
```javascript
{
  name: String (unique),
  description: String,
  price: Number,
  duration: Number (minutes),
  category: "Hair" | "Makeup" | "Facial" | "Skin" | "Nails" | "Threading" | "Massage",
  totalBookings: Number,
  revenue: Number,
  rating: Number (0-5),
  image: String,
  isActive: Boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### StaffMember
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  specialization: String,
  experience: String,
  joinDate: Date,
  totalBookings: Number,
  completedBookings: Number,
  rating: Number (0-5),
  totalEarnings: Number,
  status: "Active" | "Inactive" | "Leave",
  avatar: String,
  biography: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🔌 API Examples

### Get Dashboard Overview
```bash
curl http://localhost:5000/api/dashboard/overview
```

Response:
```json
{
  "status": "success",
  "data": {
    "totalBookings": 281,
    "todayAppointments": 6,
    "monthlyRevenue": 2474000,
    "activeCustomers": 5,
    "pendingAppointments": 1,
    "totalStaff": 5,
    "completionRate": 75.4,
    "averageRating": 4.7
  }
}
```

### Get All Appointments
```bash
curl "http://localhost:5000/api/dashboard/appointments?status=Pending&page=1&limit=10"
```

### Get Top Staff
```bash
curl "http://localhost:5000/api/dashboard/staff/top?limit=4"
```

### Create Appointment
```bash
curl -X POST http://localhost:5000/api/dashboard/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "service": "Hair Cut",
    "stylist": "Aisha Khan",
    "date": "2026-03-20T10:00:00",
    "time": "10:00 AM",
    "duration": 45,
    "price": 2000
  }'
```

### Update Appointment Status
```bash
curl -X PATCH http://localhost:5000/api/dashboard/appointments/ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Confirmed"}'
```

---

## 🛠️ Troubleshooting

### Issue: MongoDB Connection Error
```
❌ DB Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Check MongoDB URI in `.env`
- Make sure MongoDB is running
- Verify internet connection (for MongoDB Atlas)

### Issue: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** 
- Kill process on port 5000
- Or change PORT in `.env`

### Issue: CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** CORS is already enabled in server.js

### Issue: Seed Data Not Loading
```
npm run seed
```
Make sure `.env` file is configured first

---

## 📱 Frontend Changes

The following have been updated:

### `src/api/dashboardApi.js`
- All functions now call real backend
- Removed mock data
- Added error handling

### `src/pages/dashboard/DashboardHome.jsx`
- Now fetches real data on mount
- Shows loading state
- Error handling with alerts
- Real-time statistics

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created
- [ ] `.env` file configured with MONGO_URI
- [ ] `npm install` run in backend folder
- [ ] `npm run seed` executed successfully
- [ ] `npm run dev` started backend server
- [ ] Frontend running and loading dashboard
- [ ] Dashboard showing real data from database
- [ ] No CORS errors in console

---

## 🎯 Next Steps

1. **Test Backend APIs** - Use Postman or curl
2. **Verify Frontend Connection** - Check browser console
3. **Add More Data** - Use API endpoints to create more records
4. **Implement User Auth** - Add authentication (optional)
5. **Deploy** - Push to production

---

## 📊 Sample Data

Database is seeded with:
- 6 Services
- 5 Staff Members
- 5 Customers
- 6 Appointments

All with realistic data for testing.

---

## 🔐 Important Notes

- Keep `.env` file secret (add to `.gitignore`)
- Use strong MongoDB credentials
- Test all API endpoints before deployment
- Monitor MongoDB usage (free tier has limits)

---

**Status**: ✅ Ready for Development & Testing

