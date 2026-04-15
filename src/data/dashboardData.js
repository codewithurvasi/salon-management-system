// Dashboard Stats Data
export const dashboardStats = [
  { 
    id: 1,
    title: "Total Bookings", 
    value: "1,248", 
    note: "+12% this month",
    icon: "📅",
    trend: "+12%",
    color: "blue"
  },
  { 
    id: 2,
    title: "Today Appointments", 
    value: "38", 
    note: "8 pending approvals",
    icon: "🕐",
    trend: "+8%",
    color: "pink"
  },
  { 
    id: 3,
    title: "Monthly Revenue", 
    value: "₹2,45,000", 
    note: "+18% growth",
    icon: "💰",
    trend: "+18%",
    color: "green"
  },
  { 
    id: 4,
    title: "Active Customers", 
    value: "864", 
    note: "126 repeat clients",
    icon: "👥",
    trend: "+5%",
    color: "purple"
  },
];

// Recent Appointments
export const appointments = [
  {
    id: 1,
    customerName: "Ananya Sharma",
    service: "Bridal Makeup",
    stylist: "Aisha",
    date: "12 Mar 2026",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    customerName: "Priya Patel",
    service: "Hair Spa",
    stylist: "Riya",
    date: "12 Mar 2026",
    time: "11:30 AM",
    status: "Pending",
  },
  {
    id: 3,
    customerName: "Simran Kaur",
    service: "Facial Treatment",
    stylist: "Neha",
    date: "12 Mar 2026",
    time: "01:00 PM",
    status: "Completed",
  },
  {
    id: 4,
    customerName: "Diya Singh",
    service: "Hair Cut & Style",
    stylist: "Aisha",
    date: "13 Mar 2026",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    id: 5,
    customerName: "Meera Verma",
    service: "Threading",
    stylist: "Riya",
    date: "13 Mar 2026",
    time: "02:00 PM",
    status: "Cancelled",
  },
];

// Revenue Chart Data
export const chartData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 52000 },
  { month: "May", revenue: 61000 },
  { month: "Jun", revenue: 70000 },
];

// Appointments Trend Data
export const appointmentsTrendData = [
  { month: "Jan", completed: 45, pending: 12, cancelled: 3 },
  { month: "Feb", completed: 52, pending: 15, cancelled: 4 },
  { month: "Mar", completed: 48, pending: 18, cancelled: 2 },
  { month: "Apr", completed: 61, pending: 20, cancelled: 5 },
  { month: "May", completed: 58, pending: 14, cancelled: 3 },
  { month: "Jun", completed: 72, pending: 22, cancelled: 4 },
];

// Top Services
export const topServices = [
  { 
    id: 1,
    name: "Bridal Makeup", 
    bookings: 156, 
    revenue: 78000,
    rating: 4.8
  },
  { 
    id: 2,
    name: "Hair Spa", 
    bookings: 142, 
    revenue: 56800,
    rating: 4.6
  },
  { 
    id: 3,
    name: "Facial Treatment", 
    bookings: 128, 
    revenue: 51200,
    rating: 4.7
  },
  { 
    id: 4,
    name: "Hair Cut & Style", 
    bookings: 115, 
    revenue: 46000,
    rating: 4.5
  },
];

// Top Staff Members
export const topStaff = [
  { 
    id: 1,
    name: "Aisha Khan", 
    bookings: 89, 
    rating: 4.9,
    avatar: null
  },
  { 
    id: 2,
    name: "Riya Mehra", 
    bookings: 76, 
    rating: 4.8,
    avatar: null
  },
  { 
    id: 3,
    name: "Neha Singh", 
    bookings: 64, 
    rating: 4.7,
    avatar: null
  },
  { 
    id: 4,
    name: "Priya Chopra", 
    bookings: 52, 
    rating: 4.6,
    avatar: null
  },
];

// Quick Insights
export const quickInsights = [
  { 
    label: "Top Service", 
    value: "Bridal Makeup", 
    bgColor: "bg-rose-50",
    subtext: "156 bookings this month"
  },
  { 
    label: "Top Stylist", 
    value: "Aisha Khan", 
    bgColor: "bg-blue-50",
    subtext: "89 successful appointments"
  },
  { 
    label: "Pending Bookings", 
    value: "22", 
    bgColor: "bg-orange-50",
    subtext: "Needs approval today"
  },
  { 
    label: "Customer Satisfaction", 
    value: "4.7★", 
    bgColor: "bg-green-50",
    subtext: "Average rating"
  },
];

// Dashboard Menu Items
export const dashboardMenu = [
  {
    id: 1,
    label: "Dashboard",
    icon: "📊",
    path: "/dashboard"
  },
  {
    id: 2,
    label: "Appointments",
    icon: "📅",
    path: "/dashboard/appointments"
  },
  {
    id: 3,
    label: "Customers",
    icon: "👥",
    path: "/dashboard/customers"
  },
  {
    id: 4,
    label: "Services",
    icon: "✨",
    path: "/dashboard/manage-service"
  },
  {
    id: 5,
    label: "Staff",
    icon: "👨‍💼",
    path: "/dashboard/staff"
  },
  {
    id: 6,
    label: "Revenue",
    icon: "💰",
    path: "/dashboard/revenue"
  },
  {
    id: 7,
    label: "Reviews",
    icon: "⭐",
    path: "/dashboard/reviews"
  },
  {
    id: 8,
    label: "Settings",
    icon: "⚙️",
    path: "/dashboard/settings"
  },
];