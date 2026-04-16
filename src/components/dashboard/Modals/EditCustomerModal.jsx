import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateCustomer } from "../../../api/dashboardApi";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  address: "",
  city: "",
  preferredService: "",
  preferredStylist: "",
  status: "Active",
  notes: "",
};

export default function EditCustomerModal({
  isOpen,
  onClose,
  customer,
  onSuccess,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        gender: customer.gender || "",
        dob: customer.dob ? String(customer.dob).split("T")[0] : "",
        address: customer.address || "",
        city: customer.city || "",
        preferredService: customer.preferredService || "",
        preferredStylist: customer.preferredStylist || "",
        status: customer.status || "Active",
        notes: customer.notes || "",
      });
      setError("");
      setLoading(false);
    }

    if (!isOpen) {
      setFormData(initialFormData);
      setError("");
      setLoading(false);
    }
  }, [isOpen, customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Full Name is required";
    }

    if (!formData.phone.trim()) {
      return "Phone is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address";
    }

    if (formData.phone && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      return "Please enter a valid phone number";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer?._id && !customer?.id) {
      setError("Customer ID is missing");
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        dob: formData.dob || null,
        address: formData.address.trim(),
        city: formData.city.trim(),
        preferredService: formData.preferredService.trim(),
        preferredStylist: formData.preferredStylist.trim(),
        status: formData.status || "Active",
        notes: formData.notes.trim(),
      };

      await updateCustomer(customer._id || customer.id, payload);

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update customer"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setFormData(initialFormData);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Edit Customer</h2>
            <p className="mt-1 text-sm text-slate-500">
              Update customer details and salon records
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="customer@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Preferred Service
              </label>
              <input
                type="text"
                name="preferredService"
                value={formData.preferredService}
                onChange={handleInputChange}
                placeholder="Hair Spa, Facial, Hair Cut..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Preferred Stylist
              </label>
              <input
                type="text"
                name="preferredStylist"
                value={formData.preferredStylist}
                onChange={handleInputChange}
                placeholder="Enter stylist name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any additional notes..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}