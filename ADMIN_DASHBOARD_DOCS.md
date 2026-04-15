# Admin Dashboard Structure Documentation

## 📋 Overview
The Admin Dashboard is a comprehensive management system for your salon business with a modern, responsive UI built with React and Tailwind CSS.

---

## 🏗️ Project Structure

### Directory Tree
```
src/
├── components/dashboard/
│   ├── Alerts/
│   │   └── AlertBanner.jsx          # Alert notifications
│   ├── Charts/
│   │   ├── RevenueChart.jsx         # Revenue line chart
│   │   └── AppointmentsChart.jsx    # Appointments bar chart
│   ├── Empty/
│   │   └── EmptyState.jsx           # Empty state UI
│   ├── Forms/
│   │   └── FilterBar.jsx            # Filtering interface
│   ├── Modals/
│   │   └── ConfirmDialog.jsx        # Confirmation dialog
│   ├── Pagination/
│   │   └── Pagination.jsx           # Pagination controls
│   ├── Stats/
│   │   ├── StatsGrid.jsx            # Stats cards grid
│   │   └── QuickInsights.jsx        # Quick insights panel
│   ├── Tables/
│   │   ├── DataTable.jsx            # Reusable data table
│   │   ├── RecentAppointments.jsx   # Recent appointments list
│   │   ├── TopServices.jsx          # Top services list
│   │   └── TopStaff.jsx             # Top stylist list
│   ├── Sidebar.jsx                  # Navigation sidebar
│   ├── Topbar.jsx                   # Top navigation bar
│   ├── StatCard.jsx                 # Individual stat card
│   └── BookingTable.jsx             # Booking table
├── pages/dashboard/
│   ├── DashboardHome.jsx            # Home dashboard
│   ├── Appointments.jsx             # Appointments management
│   ├── Customers.jsx                # Customer management
│   ├── ManageService.jsx            # Service management
│   ├── Staff.jsx                    # Staff management
│   ├── Revenue.jsx                  # Revenue analytics
│   ├── Reviews.jsx                  # Customer reviews
│   └── Settings.jsx                 # Admin settings
├── hooks/
│   └── useDashboard.js              # Custom dashboard hooks
├── api/
│   └── dashboardApi.js              # Dashboard API calls
├── utils/
│   └── dashboardHelpers.js          # Helper functions
├── data/
│   └── dashboardData.js             # Mock data
└── layouts/
    └── DashboardLayout.jsx          # Main layout wrapper
```

---

## 🎨 Components

### Stats Components
- **StatCard**: Displays KPI metric with icon, trend, and color
- **StatsGrid**: Grid layout for multiple stat cards
- **QuickInsights**: Panel showing quick business insights

### Chart Components
- **RevenueChart**: Line chart showing revenue trends
- **AppointmentsChart**: Bar chart showing appointment statistics

### Table Components
- **DataTable**: Reusable table with sorting, filtering, actions
- **RecentAppointments**: Shows latest bookings
- **TopServices**: Top performing services list
- **TopStaff**: Top performing stylists list

### UI Components
- **AlertBanner**: Alerts for important notifications
- **FilterBar**: Filter appointments, services, staff
- **ConfirmDialog**: Modal for confirmations
- **Pagination**: Page navigation controls
- **EmptyState**: Empty data state UI

---

## 🪝 Custom Hooks

### useFilters
```javascript
const { filters, updateFilter, resetFilters } = useFilters();
```
Manages filter state for tables and lists

### useSorting
```javascript
const { sortKey, sortOrder, sortedItems, toggleSort } = useSorting(items);
```
Handles sorting logic with ascending/descending

### usePagination
```javascript
const { currentPage, totalPages, currentItems, goToPage, nextPage, prevPage } = usePagination(items);
```
Manages pagination state and calculations

### useModal
```javascript
const { isOpen, open, close, toggle } = useModal();
```
Controls modal visibility state

### useLoading
```javascript
const { isLoading, startLoading, stopLoading } = useLoading();
```
Manages loading states for async operations

### useNotification
```javascript
const { notifications, addNotification, removeNotification } = useNotification();
```
Manages toast/notification messages

---

## 🛠️ Helper Functions

### Formatting
- `formatCurrency(amount)` - Format as INR
- `formatDate(dateString)` - Format date readable
- `formatTime(timeString)` - Format time

### Status & Styling
- `getStatusBadgeColor(status)` - Get badge color className
- `getInitials(name)` - Get name initials

### Validation
- `isValidEmail(email)` - Email validation
- `isValidPhone(phone)` - Phone validation (10 digits, 6-9 start)

### Data Manipulation
- `truncateText(text, length)` - Truncate long text
- `calculatePercentageChange(current, previous)` - Calculate % change
- `sortByKey(array, key, order)` - Sort array by key
- `filterByCriteria(array, criteria)` - Filter by multiple criteria

---

## 📊 Features Implemented

### Dashboard Home
- 4 KPI cards with trends
- Revenue overview chart
- Appointments trend chart
- Quick insights panel
- Recent appointments table
- Top services & staff lists
- Alert notifications

### Appointments Page
- Full appointments table
- Filter by status
- Sort by date
- Update appointment status
- Delete appointments
- Confirmation dialogs
- Statistics counter

### Navigation
- Sidebar with 8 menu items
- Top navigation bar
- Active route highlighting
- Responsive design

---

## 🎯 Key Features

✅ **Responsive Design** - Mobile, tablet, desktop optimized  
✅ **Modern UI** - Clean, professional interface  
✅ **Data Visualization** - Charts and graphs  
✅ **Filtering & Sorting** - Advanced data management  
✅ **Modals & Dialogs** - User confirmations  
✅ **Alerts & Notifications** - Important updates  
✅ **Reusable Components** - DRY code structure  
✅ **Custom Hooks** - State management utilities  
✅ **Helper Functions** - Data formatting utilities  

---

## 🔌 API Integration

Replace the mock data in `api/dashboardApi.js` with actual API calls:

```javascript
export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/api/appointments');
  return response.data;
};
```

---

## 🎨 Color Scheme

- **Primary**: Pink/Rose (#ec4899, #db2777)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Blue (#3b82f6)
- **Background**: Light Slate (#f1f5f9)
- **Text**: Dark Slate (#1e293b)

---

## 📱 Usage Examples

### Using StatsGrid
```jsx
import StatsGrid from '@/components/dashboard/Stats/StatsGrid';
<StatsGrid stats={dashboardStats} />
```

### Using DataTable
```jsx
import DataTable from '@/components/dashboard/Tables/DataTable';
<DataTable 
  columns={columns}
  data={appointments}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### Using Hooks
```jsx
const { filters, updateFilter } = useFilters({ status: "" });
const { isOpen, open, close } = useModal();
const { addNotification } = useNotification();
```

---

## 🚀 Next Steps

1. **Connect Backend**: Replace mock API with real endpoints
2. **Add Authentication**: Implement login validation
3. **Dashboard Pages**: Complete remaining dashboard pages
4. **Export Functions**: Add CSV/PDF export features
5. **Analytics**: Add more detailed analytics
6. **Notifications**: Implement real-time notifications
7. **Search**: Add global search functionality

---

## 📝 Notes

- All components use Tailwind CSS for styling
- Responsive design with mobile-first approach
- Uses Recharts for data visualization
- Minimal dependencies for better performance
- Customizable color schemes
- Easy to extend and maintain

---

**Created**: March 2026  
**Version**: 1.0.0
