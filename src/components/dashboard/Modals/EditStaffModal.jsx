import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  experience: "",
  joinDate: "",
  biography: "",
  status: "Active",
};

export default function EditStaffModal({
  isOpen,
  onClose,
  staff,
  onSave,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        specialization: staff.specialization || "",
        experience: staff.experience || "",
        joinDate: staff.joinDate ? String(staff.joinDate).slice(0, 10) : "",
        biography: staff.biography || "",
        status: staff.status || "Active",
      });
    } else {
      setFormData(initialForm);
    }
  }, [staff, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    if (loading) return;
    setFormData(initialForm);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Phone is required");
      return;
    }

    if (!formData.specialization.trim()) {
      alert("Specialization is required");
      return;
    }

    try {
      setLoading(true);

      await onSave({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        specialization: formData.specialization.trim(),
        experience: formData.experience,
        joinDate: formData.joinDate,
        biography: formData.biography.trim(),
        status: formData.status,
      });

      setFormData(initialForm);
    } catch (error) {
      console.error("Edit staff save error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Edit Staff Member</h2>
            <p className="mt-1 text-sm text-slate-500">Update staff details</p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter full name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email *
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone *
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Specialization *
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
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

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Experience
            </label>
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              type="number"
              placeholder="Enter years of experience"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Join Date
            </label>
            <input
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              type="date"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Leave">On Leave</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Biography
            </label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              rows="4"
              placeholder="Write short biography"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-pink-600 px-5 py-3 font-medium text-white transition hover:bg-pink-700 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}