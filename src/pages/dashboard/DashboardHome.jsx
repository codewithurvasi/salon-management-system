import { useState, useEffect } from "react";
import StatsGrid from "../../components/dashboard/Stats/StatsGrid";
import RevenueChart from "../../components/dashboard/Charts/RevenueChart";
import AppointmentsChart from "../../components/dashboard/Charts/AppointmentsChart";
import RecentAppointments from "../../components/dashboard/Tables/RecentAppointments";
import TopServices from "../../components/dashboard/Tables/TopServices";
import TopStaff from "../../components/dashboard/Tables/TopStaff";
import QuickInsights from "../../components/dashboard/Stats/QuickInsights";
import AlertBanner from "../../components/dashboard/Alerts/AlertBanner";
import { 
  getDashboardOverview,
  getAllAppointments,
  getRevenueAnalytics,
  getAppointmentsTrend,
  getTopServices,
  getTopStaff,
} from "../../api/dashboardApi";

export default function DashboardHome() {
  const [alerts, setAlerts] = useState([]);
  const [dashboardStats, setDashboardStats] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [appointmentsTrendData, setAppointmentsTrendData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [topStaff, setTopStaff] = useState([]);
  const [quickInsights, setQuickInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [overview, aptResponse, revenueData, trendData, topServicesData, topStaffData] = await Promise.all([
        getDashboardOverview(),
        getAllAppointments("", 1, 5),
        getRevenueAnalytics(),
        getAppointmentsTrend(),
        getTopServices(4),
        getTopStaff(4),
      ]);

      // Transform overview data to stats format
      const stats = [
        {
          id: 1,
          title: "Total Bookings",
          value: overview.totalBookings?.toLocaleString() || "0",
          note: `${overview.pendingAppointments || 0} pending approvals`,
          icon: "📅",
          trend: "+12%",
          color: "blue",
        },
        {
          id: 2,
          title: "Today Appointments",
          value: overview.todayAppointments || "0",
          note: `${overview.pendingAppointments || 0} pending`,
          icon: "🕐",
          trend: "+8%",
          color: "pink",
        },
        {
          id: 3,
          title: "Monthly Revenue",
          value: `₹${(overview.monthlyRevenue || 0).toLocaleString()}`,
          note: "+18% growth",
          icon: "💰",
          trend: "+18%",
          color: "green",
        },
        {
          id: 4,
          title: "Active Customers",
          value: overview.activeCustomers || "0",
          note: "Repeat clients",
          icon: "👥",
          trend: "+5%",
          color: "purple",
        },
      ];

      // Transform quick insights
      const insights = [
        {
          label: "Completion Rate",
          value: `${overview.completionRate || 0}%`,
          bgColor: "bg-green-50",
          subtext: "Appointments completed",
        },
        {
          label: "Average Rating",
          value: `${overview.averageRating || 0}★`,
          bgColor: "bg-blue-50",
          subtext: "Staff performance",
        },
        {
          label: "Pending Bookings",
          value: overview.pendingAppointments || "0",
          bgColor: "bg-orange-50",
          subtext: "Needs approval",
        },
        {
          label: "Total Staff",
          value: overview.totalStaff || "0",
          bgColor: "bg-purple-50",
          subtext: "Active stylists",
        },
      ];

      setDashboardStats(stats);
      setAppointments(aptResponse.data || []);
      setChartData(revenueData || []);
      setAppointmentsTrendData(trendData || []);
      setTopServices(topServicesData || []);
      setTopStaff(topStaffData || []);
      setQuickInsights(insights);

      // Set alerts only if there are pending appointments
      if (overview.pendingAppointments > 0) {
        setAlerts([
          {
            id: 1,
            message: `You have ${overview.pendingAppointments} pending appointment approvals`,
            type: "warning",
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
      setAlerts([
        {
          id: 1,
          message: "Failed to load data. Using mock data.",
          type: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-pink-600"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Alerts */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <AlertBanner
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => closeAlert(alert.id)}
          />
        ))}
        {error && (
          <AlertBanner type="error" message={error} onClose={() => setError(null)} />
        )}
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={dashboardStats} />

      {/* Charts Row */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {chartData.length > 0 && <RevenueChart data={chartData} />}
        </div>
        {quickInsights.length > 0 && <QuickInsights insights={quickInsights} />}
      </div>

      {/* Appointments Trend */}
      {appointmentsTrendData.length > 0 && (
        <AppointmentsChart data={appointmentsTrendData} />
      )}

      {/* Tables Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {topServices.length > 0 && <TopServices services={topServices} />}
        {topStaff.length > 0 && <TopStaff staff={topStaff} />}
      </div>

      {/* Recent Appointments */}
      {appointments.length > 0 && (
        <RecentAppointments appointments={appointments} />
      )}
    </div>
  );
}