import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Sparkles,
  PhoneCall,
  Scissors,
  ShieldCheck,
  Star,
  Mail,
  User,
  BadgeIndianRupee,
} from "lucide-react";
import SectionTitle from "../../components/common/SectionTitle";
import { createAppointment } from "../../api/dashboardApi";

const initialForm = {
  customerName: "",
  email: "",
  phone: "",
  service: "",
  stylist: "",
  date: "",
  time: "",
  duration: "60",
  price: "",
  notes: "",
  status: "Pending",
};

export default function Booking() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) return "Customer name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.phone.trim()) return "Phone is required";
    if (!formData.service.trim()) return "Service is required";
    if (!formData.stylist.trim()) return "Stylist is required";
    if (!formData.date) return "Date is required";
    if (!formData.time) return "Time is required";
    if (!formData.price && formData.price !== 0 && formData.price !== "0") {
      return "Price is required";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        customerName: formData.customerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        stylist: formData.stylist,
        date: formData.date,
        time: formData.time,
        duration: Number(formData.duration) || 60,
        price: Number(formData.price) || 0,
        notes: formData.notes.trim(),
        status: "Pending",
      };

      console.log("Booking payload:", payload);

      const response = await createAppointment(payload);
      console.log("Create appointment response:", response);

      setSuccessMessage("Appointment booked successfully!");
      setFormData(initialForm);
    } catch (error) {
      console.error("Booking submit error:", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f6efe8] py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-20 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />
        <div className="absolute right-[-100px] top-32 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Booking"
          title="Book your salon appointment"
          text="Choose your service, preferred stylist, date, and time for a smooth luxury salon booking experience."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative overflow-hidden rounded-[34px] border border-[#eadfd4] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-rose-50 blur-2xl"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600">
                <Sparkles size={16} />
                Premium Experience
              </div>

              <h3 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Your beauty appointment, beautifully scheduled.
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Reserve your preferred service with our expert stylists and
                enjoy a seamless salon experience tailored to your style,
                comfort, and confidence.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="flex items-start gap-4 rounded-2xl border border-[#f0e3d8] bg-[#fffaf6] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <Scissors size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Expert Styling
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Choose from premium hair, beauty, bridal, and skin care
                      services delivered by experienced professionals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#f0e3d8] bg-[#fffaf6] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Flexible Scheduling
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Pick your ideal date and time slot with a smooth booking
                      process designed for convenience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#f0e3d8] bg-[#fffaf6] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Trusted Service
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      From bridal makeup to luxury hair care, we focus on
                      quality, hygiene, and personalized attention.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-1 text-amber-300">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Loved by clients for our premium styling, calm ambience, and
                  elegant service experience.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-[#eadfd4] bg-[#fffaf6] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Need help booking?
                    </p>
                    <p className="text-base font-bold text-slate-900">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Call us directly for bridal packages, urgent appointments, or
                  custom beauty consultations.
                </p>
              </div>

              <div className="mt-5 rounded-2xl bg-[#fff2e5] p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#d17e50]">
                  QUICK NOTE
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  For bridal and event services, we recommend booking at least
                  5–7 days in advance for better slot availability and stylist
                  preference.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-[#eadfd4] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="border-b border-[#f0e5db] bg-[#fffaf6] px-8 py-7 sm:px-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                <Clock3 size={16} />
                Easy Appointment Form
              </div>
              <h3 className="mt-4 text-3xl font-bold text-slate-900">
                Confirm your booking
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Fill in your details and let us reserve your preferred salon
                slot with care and precision.
              </p>
            </div>

            <div className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="grid gap-8">
                <div>
                  <h4 className="mb-5 text-xl font-bold text-slate-900">
                    Customer Information
                  </h4>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <User size={16} />
                        Customer Name *
                      </label>
                      <input
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter customer name"
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <Mail size={16} />
                        Email *
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="customer@example.com"
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <PhoneCall size={16} />
                        Phone *
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="text"
                        placeholder="+91 9876543210"
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-5 text-xl font-bold text-slate-900">
                    Appointment Details
                  </h4>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Service *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      >
                        <option value="">Select a service</option>
                        <option value="Hair Cut & Styling">Hair Cut & Styling</option>
                        <option value="Hair Spa">Hair Spa</option>
                        <option value="Bridal Makeup">Bridal Makeup</option>
                        <option value="Facial Treatment">Facial Treatment</option>
                        <option value="Hair Color">Hair Color</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Stylist *
                      </label>
                      <select
                        name="stylist"
                        value={formData.stylist}
                        onChange={handleChange}
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      >
                        <option value="">Select a stylist</option>
                        <option value="Riya Mehra">Riya Mehra</option>
                        <option value="Aisha Khan">Aisha Khan</option>
                        <option value="Neha Sharma">Neha Sharma</option>
                        <option value="Meera Patel">Meera Patel</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Date *
                      </label>
                      <input
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        type="date"
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Time *
                      </label>
                      <input
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        type="time"
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Duration (minutes)
                      </label>
                      <input
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        type="number"
                        placeholder="60"
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <BadgeIndianRupee size={16} />
                        Price (₹) *
                      </label>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="0"
                        className="h-14 w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Any special requests or notes..."
                        className="min-h-[150px] w-full rounded-2xl border border-[#dfd3c7] bg-[#fffaf6] px-4 py-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:bg-white focus:ring-4 focus:ring-[#f6e2d1]"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {successMessage}
                  </div>
                )}

                <div className="rounded-2xl border border-[#eadfd4] bg-[#fffaf6] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        You are booking a premium salon service.
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Our team may contact you for appointment confirmation if
                        needed.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-base font-semibold text-white shadow-[0_14px_30px_rgba(217,119,6,0.28)] transition duration-300 hover:-translate-y-0.5 hover:from-amber-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? "Booking..." : "Confirm Booking"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}