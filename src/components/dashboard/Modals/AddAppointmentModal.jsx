import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createAppointment } from "../../../api/dashboardApi";
import { getAllServices, getAllStaff } from "../../../api/dashboardApi";

export default function AddAppointmentModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    service: "",
    stylist: "",
    date: "",
    time: "",
    duration: 60,
    price: "",
    notes: "",
  });

  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchServicesAndStaff();
    }
  }, [isOpen]);

  const fetchServicesAndStaff = async () => {
    try {
      const [servicesResponse, staffResponse] = await Promise.all([
        getAllServices("", 1, 100), // Get all services
        getAllStaff("", 1, 100), // Get all staff
      ]);

      setServices(servicesResponse.data || []);
      setStaff(staffResponse.data || []);
    } catch (err) {
      console.error("Error fetching services and staff:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill price when service is selected
    if (name === "service") {
      const selectedService = services.find(s => s.name === value);
      if (selectedService) {
        setFormData(prev => ({
          ...prev,
          price: selectedService.price
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      const requiredFields = ["customerName", "email", "phone", "service", "stylist", "date", "time", "price"];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Please fill in: ${missingFields.join(", ")}`);
      }

      // Create appointment
      await createAppointment(formData);

      // Reset form
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        service: "",
        stylist: "",
        date: "",
        time: "",
        duration: 60,
        price: "",
        notes: "",
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Add New Appointment</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Customer Information</h3>

              <div>
                <label className="block text-sm font-medium text-slate-700">Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                  placeholder="customer@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Appointment Details</h3>

              <div>
                <label className="block text-sm font-medium text-slate-700">Service *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service.name}>
                      {service.name} - ₹{service.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Stylist *</label>
                <select
                  name="stylist"
                  value={formData.stylist}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                  required
                >
                  <option value="">Select a stylist</option>
                  {staff.map((member) => (
                    <option key={member._id} value={member.name}>
                      {member.name} ({member.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                    min="15"
                    max="480"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
              placeholder="Any special requests or notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-6 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-pink-600 px-6 py-2 font-medium text-white hover:bg-pink-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}