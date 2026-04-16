import axios from "axios";

const registerAdmin = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/admin/register", {
      name: "Admin User",
      email: "admin@salon.com",
      password: "admin123",
    });
    console.log("Admin registered:", response.data);
  } catch (error) {
    console.error("Error registering admin:", error.response?.data || error.message);
  }
};

registerAdmin();