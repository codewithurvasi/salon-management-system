# Converting Dashboard Pages to Use Real API Data

## Overview

All dashboard pages have been structured to work with both static data and API responses. Here's how to update the remaining pages to use real backend data.

---

## Pages Status

### ✅ Completed
- **DashboardHome.jsx** - Connected to 6 API endpoints

### ⏳ Ready to Update (Use guides below)
- **Appointments.jsx** - List all appointments with filtering
- **Customers.jsx** - List all customers with search
- **Staff.jsx** - List all staff members with filtering

### Not Yet Updated
- **ManageService.jsx**
- **Revenue.jsx**
- **Reviews.jsx**
- **Inventory.jsx**
- **Settings.jsx**

---

## 📱 Appointments.jsx Update Pattern

### Current State
Uses static data from `dashboardData.js`

### Required Changes

1. **Import API function**
```javascript
import { getAllAppointments, updateAppointmentStatus, cancelAppointment } from "../../api/dashboardApi";
```

2. **Replace useState initialization**
```javascript
// OLD
const [appointments, setAppointments] = useState(initialAppointments);

// NEW
const [appointments, setAppointments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
```

3. **Add useEffect hook (after useState declarations)**
```javascript
useEffect(() => {
  fetchAppointments();
}, [filters.status, page]);

const fetchAppointments = async () => {
  try {
    setLoading(true);
    const status = filters.status || "";
    const response = await getAllAppointments(status, page, 10);
    setAppointments(response.data.appointments);
    setTotalPages(response.data.totalPages);
    setError(null);
  } catch (err) {
    setError("Failed to load appointments");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

4. **Update handleStatusChange to call API**
```javascript
const handleStatusChange = async (aptId, newStatus) => {
  try {
    await updateAppointmentStatus(aptId, newStatus);
    // Update local state
    setAppointments(
      appointments.map((apt) =>
        apt._id === aptId ? { ...apt, status: newStatus } : apt
      )
    );
  } catch (err) {
    setError("Failed to update appointment status");
    console.error(err);
  }
};
```

5. **Update handleDeleteAppointment to call API**
```javascript
const handleDeleteAppointment = async (aptId) => {
  try {
    await cancelAppointment(aptId);
    // Update local state
    setAppointments(appointments.filter((apt) => apt._id !== aptId));
    setDeleteConfirm(false);
    setSelectedAppointment(null);
  } catch (err) {
    setError("Failed to cancel appointment");
    console.error(err);
  }
};
```

6. **Add loading state display**
```javascript
if (loading) {
  return <div className="p-6">Loading appointments...</div>;
}

if (error) {
  return <div className="p-6 text-red-600">{error}</div>;
}

if (appointments.length === 0) {
  return <div className="p-6">No appointments found.</div>;
}
```

7. **Update ID references**
- Change `apt.id` to `apt._id` (MongoDB uses `_id`)
- Update filter comparisons accordingly

8. **Add pagination controls**
```javascript
// Add before closing return statement
<div className="flex justify-between items-center mt-4">
  <button 
    onClick={() => setPage(p => Math.max(1, p - 1))}
    disabled={page === 1}
  >
    Previous
  </button>
  <span>Page {page} of {totalPages}</span>
  <button 
    onClick={() => setPage(p => p + 1)}
    disabled={page === totalPages}
  >
    Next
  </button>
</div>
```

---

## 👥 Customers.jsx Update Pattern

### Current State
Uses static customer data

### Required Changes (Similar to Appointments)

1. **Import API function**
```javascript
import { getAllCustomers } from "../../api/dashboardApi";
```

2. **Setup state**
```javascript
const [customers, setCustomers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [page, setPage] = useState(1);
```

3. **Add useEffect**
```javascript
useEffect(() => {
  fetchCustomers();
}, [filters.status, page]);

const fetchCustomers = async () => {
  try {
    setLoading(true);
    const status = filters.status || "";
    const response = await getAllCustomers(status, page, 10);
    setCustomers(response.data.customers);
    setError(null);
  } catch (err) {
    setError("Failed to load customers");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

4. **Update ID references to `_id`**

5. **Change field names if needed**
- API returns: `name`, `email`, `phone`, `totalBookings`, `totalSpent`, `lastVisit`, `status`
- Update column headers to match

---

## 👔 Staff.jsx Update Pattern

### Current State
Uses static staff data

### Required Changes (Similar pattern)

1. **Import API function**
```javascript
import { getAllStaff } from "../../api/dashboardApi";
```

2. **Setup state** (same as above)

3. **Add useEffect**
```javascript
const fetchStaff = async () => {
  try {
    setLoading(true);
    const status = filters.status || "";
    const response = await getAllStaff(status, page, 10);
    setStaff(response.data.staff);
    setError(null);
  } catch (err) {
    setError("Failed to load staff");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

4. **Update field names**
- API returns: `name`, `email`, `phone`, `specialization`, `rating`, `totalBookings`, `status`, `totalEarnings`

5. **Add pagination**

---

## 🔄 Common Patterns

### Error Handling
```javascript
catch (err) {
  const message = err.response?.data?.message || "An error occurred";
  setError(message);
  console.error(err);
}
```

### Loading State
```javascript
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
```

### Empty State
```javascript
if (items.length === 0) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No items found</p>
    </div>
  );
}
```

### Pagination
```javascript
const handleNextPage = () => {
  if (page < totalPages) setPage(page + 1);
};

const handlePreviousPage = () => {
  if (page > 1) setPage(page - 1);
};
```

---

## 🔑 Key Differences

| Aspect | Old (Static) | New (API) |
|--------|------------|----------|
| ID Field | `id` | `_id` |
| Data Source | `dashboardData.js` | Backend API |
| State Updates | Direct `setItems` | After API call |
| Loading | Not needed | Show spinner |
| Error Handling | None | Try-catch blocks |
| Pagination | Frontend | Backend query params |
| Real-time | No | Yes |

---

## 🧪 Testing

After updating each page:

1. **Start backend server**
```bash
cd backend && npm run dev
```

2. **Verify API responses**
```bash
curl http://localhost:5000/api/dashboard/appointments
curl http://localhost:5000/api/dashboard/customers
curl http://localhost:5000/api/dashboard/staff
```

3. **Check browser console** for errors
4. **Verify data loads** on page load
5. **Test filtering** and pagination
6. **Test status updates** (if applicable)

---

## 📋 Checklist for Each Page Update

- [ ] Import API functions
- [ ] Add loading/error state
- [ ] Add useEffect hook
- [ ] Implement fetch function
- [ ] Update ID references (`id` → `_id`)
- [ ] Update field names to match API
- [ ] Add loading UI
- [ ] Add error handling UI
- [ ] Update action handlers (delete, update, etc.)
- [ ] Add pagination controls
- [ ] Test with backend running
- [ ] Verify no console errors

---

## 🚀 Quick Reference

### API Functions Available
```javascript
// dashboardApi.js exports:
- getDashboardOverview()
- getAllAppointments(status, page, limit)
- getAllCustomers(status, page, limit)
- getAllStaff(status, page, limit)
- getTopStaff(limit)
- getAllServices(category, page, limit)
- getTopServices(limit)
- getRevenueAnalytics()
- getAppointmentsTrend()
- createAppointment(data)
- updateAppointmentStatus(id, status)
- cancelAppointment(id)
```

### Response Format
```javascript
{
  status: "success",
  data: {
    appointments: [...],
    totalPages: 5,
    currentPage: 1,
    total: 50
  }
}
```

---

## 💡 Pro Tips

1. **Use React Query or SWR** for better data fetching (advanced)
2. **Add debouncing** to filter inputs to reduce API calls
3. **Implement caching** to avoid refetching same data
4. **Add success toast notifications** for actions
5. **Use optimistic updates** for faster UI feedback

---

## 📚 Next Advanced Features

After updating all pages:
1. Add create/edit forms with API integration
2. Implement soft delete with restore functionality
3. Add bulk operations (select multiple items)
4. Implement real-time updates with WebSockets
5. Add export to CSV/PDF functionality

