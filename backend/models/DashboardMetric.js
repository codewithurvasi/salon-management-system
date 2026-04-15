import mongoose from "mongoose";

const dashboardMetricSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    completedBookings: {
      type: Number,
      default: 0,
    },
    pendingBookings: {
      type: Number,
      default: 0,
    },
    cancelledBookings: {
      type: Number,
      default: 0,
    },
    todayAppointments: {
      type: Number,
      default: 0,
    },
    monthlyRevenue: {
      type: Number,
      default: 0,
    },
    dailyRevenue: {
      type: Number,
      default: 0,
    },
    activeCustomers: {
      type: Number,
      default: 0,
    },
    repeatCustomers: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    completionRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DashboardMetric", dashboardMetricSchema);
