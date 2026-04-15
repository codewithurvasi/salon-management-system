import mongoose from "mongoose";
import dotenv from "dotenv";
import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";
import Service from "../models/Service.js";
import StaffMember from "../models/StaffMember.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await Appointment.deleteMany({});
    await Customer.deleteMany({});
    await Service.deleteMany({});
    await StaffMember.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create Services
    const services = await Service.insertMany([
      {
        name: "Bridal Makeup",
        description: "Complete bridal makeup package",
        price: 5000,
        duration: 120,
        category: "Makeup",
        totalBookings: 156,
        revenue: 780000,
        rating: 4.8,
      },
      {
        name: "Hair Spa",
        description: "Relaxing hair spa treatment",
        price: 3500,
        duration: 90,
        category: "Hair",
        totalBookings: 142,
        revenue: 497000,
        rating: 4.6,
      },
      {
        name: "Facial Treatment",
        description: "Complete facial with organic products",
        price: 2500,
        duration: 60,
        category: "Facial",
        totalBookings: 128,
        revenue: 320000,
        rating: 4.7,
      },
      {
        name: "Hair Cut & Style",
        description: "Professional haircut and styling",
        price: 2000,
        duration: 45,
        category: "Hair",
        totalBookings: 115,
        revenue: 230000,
        rating: 4.5,
      },
      {
        name: "Threading",
        description: "Eyebrow and face threading",
        price: 500,
        duration: 30,
        category: "Threading",
        totalBookings: 200,
        revenue: 100000,
        rating: 4.4,
      },
      {
        name: "Nail Art",
        description: "Creative nail art designs",
        price: 1500,
        duration: 60,
        category: "Nails",
        totalBookings: 98,
        revenue: 147000,
        rating: 4.6,
      },
    ]);
    console.log("✅ Services created:", services.length);

    // Create Staff Members
    const staff = await StaffMember.insertMany([
      {
        name: "Aisha Khan",
        email: "aisha@salon.com",
        phone: "9876543220",
        specialization: "Bridal Makeup",
        experience: "5 years",
        totalBookings: 89,
        completedBookings: 85,
        rating: 4.9,
        totalEarnings: 445000,
        status: "Active",
        biography: "Expert in bridal and party makeup",
      },
      {
        name: "Riya Mehra",
        email: "riya@salon.com",
        phone: "9876543221",
        specialization: "Hair Styling",
        experience: "4 years",
        totalBookings: 76,
        completedBookings: 72,
        rating: 4.8,
        totalEarnings: 380000,
        status: "Active",
        biography: "Professional hair stylist",
      },
      {
        name: "Neha Singh",
        email: "neha@salon.com",
        phone: "9876543222",
        specialization: "Facial & Skincare",
        experience: "3 years",
        totalBookings: 64,
        completedBookings: 61,
        rating: 4.7,
        totalEarnings: 320000,
        status: "Active",
        biography: "Skincare specialist",
      },
      {
        name: "Priya Chopra",
        email: "priya@salon.com",
        phone: "9876543223",
        specialization: "Threading & Waxing",
        experience: "6 years",
        totalBookings: 52,
        completedBookings: 50,
        rating: 4.6,
        totalEarnings: 260000,
        status: "Active",
        biography: "Expert in threading and waxing",
      },
      {
        name: "Meera Verma",
        email: "meera@salon.com",
        phone: "9876543224",
        specialization: "Nail Art",
        experience: "2 years",
        totalBookings: 41,
        completedBookings: 40,
        rating: 4.5,
        totalEarnings: 205000,
        status: "Active",
        biography: "Creative nail artist",
      },
    ]);
    console.log("✅ Staff created:", staff.length);

    // Create Customers
    const customers = await Customer.insertMany([
      {
        name: "Ananya Sharma",
        email: "ananya@example.com",
        phone: "9876543210",
        address: "123 Main St",
        city: "Delhi",
        totalSpent: 15000,
        totalBookings: 8,
        lastVisit: new Date(),
        status: "Active",
      },
      {
        name: "Priya Patel",
        email: "priya@example.com",
        phone: "9876543211",
        address: "456 Oak Ave",
        city: "Mumbai",
        totalSpent: 12500,
        totalBookings: 6,
        lastVisit: new Date(Date.now() - 86400000),
        status: "Active",
      },
      {
        name: "Simran Kaur",
        email: "simran@example.com",
        phone: "9876543212",
        address: "789 Pine Rd",
        city: "Bangalore",
        totalSpent: 18000,
        totalBookings: 12,
        lastVisit: new Date(Date.now() - 172800000),
        status: "Active",
      },
      {
        name: "Kritika Jain",
        email: "kritika@example.com",
        phone: "9876543213",
        address: "321 Elm St",
        city: "Pune",
        totalSpent: 8500,
        totalBookings: 4,
        lastVisit: new Date(Date.now() - 1209600000),
        status: "Inactive",
      },
      {
        name: "Diya Singh",
        email: "diya@example.com",
        phone: "9876543214",
        address: "654 Maple Dr",
        city: "Chang aigarh",
        totalSpent: 22000,
        totalBookings: 15,
        lastVisit: new Date(),
        status: "Active",
      },
    ]);
    console.log("✅ Customers created:", customers.length);

    // Create Appointments
    const appointments = await Appointment.insertMany([
      {
        customerName: "Ananya Sharma",
        email: "ananya@example.com",
        phone: "9876543210",
        service: "Bridal Makeup",
        stylist: "Aisha Khan",
        date: new Date(),
        time: "10:00 AM",
        duration: 120,
        price: 5000,
        status: "Confirmed",
      },
      {
        customerName: "Priya Patel",
        email: "priya@example.com",
        phone: "9876543211",
        service: "Hair Spa",
        stylist: "Riya Mehra",
        date: new Date(),
        time: "11:30 AM",
        duration: 90,
        price: 3500,
        status: "Pending",
      },
      {
        customerName: "Simran Kaur",
        email: "simran@example.com",
        phone: "9876543212",
        service: "Facial Treatment",
        stylist: "Neha Singh",
        date: new Date(),
        time: "01:00 PM",
        duration: 60,
        price: 2500,
        status: "Completed",
      },
      {
        customerName: "Diya Singh",
        email: "diya@example.com",
        phone: "9876543214",
        service: "Hair Cut & Style",
        stylist: "Aisha Khan",
        date: new Date(Date.now() + 86400000),
        time: "09:00 AM",
        duration: 45,
        price: 2000,
        status: "Confirmed",
      },
      {
        customerName: "Kritika Jain",
        email: "kritika@example.com",
        phone: "9876543213",
        service: "Threading",
        stylist: "Priya Chopra",
        date: new Date(Date.now() + 86400000),
        time: "02:00 PM",
        duration: 30,
        price: 500,
        status: "Cancelled",
      },
      {
        customerName: "Ananya Sharma",
        email: "ananya@example.com",
        phone: "9876543210",
        service: "Hair Spa",
        stylist: "Riya Mehra",
        date: new Date(Date.now() + 172800000),
        time: "10:30 AM",
        duration: 90,
        price: 3500,
        status: "Pending",
      },
    ]);
    console.log("✅ Appointments created:", appointments.length);

    console.log("✅ Database seeded successfully!");
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
