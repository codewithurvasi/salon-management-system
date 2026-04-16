import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/dashboard";
// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get Dashboard Overview
export const getDashboardOverview = async () => {
  try {
    const response = await axiosInstance.get("/overview");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    throw error;
  }
};

// Get All Appointments
export const getAllAppointments = async (status = "", page = 1, limit = 10) => {
  try {
    const query = status
      ? `?status=${status}&page=${page}&limit=${limit}`
      : `?page=${page}&limit=${limit}`;
    const response = await axiosInstance.get(`/appointments${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// Get All Customers
export const getAllCustomers = async (status = "", page = 1, limit = 10) => {
  try {
    const params = { page, limit };
    if (status) params.status = status;

    const response = await axiosInstance.get("/customers", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
export const updateCustomer = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/customers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
// Get All Staff
export const getAllStaff = async (status = "", page = 1, limit = 10) => {
  try {
    const query = status
      ? `?status=${status}&page=${page}&limit=${limit}`
      : `?page=${page}&limit=${limit}`;
    const response = await axiosInstance.get(`/staff${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};

// Get Top Staff
export const getTopStaff = async (limit = 4) => {
  try {
    const response = await axiosInstance.get(`/staff/top?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching top staff:", error);
    throw error;
  }
};

// Get All Services
export const getAllServices = async (category = "", page = 1, limit = 10) => {
  try {
    const query = category
      ? `?category=${category}&page=${page}&limit=${limit}`
      : `?page=${page}&limit=${limit}`;
    const response = await axiosInstance.get(`/services${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Get Top Services
export const getTopServices = async (limit = 4) => {
  try {
    const response = await axiosInstance.get(`/services/top?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching top services:", error);
    throw error;
  }
};


// Get Revenue Analytics
export const getRevenueAnalytics = async () => {
  try {
    const response = await axiosInstance.get("/revenue/analytics");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    throw error;
  }
};

// Get Appointments Trend
export const getAppointmentsTrend = async () => {
  try {
    const response = await axiosInstance.get("/appointments/trend");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching appointments trend:", error);
    throw error;
  }
};

// Create Appointment
export const createAppointment = async (appointmentData) => {
  try {
    console.log("Sending appointment data:", appointmentData);

    const response = await axiosInstance.post("/appointments", appointmentData);

    console.log("Create appointment response:", response.data);

    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    console.error("Backend error response:", error.response?.data);
    console.error("Backend error status:", error.response?.status);

    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create appointment",
    );
  }
};

// Update Appointment Status
export const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await axiosInstance.patch(`/appointments/${id}/status`, {
      status,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

// Cancel Appointment
export const cancelAppointment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/appointments/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};

// Create Customer
export const createCustomer = async (customerData) => {
  try {
    const response = await axiosInstance.post("/customers", customerData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Create Staff Member
export const createStaff = async (staffData) => {
  try {
    const response = await axiosInstance.post("/staff", staffData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating staff:", error);
    throw error;
  }
};
// Update Staff Member
export const updateStaff = async (id, staffData) => {
  try {
    const response = await axiosInstance.patch(`/staff/${id}`, staffData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating staff:", error);
    throw error;
  }
};

// Delete Staff Member
export const deleteStaff = async (id) => {
  try {
    const response = await axiosInstance.delete(`/staff/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw error;
  }
};

// Create Service
export const createService = async (serviceData) => {
  try {
    const response = await axiosInstance.post("/services", serviceData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};
