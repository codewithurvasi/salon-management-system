import asyncHandler from "express-async-handler";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new admin
// @route   POST /api/auth/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (!admin) {
    res.status(400);
    throw new Error("Invalid admin data");
  }

  res.status(201).json({
    success: true,
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id, admin.role),
  });
});

// @desc    Auth admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    success: true,
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id, admin.role),
  });
});

export { registerAdmin, loginAdmin };