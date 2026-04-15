import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";
import Service from "../models/Service.js";
import StaffMember from "../models/StaffMember.js";
import DashboardMetric from "../models/DashboardMetric.js";

// Get Dashboard Overview
export const getDashboardOverview = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get metrics
    const totalBookings = await Appointment.countDocuments();
    const todayAppointments = await Appointment.countDocuments({
      date: { $gte: today, $lt: tomorrow },
    });
    const activeCustomers = await Customer.countDocuments({ status: "Active" });
    const totalStaff = await StaffMember.countDocuments({ status: "Active" });

    // Get revenue (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyRevenue = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: { $in: ["Completed", "Confirmed"] },
        },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const revenue = monthlyRevenue[0]?.total || 0;

    // Get pending appointments
    const pendingAppointments = await Appointment.countDocuments({
      status: "Pending",
    });

    // Get completion rate
    const completedBookings = await Appointment.countDocuments({
      status: "Completed",
    });
    const completionRate =
      totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(1) : 0;

    // Get average rating
    const staffRatings = await StaffMember.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const averageRating = staffRatings[0]?.avgRating || 0;

    res.json({
      status: "success",
      data: {
        totalBookings,
        todayAppointments,
        monthlyRevenue: revenue,
        activeCustomers,
        pendingAppointments,
        totalStaff,
        completionRate,
        averageRating: averageRating.toFixed(1),
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    console.log("Appointments API hit");
    console.log("Query params:", req.query);

    const query = {};
    if (status) {
      query.status = status;
    }

    console.log("Mongo query:", query);

    const appointments = await Appointment.find(query);
    console.log("Appointments found:", appointments);

    res.status(200).json({
      status: "success",
      data: appointments,
      pagination: {
        currentPage: Number(page),
        totalPages: 1,
        total: appointments.length,
      },
    });
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get All Customers
export const getAllCustomers = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};

    const customers = await Customer.find(query)
      .sort({ lastVisit: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Customer.countDocuments(query);

    res.json({
      status: "success",
      data: customers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get All Staff
export const getAllStaff = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};

    const staff = await StaffMember.find(query)
      .sort({ rating: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await StaffMember.countDocuments(query);

    res.json({
      status: "success",
      data: staff,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get All Services
export const getAllServices = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : { isActive: true };

    const services = await Service.find(query)
      .sort({ totalBookings: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(query);

    res.json({
      status: "success",
      data: services,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get Top Services
export const getTopServices = async (req, res) => {
  try {
    const limit = req.query.limit || 4;

    const topServices = await Service.find({ isActive: true })
      .sort({ totalBookings: -1 })
      .limit(limit);

    res.json({
      status: "success",
      data: topServices,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get Top Staff
export const getTopStaff = async (req, res) => {
  try {
    const limit = req.query.limit || 4;

    const topStaff = await StaffMember.find({ status: "Active" })
      .sort({ rating: -1, totalBookings: -1 })
      .limit(limit);

    res.json({
      status: "success",
      data: topStaff,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get Revenue Analytics (Monthly)
export const getRevenueAnalytics = async (req, res) => {
  try {
    const months = 6;
    const data = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const revenue = await Appointment.aggregate([
        {
          $match: {
            createdAt: { $gte: monthStart, $lte: monthEnd },
            status: { $in: ["Completed", "Confirmed"] },
          },
        },
        { $group: { _id: null, total: { $sum: "$price" } } },
      ]);

      const monthName = monthStart.toLocaleString("default", { month: "short" });
      data.push({
        month: monthName,
        revenue: revenue[0]?.total || 0,
      });
    }

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get Appointments Trend
export const getAppointmentsTrend = async (req, res) => {
  try {
    const months = 6;
    const data = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const completed = await Appointment.countDocuments({
        createdAt: { $gte: monthStart, $lte: monthEnd },
        status: "Completed",
      });
      const pending = await Appointment.countDocuments({
        createdAt: { $gte: monthStart, $lte: monthEnd },
        status: "Pending",
      });
      const cancelled = await Appointment.countDocuments({
        createdAt: { $gte: monthStart, $lte: monthEnd },
        status: "Cancelled",
      });

      const monthName = monthStart.toLocaleString("default", { month: "short" });
      data.push({
        month: monthName,
        completed,
        pending,
        cancelled,
      });
    }

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Update customer booking count
    await Customer.findOneAndUpdate(
      { email: req.body.email },
      { $inc: { totalBookings: 1 } }
    );

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update Appointment Status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ status: "error", message: "Appointment not found" });
    }

    res.json({
      status: "success",
      message: "Appointment updated",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ status: "error", message: "Appointment not found" });
    }

    res.json({
      status: "success",
      message: "Appointment cancelled",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Create Customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city, notes } = req.body;

    // Check if customer with this email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        status: "error",
        message: "Customer with this email already exists"
      });
    }

    const customer = new Customer({
      name,
      email,
      phone,
      address,
      city,
      notes,
      status: "Active"
    });

    await customer.save();

    res.status(201).json({
      status: "success",
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Create Staff Member
export const createStaff = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience, joinDate, biography } = req.body;

    // Check if staff with this email already exists
    const existingStaff = await StaffMember.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({
        status: "error",
        message: "Staff member with this email already exists"
      });
    }

    const staff = new StaffMember({
      name,
      email,
      phone,
      specialization,
      experience,
      joinDate: joinDate ? new Date(joinDate) : new Date(),
      biography,
      status: "Active"
    });

    await staff.save();

    res.status(201).json({
      status: "success",
      message: "Staff member created successfully",
      data: staff,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Create Service
export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, category, image } = req.body;

    // Check if service with this name already exists
    const existingService = await Service.findOne({ name });
    if (existingService) {
      return res.status(400).json({
        status: "error",
        message: "Service with this name already exists"
      });
    }

    const service = new Service({
      name,
      description,
      price: parseFloat(price),
      duration: parseInt(duration) || 60,
      category,
      image,
      status: "Active"
    });

    await service.save();

    res.status(201).json({
      status: "success",
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
