import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 60,
    },
    category: {
      type: String,
      enum: ["Hair", "Makeup", "Facial", "Skin", "Nails", "Threading", "Massage"],
      required: true,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
