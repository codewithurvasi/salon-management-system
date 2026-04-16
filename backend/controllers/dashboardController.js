import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";
import Service from "../models/Service.js";
import StaffMember from "../models/StaffMember.js";
import DashboardMetric from "../models/DashboardMetric.js";

// Helper: safely parse date
const parseAppointmentDate = (dateValue) => {
  if (!dateValue) return null;
  const parsed = new Date(dateValue);
  return isNaN(parsed.getTime()) ? null : parsed;
};

// Helper: get normalized email
const normalizeEmail = (email) => {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
};

// Helper: get normalized phone
const normalizePhone = (phone) => {
  if (!phone || typeof phone !== "string") return "";
  return phone.trim();
};

// Helper: find customer from appointment
const findCustomerFromAppointment = async (appointment) => {
  const email = normalizeEmail(appointment?.email);
  const phone = normalizePhone(appointment?.phone);

  if (!email && !phone) return null;

  const orQuery = [];
  if (email) orQuery.push({ email });
  if (phone) orQuery.push({ phone });

  if (!orQuery.length) return null;

  return Customer.findOne({ $or: orQuery });
};

// Helper: create or update customer when appointment becomes confirmed/completed
const applyAppointmentToCustomer = async (appointment) => {
  if (!appointment) return null;

  const email = normalizeEmail(appointment.email);
  const phone = normalizePhone(appointment.phone);
  const appointmentDate = parseAppointmentDate(appointment.date) || new Date();
  const appointmentPrice = Number(appointment.price) || 0;

  if (!email && !phone) return null;

  let customer = await findCustomerFromAppointment(appointment);

  if (!customer) {
    customer = new Customer({
      name: appointment.customerName || "Unknown Customer",
      email: email || "",
      phone: phone || "",
      address: appointment.address || "",
      city: appointment.city || "",
      notes: appointment.notes || "",
      preferredService: appointment.service || "",
      preferredStylist: appointment.stylist || "",
      status: "Active",
      totalSpent: appointmentPrice,
      totalBookings: 1,
      bookings: 1,
      lastVisit: appointmentDate,
      history: [
        {
          appointmentId: appointment._id,
          service: appointment.service || "",
          stylist: appointment.stylist || "",
          date: appointmentDate,
          time: appointment.time || "",
          amount: appointmentPrice,
          status: appointment.status || "Confirmed",
        },
      ],
    });

    await customer.save();
    return customer;
  }

  // Prevent duplicate increment for same appointment
  const alreadyExistsInHistory = Array.isArray(customer.history)
    ? customer.history.some(
        (item) =>
          String(item?.appointmentId || "") === String(appointment._id || "")
      )
    : false;

  customer.name = appointment.customerName || customer.name;
  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  customer.address = appointment.address || customer.address || "";
  customer.city = appointment.city || customer.city || "";
  customer.notes = appointment.notes || customer.notes || "";
  customer.preferredService = appointment.service || customer.preferredService || "";
  customer.preferredStylist = appointment.stylist || customer.preferredStylist || "";
  customer.status = "Active";
  customer.lastVisit = appointmentDate;

  if (!alreadyExistsInHistory) {
    customer.totalBookings = (Number(customer.totalBookings) || 0) + 1;
    customer.bookings = (Number(customer.bookings) || 0) + 1;
    customer.totalSpent = (Number(customer.totalSpent) || 0) + appointmentPrice;

    if (!Array.isArray(customer.history)) {
      customer.history = [];
    }

    customer.history.push({
      appointmentId: appointment._id,
      service: appointment.service || "",
      stylist: appointment.stylist || "",
      date: appointmentDate,
      time: appointment.time || "",
      amount: appointmentPrice,
      status: appointment.status || "Confirmed",
    });
  }

  await customer.save();
  return customer;
};

// Get Dashboard Overview
export const getDashboardOverview = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const totalBookings = await Appointment.countDocuments();

    const todayAppointments = await Appointment.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const activeCustomers = await Customer.countDocuments({ status: "Active" });
    const totalStaff = await StaffMember.countDocuments({ status: "Active" });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyRevenue = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: { $in: ["Completed", "Confirmed"] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const revenue = monthlyRevenue[0]?.total || 0;

    const pendingAppointments = await Appointment.countDocuments({
      status: "Pending",
    });

    const completedBookings = await Appointment.countDocuments({
      status: "Completed",
    });

    const completionRate =
      totalBookings > 0
        ? ((completedBookings / totalBookings) * 100).toFixed(1)
        : 0;

    const staffRatings = await StaffMember.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
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
        averageRating: Number(averageRating).toFixed(1),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;

    const numericPage = Number(page) || 1;
    const numericLimit = Number(limit) || 10;
    const skip = (numericPage - 1) * numericLimit;

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(numericLimit),
      Appointment.countDocuments(query),
    ]);

    res.status(200).json({
      status: "success",
      data: appointments,
      pagination: {
        currentPage: numericPage,
        totalPages: Math.ceil(total / numericLimit) || 1,
        total,
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

    const numericPage = Number(page) || 1;
    const numericLimit = Number(limit) || 10;

    const customers = await Customer.find(query)
      .sort({ lastVisit: -1, createdAt: -1 })
      .limit(numericLimit)
      .skip((numericPage - 1) * numericLimit);

    const total = await Customer.countDocuments(query);

    res.json({
      status: "success",
      data: customers,
      pagination: {
        currentPage: numericPage,
        totalPages: Math.ceil(total / numericLimit) || 1,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get All Staff
export const getAllStaff = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};

    const numericPage = Number(page) || 1;
    const numericLimit = Number(limit) || 10;

    const staff = await StaffMember.find(query)
      .sort({ rating: -1 })
      .limit(numericLimit)
      .skip((numericPage - 1) * numericLimit);

    const total = await StaffMember.countDocuments(query);

    res.json({
      status: "success",
      data: staff,
      pagination: {
        currentPage: numericPage,
        totalPages: Math.ceil(total / numericLimit) || 1,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get All Services
export const getAllServices = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : { isActive: true };

    const numericPage = Number(page) || 1;
    const numericLimit = Number(limit) || 10;

    const services = await Service.find(query)
      .sort({ totalBookings: -1 })
      .limit(numericLimit)
      .skip((numericPage - 1) * numericLimit);

    const total = await Service.countDocuments(query);

    res.json({
      status: "success",
      data: services,
      pagination: {
        currentPage: numericPage,
        totalPages: Math.ceil(total / numericLimit) || 1,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get Top Services
export const getTopServices = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 4;

    const topServices = await Service.find({ isActive: true })
      .sort({ totalBookings: -1 })
      .limit(limit);

    res.json({
      status: "success",
      data: topServices,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get Top Staff
export const getTopStaff = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 4;

    const topStaff = await StaffMember.find({ status: "Active" })
      .sort({ rating: -1, totalBookings: -1 })
      .limit(limit);

    res.json({
      status: "success",
      data: topStaff,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
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
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

      const revenue = await Appointment.aggregate([
        {
          $match: {
            createdAt: { $gte: monthStart, $lte: monthEnd },
            status: { $in: ["Completed", "Confirmed"] },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$price" },
          },
        },
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
    res.status(500).json({
      status: "error",
      message: error.message,
    });
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
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

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
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      service,
      stylist,
      date,
      time,
      duration,
      price,
      notes,
      status,
      address,
      city,
    } = req.body;

    if (!customerName || !email || !phone || !service || !date || !time) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required appointment fields",
      });
    }

    const appointment = new Appointment({
      customerName,
      email: normalizeEmail(email),
      phone: normalizePhone(phone),
      service,
      stylist: stylist || "",
      date,
      time,
      duration: Number(duration) || 60,
      price: Number(price) || 0,
      notes: notes || "",
      address: address || "",
      city: city || "",
      status: status || "Pending",
    });

    await appointment.save();

    // Agar direct confirmed/completed create ho rahi ho
    if (appointment.status === "Confirmed" || appointment.status === "Completed") {
      await applyAppointmentToCustomer(appointment);
    }

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to create appointment",
    });
  }
};

// Update Appointment Status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("Update appointment status request:", { id, status });

    if (!status) {
      return res.status(400).json({
        status: "error",
        message: "Status is required",
      });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        status: "error",
        message: "Appointment not found",
      });
    }

    const previousStatus = appointment.status;
    appointment.status = status;
    await appointment.save();

    // Customer me add/update only when changing into Confirmed or Completed
    if (
      (status === "Confirmed" || status === "Completed") &&
      previousStatus !== "Confirmed" &&
      previousStatus !== "Completed"
    ) {
      await applyAppointmentToCustomer(appointment);
    }

    res.status(200).json({
      status: "success",
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Update appointment status error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to update appointment status",
    });
  }
};

// Delete Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({
        status: "error",
        message: "Appointment not found",
      });
    }

    res.json({
      status: "success",
      message: "Appointment deleted successfully",
      data: deletedAppointment,
    });
  } catch (error) {
    console.error("Delete appointment error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create Customer
export const createCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      dob,
      address,
      city,
      preferredService,
      preferredStylist,
      status,
      notes,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        status: "error",
        message: "Name and phone are required",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = normalizePhone(phone);

    const duplicateQuery = [];
    if (normalizedEmail) duplicateQuery.push({ email: normalizedEmail });
    if (normalizedPhone) duplicateQuery.push({ phone: normalizedPhone });

    if (duplicateQuery.length) {
      const existingCustomer = await Customer.findOne({ $or: duplicateQuery });
      if (existingCustomer) {
        return res.status(400).json({
          status: "error",
          message: "Customer with this email or phone already exists",
        });
      }
    }

    const customer = new Customer({
      name,
      email: normalizedEmail || "",
      phone: normalizedPhone,
      gender: gender || "",
      dob: dob || null,
      address: address || "",
      city: city || "",
      preferredService: preferredService || "",
      preferredStylist: preferredStylist || "",
      notes: notes || "",
      status: status || "Active",
      totalSpent: 0,
      totalBookings: 0,
      bookings: 0,
      lastVisit: null,
    });

    await customer.save();

    res.status(201).json({
      status: "success",
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      gender,
      dob,
      address,
      city,
      preferredService,
      preferredStylist,
      notes,
      status,
    } = req.body;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = normalizePhone(phone);

    const duplicateQuery = [];
    if (normalizedEmail) duplicateQuery.push({ email: normalizedEmail });
    if (normalizedPhone) duplicateQuery.push({ phone: normalizedPhone });

    if (duplicateQuery.length) {
      const existingCustomer = await Customer.findOne({
        _id: { $ne: id },
        $or: duplicateQuery,
      });

      if (existingCustomer) {
        return res.status(400).json({
          status: "error",
          message: "Another customer with this email or phone already exists",
        });
      }
    }

    customer.name = name ?? customer.name;
    customer.email = normalizedEmail || "";
    customer.phone = normalizedPhone || customer.phone;
    customer.gender = gender ?? customer.gender;
    customer.dob = dob || null;
    customer.address = address ?? customer.address;
    customer.city = city ?? customer.city;
    customer.preferredService = preferredService ?? customer.preferredService;
    customer.preferredStylist = preferredStylist ?? customer.preferredStylist;
    customer.notes = notes ?? customer.notes;
    customer.status = status ?? customer.status;

    await customer.save();

    res.status(200).json({
      status: "success",
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Update customer error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to update customer",
    });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Customer deleted successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to delete customer",
    });
  }
};

// Create Staff Member
export const createStaff = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience, joinDate, biography } = req.body;

    const existingStaff = await StaffMember.findOne({ email: normalizeEmail(email) });
    if (existingStaff) {
      return res.status(400).json({
        status: "error",
        message: "Staff member with this email already exists",
      });
    }

    const staff = new StaffMember({
      name,
      email: normalizeEmail(email),
      phone: normalizePhone(phone),
      specialization,
      experience,
      joinDate: joinDate ? new Date(joinDate) : new Date(),
      biography,
      status: "Active",
    });

    await staff.save();

    res.status(201).json({
      status: "success",
      message: "Staff member created successfully",
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update Staff Member
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, specialization, experience, biography, status } =
      req.body;

    const staff = await StaffMember.findByIdAndUpdate(
      id,
      {
        name,
        email: normalizeEmail(email),
        phone: normalizePhone(phone),
        specialization,
        experience,
        biography,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).json({
        status: "error",
        message: "Staff member not found",
      });
    }

    res.json({
      status: "success",
      message: "Staff updated successfully",
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete Staff Member
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await StaffMember.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({
        status: "error",
        message: "Staff member not found",
      });
    }

    res.json({
      status: "success",
      message: "Staff deleted successfully",
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create Service
export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, category, image } = req.body;

    const existingService = await Service.findOne({ name });
    if (existingService) {
      return res.status(400).json({
        status: "error",
        message: "Service with this name already exists",
      });
    }

    const service = new Service({
      name,
      description,
      price: parseFloat(price) || 0,
      duration: parseInt(duration, 10) || 60,
      category,
      image,
      status: "Active",
    });

    await service.save();

    res.status(201).json({
      status: "success",
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};