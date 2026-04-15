# Admin Dashboard - Development Guide

## Quick Start

### What's Included
✅ Complete admin dashboard structure  
✅ 8+ reusable components  
✅ 6+ custom React hooks  
✅ Helper utilities & formatters  
✅ Mock data & sample pages  
✅ Responsive design (mobile-first)  

---

## 📁 File Structure Summary

### Components Created
```
src/components/dashboard/
├── Alerts/AlertBanner.jsx           ✓ Alert notifications
├── Charts/RevenueChart.jsx           ✓ Revenue visualization
├── Charts/AppointmentsChart.jsx      ✓ Appointments trends
├── Stats/StatsGrid.jsx               ✓ KPI cards grid
├── Stats/QuickInsights.jsx           ✓ Business insights
├── Tables/DataTable.jsx              ✓ Reusable data table
├── Tables/RecentAppointments.jsx     ✓ Recent bookings
├── Tables/TopServices.jsx            ✓ Top services
├── Tables/TopStaff.jsx               ✓ Top stylists
├── Pagination/Pagination.jsx         ✓ Page navigation
├── Forms/FilterBar.jsx               ✓ Filtering controls
├── Modals/ConfirmDialog.jsx          ✓ Confirmation dialogs
├── Empty/EmptyState.jsx              ✓ Empty state UI
└── StatCard.jsx (updated)            ✓ Individual stat card
```

### Pages Updated
```
src/pages/dashboard/
├── DashboardHome.jsx (UPDATED)       ✓ Dashboard overview
├── Appointments.jsx (UPDATED)        ✓ Full appointments interface
├── Customers.jsx (UPDATED)           ✓ Customer management
└── Staff.jsx (UPDATED)               ✓ Staff management
```

### Utilities & Hooks
```
src/hooks/useDashboard.js             ✓ 6 custom hooks
src/utils/dashboardHelpers.js         ✓ 10+ helper functions
src/api/dashboardApi.js               ✓ API integration layer
src/data/dashboardData.js (UPDATED)   ✓ Enhanced mock data
```

### Documentation
```
ADMIN_DASHBOARD_DOCS.md               ✓ Full documentation
ADMIN_DASHBOARD_SETUP.md              ✓ This file
```

---

## 🎯 Features Implemented

### Dashboard Home
- **4 KPI Cards** with trends and icons
- **Revenue Chart** showing monthly trends
- **Appointments Chart** showing status distribution
- **Quick Insights** panel with key metrics
- **Recent Appointments** table with actions
- **Top Services & Staff** lists
- **Alert System** for notifications

### Appointments Management
- Complete appointments table
- Status filtering (Confirmed, Pending, Completed, Cancelled)
- Sort by date
- Change appointment status
- Delete appointments with confirmation
- Statistics counters

### Customer Management
- Customer list with details
- Filter by status (Active/Inactive)
- Display: Name, Email, Phone, Total Spent, Bookings, Last Visit
- Statistics: Total, Active, Revenue
- Responsive layout
- Edit/Delete actions

### Staff Management
- Staff member list
- Filter by status
- Display: Name, Phone, Specialization, Experience, Rating, Bookings
- Statistics: Total, Active, Average Rating, Total Bookings
- Sorted by rating
- Edit/Delete actions

---

## 🔧 Custom Hooks Guide

### useFilters
Manage filter state for tables
```javascript
const { filters, updateFilter, resetFilters } = useFilters({ status: "" });

// Usage
updateFilter("status", "Active");
resetFilters();
```

### useSorting
Handle sorting with ascending/descending
```javascript
const { sortKey, sortOrder, sortedItems, toggleSort } = useSorting(items, "name");

// Usage
toggleSort("name"); // Switches sort order
```

### usePagination
Manage pagination state
```javascript
const { currentPage, totalPages, currentItems, goToPage, nextPage, prevPage } = usePagination(items, 10);

// Usage
goToPage(2);
nextPage();
```

### useModal
Control modal visibility
```javascript
const { isOpen, open, close, toggle } = useModal();

// Usage
<button onClick={open}>Open</button>
<ConfirmDialog isOpen={isOpen} onClose={close} />
```

### useLoading
Manage loading states
```javascript
const { isLoading, startLoading, stopLoading } = useLoading();
```

### useNotification
Manage notifications/toasts
```javascript
const { notifications, addNotification, removeNotification } = useNotification();

// Usage
addNotification("Success!", "success", 3000); // AutoDismiss in 3s
```

---

## 🛠️ Helper Functions

### Formatting
```javascript
formatCurrency(1000)           // "₹1,000.00"
formatDate("2026-03-12")       // "12 Mar 2026"
formatTime("14:30")            // "2:30 PM"
getInitials("Aisha Khan")      // "AK"
truncateText("Long text", 10)  // "Long tex..."
```

### Status & Colors
```javascript
getStatusBadgeColor("Confirmed") // "bg-green-100 text-green-800"
```

### Validation
```javascript
isValidEmail("test@example.com")  // true
isValidPhone("9876543210")        // true
```

### Data Operations
```javascript
calculatePercentageChange(150, 100)     // "+50%"
sortByKey(array, "name", "asc")         // Sorted array
filterByCriteria(array, { status: "Active" }) // Filtered
```

---

## 📊 Component Examples

### Using StatsGrid
```jsx
import StatsGrid from '@/components/dashboard/Stats/StatsGrid';
import { dashboardStats } from '@/data/dashboardData';

<StatsGrid stats={dashboardStats} />
```

### Using DataTable
```jsx
import DataTable from '@/components/dashboard/Tables/DataTable';

<DataTable 
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ]}
  data={customers}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### Using Custom Hooks
```jsx
const [searchTerm, setSearchTerm] = useState("");
const { filters, updateFilter } = useFilters();
const { sortedItems, toggleSort } = useSorting(items);
const { addNotification } = useNotification();

// Filter and sort
const filtered = sortedItems.filter(item => 
  item.name.includes(searchTerm)
);

// Show notification
addNotification("Saved successfully!", "success");
```

---

## 🎨 Styling

### Color Palette
```
Primary Pink:    #ec4899 | #db2777 (pink-600/700)
Success Green:   #10b981 (green-600)
Warning Orange:  #f59e0b (amber-500)
Danger Red:      #ef4444 (red-500)
Info Blue:       #3b82f6 (blue-500)
Background:      #f1f5f9 (slate-100)
Text Dark:       #1e293b (slate-900)
Text Light:      #475569 (slate-600)
Border:          #e2e8f0 (slate-200)
```

### Common Classes
```
// Rounded cards
.rounded-3xl     // 24px
.rounded-2xl     // 16px
.rounded-lg      // 8px

// Flexbox gaps
.gap-6           // 24px
.gap-4           // 16px
.gap-2           // 8px

// Padding
.p-6             // 24px all sides
.px-6 .py-4      // Horizontal/Vertical
```

---

## 🔌 API Integration

### Current State
Currently using mock data from `src/api/dashboardApi.js`

### How to Connect Real APIs
1. Replace mock functions with real endpoints
2. Update axios instance with backend URL
3. Handle error states
4. Add loading states

### Example
```javascript
// Before (Mock)
export const getAllAppointments = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ appointments: [...] }), 500);
  });
};

// After (Real API)
export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/api/appointments');
  return response.data;
};
```

---

## ✅ Checklist

### Core Dashboard
- [x] Dashboard home page
- [x] Stats cards with trends
- [x] Revenue & Appointments charts
- [x] Recent appointments table
- [x] Alert system

### Pages
- [x] Appointments management
- [x] Customers management
- [x] Staff management
- [ ] Services management (TODO)
- [ ] Revenue analytics (TODO)
- [ ] Reviews (TODO)
- [ ] Settings (TODO)

### Features
- [x] Filtering system
- [x] Sorting functionality
- [x] Pagination
- [x] Status badges
- [x] Confirmation dialogs
- [x] Empty states
- [x] Loading states
- [ ] Search functionality (TODO)
- [ ] Export to CSV (TODO)
- [ ] Real-time updates (TODO)

### Utilities
- [x] Custom hooks (6)
- [x] Helper functions (10+)
- [x] Data formatters
- [x] Validators
- [x] API layer

---

## 🚀 Next Steps

### Immediate
1. Replace mock data with real API calls
2. Implement authentication check
3. Add error handling
4. Add loading indicators

### Soon
1. Complete remaining dashboard pages
2. Add search functionality  
3. Implement export features
4. Add real-time notifications

### Future
1. Analytics charts
2. Reporting features
3. Bulk operations
4. Advanced filtering
5. Calendar view for appointments

---

## 📝 Notes

- All components use **Tailwind CSS** (no external UI library)
- **Mobile-first responsive design**
- Compatible with **React 16.8+** (uses hooks)
- Minimal dependencies (just Recharts for charts)
- Easy to customize colors and styles
- Modular component structure

---

## 🆘 Troubleshooting

### Issue: Charts not showing
**Solution**: Make sure `recharts` is installed
```bash
npm install recharts
```

### Issue: Styles not applied
**Solution**: Tailwind CSS configuration might be missing
Check `tailwind.config.js` exists

### Issue: Hooks errors
**Solution**: Make sure React version is 16.8+
```bash
npm update react
```

---

**Last Updated**: March 2026  
**Version**: 1.0.0  
**Status**: Ready for Development ✓
