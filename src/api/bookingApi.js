import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/dashboard";

export const createAppointment = async (appointmentData) => {
  const response = await axios.post(
    `${API_BASE_URL}/appointments`,
    appointmentData
  );
  return response.data;
};