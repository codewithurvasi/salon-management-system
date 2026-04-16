import express from "express";
import {
  getDashboardOverview,
  getAllAppointments,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getAllStaff,
  updateStaff,
  deleteStaff,
  getAllServices,
  getTopServices,
  getTopStaff,
  getRevenueAnalytics,
  getAppointmentsTrend,
  createAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  createCustomer,
  createStaff,
  createService,
  
} from "../controllers/dashboardController.js";

const router = express.Router();

// Dashboard Overview
router.get("/overview", getDashboardOverview);

// Appointments
router.get("/appointments", getAllAppointments);
router.post("/appointments", createAppointment);
router.patch("/appointments/:id/status", updateAppointmentStatus);
router.delete("/appointments/:id", cancelAppointment);

// Customers
router.get("/customers", getAllCustomers);
router.post("/customers", createCustomer);
router.put("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);
// Staff
// Staff
router.get("/staff", getAllStaff);
router.post("/staff", createStaff);
router.patch("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);
router.get("/staff/top", getTopStaff);

// Services
router.get("/services", getAllServices);
router.post("/services", createService);
router.get("/services/top", getTopServices);

// Analytics
router.get("/revenue/analytics", getRevenueAnalytics);
router.get("/appointments/trend", getAppointmentsTrend);

export default router;
