import { useState } from "react";
import { X } from "lucide-react";
import { createStaff } from "../../../api/dashboardApi";

export default function AddStaffModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    joinDate: "",
    biography: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      const requiredFields = ["name", "email", "phone", "specialization"];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Please fill in: ${missingFields.join(", ")}`);
      }

      // Call the API to create staff member
      await createStaff(formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        joinDate: "",
        biography: "",
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create staff member");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Add New Staff Member</h2>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                placeholder="Enter staff name"
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
                placeholder="staff@example.com"
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

            <div>
              <label className="block text-sm font-medium text-slate-700">Specialization *</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                required
              >
                <option value="">Select specialization</option>
                <option value="Hair Stylist">Hair Stylist</option>
                <option value="Makeup Artist">Makeup Artist</option>
                <option value="Facial Specialist">Facial Specialist</option>
                <option value="Nail Technician">Nail Technician</option>
                <option value="Threading Expert">Threading Expert</option>
                <option value="Massage Therapist">Massage Therapist</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                  placeholder="e.g., 3 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Join Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Biography</label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                placeholder="Brief biography and skills..."
              />
            </div>
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
              {loading ? "Creating..." : "Add Staff Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}