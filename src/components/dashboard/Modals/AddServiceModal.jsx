import { useState } from "react";
import { X } from "lucide-react";
import { createService } from "../../../api/dashboardApi";

const initialForm = {
  name: "",
  category: "",
  price: "",
  duration: 60,
  description: "",
  image: "",
  isActive: true,
};

export default function AddServiceModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value
          : value,
    }));
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === "true";
    setFormData((prev) => ({
      ...prev,
      isActive: value,
    }));
  };

  const handleClose = () => {
    if (loading) return;
    setFormData(initialForm);
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const requiredFields = ["name", "category", "price"];
      const missingFields = requiredFields.filter(
        (field) => !formData[field]?.toString().trim()
      );

      if (missingFields.length > 0) {
        throw new Error(`Please fill in: ${missingFields.join(", ")}`);
      }

      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        duration: Number(formData.duration) || 60,
        description: formData.description.trim(),
        image: formData.image.trim(),
        isActive: formData.isActive,
      };

      console.log("Create service payload:", payload);

      await createService(payload);

      setFormData(initialForm);
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to create service"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Add New Service</h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              placeholder="e.g., Hair Cut & Styling"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              required
            >
              <option value="">Select category</option>
              <option value="Hair">Hair</option>
              <option value="Makeup">Makeup</option>
              <option value="Facial">Facial</option>
              <option value="Skin">Skin</option>
              <option value="Nails">Nails</option>
              <option value="Threading">Threading</option>
              <option value="Massage">Massage</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              placeholder="60"
              min="15"
              max="480"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              placeholder="Describe the service..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              value={String(formData.isActive)}
              onChange={handleStatusChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}