import { useState } from "react";
import { X } from "lucide-react";
import { createService } from "../../../api/dashboardApi";

export default function AddServiceModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: 60,
    category: "",
    image: "",
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
      const requiredFields = ["name", "price", "category"];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Please fill in: ${missingFields.join(", ")}`);
      }

      // Call the API to create service
      await createService(formData);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        duration: 60,
        category: "",
        image: "",
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Add New Service</h2>
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
              <label className="block text-sm font-medium text-slate-700">Service Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                placeholder="e.g., Hair Cut & Styling"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
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

            <div className="grid gap-4 md:grid-cols-2">
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
                  placeholder="60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                placeholder="Describe the service..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                placeholder="https://example.com/image.jpg"
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
              {loading ? "Creating..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}