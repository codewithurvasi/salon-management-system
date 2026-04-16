import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, required: true },
    gender: { type: String, default: "" },
    dob: { type: Date, default: null },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    preferredService: { type: String, default: "" },
    preferredStylist: { type: String, default: "" },
    status: { type: String, default: "Active" },
    notes: { type: String, default: "" },
    totalSpent: { type: Number, default: 0 },
    totalBookings: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    lastVisit: { type: Date, default: null },
    history: [
      {
        appointmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Appointment",
        },
        service: String,
        stylist: String,
        date: Date,
        time: String,
        amount: Number,
        status: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);