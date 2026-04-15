import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: String,
    city: String,
    totalSpent: {
      type: Number,
      default: 0,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    lastVisit: Date,
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
