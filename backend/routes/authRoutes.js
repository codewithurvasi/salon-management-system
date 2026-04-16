import express from "express";
import {
  registerAdmin,
  loginAdmin,
} from "../controllers/authController.js";

const router = express.Router();

// Admin routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

// Customer routes
// router.post("/customer/register", registerCustomer);
// router.post("/customer/login", loginCustomer);

export default router;