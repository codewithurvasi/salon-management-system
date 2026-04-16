import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ChevronDown,
  MoveRight,
} from "lucide-react";
import SectionTitle from "../../components/common/SectionTitle";

const faqData = [
  {
    question: "Do I need to book an appointment in advance?",
    answer:
      "Yes, we recommend booking in advance to secure your preferred date and time, especially for weekends and bridal services.",
  },
  {
    question: "Do you offer bridal and event makeup bookings?",
    answer:
      "Yes, we offer bridal, engagement, party, and event beauty packages. You can contact us for custom pricing and availability.",
  },
  {
    question: "What are your salon working hours?",
    answer:
      "Our salon is open Monday to Saturday from 9:00 AM to 8:00 PM. Sunday timings can vary for special bookings.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "Yes, appointments can be rescheduled based on slot availability. We suggest informing us as early as possible.",
  },
];

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="rounded-2xl border border-[#e7dbcf] bg-white/80 backdrop-blur-sm transition-all duration-300">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-base font-semibold text-slate-900">
          {item.question}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e7dbcf] bg-[#f8f1ea] transition ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={18} className="text-slate-700" />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-7 text-slate-600">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}


export default function Contact() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#f6efe8]">
      {/* soft background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-20 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />
        <div className="absolute right-[-80px] top-[420px] h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Contact"
          title="Get in touch with our salon"
          text="Reach out for appointment queries, bridal bookings, service details, or customer support."
        />

        {/* HERO CONTACT BLOCK */}
        <div className="mt-14 overflow-hidden rounded-[36px] border border-[#e9ddd1] bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            {/* IMAGE SIDE */}
            <div className="relative min-h-[420px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury salon contact"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/55 via-[#0f172a]/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="max-w-md rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-200">
                    Luxury Salon
                  </p>
                  <h3 className="mt-3 text-3xl font-bold leading-tight text-white">
                    Beauty, elegance, and care — all in one place.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/85">
                    Connect with our team for appointments, bridal packages,
                    beauty consultations, and premium self-care services.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM SIDE */}
            <div className="bg-[#fffaf6] p-8 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600">
                <Sparkles size={16} />
                Let’s Connect
              </div>

              <h3 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                Book a consultation
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
                Fill out the form below and our team will get back to you as
                soon as possible. For bridal and event bookings, we recommend
                contacting us early for better slot availability.
              </p>

              <form className="mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="h-14 rounded-2xl border border-[#e0d4c8] bg-white px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:ring-4 focus:ring-[#f5dfcf]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="h-14 rounded-2xl border border-[#e0d4c8] bg-white px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:ring-4 focus:ring-[#f5dfcf]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="h-14 rounded-2xl border border-[#e0d4c8] bg-white px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:ring-4 focus:ring-[#f5dfcf]"
                  />
                  <select className="h-14 rounded-2xl border border-[#e0d4c8] bg-white px-4 text-slate-500 outline-none transition focus:border-[#d88b5b] focus:ring-4 focus:ring-[#f5dfcf]">
                    <option>Select Service</option>
                    <option>Hair Styling</option>
                    <option>Bridal Makeup</option>
                    <option>Skin Care</option>
                    <option>Nail Services</option>
                    <option>Party Makeup</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="h-14 rounded-2xl border border-[#e0d4c8] bg-white px-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:ring-4 focus:ring-[#f5dfcf]"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="min-h-[170px] rounded-2xl border border-[#e0d4c8] bg-white px-4 py-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d88b5b] focus:ring-4 focus:ring-[#f5dfcf]"
                />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#e58b00] px-7 text-base font-semibold text-white shadow-[0_12px_30px_rgba(229,139,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#cf7d00]"
                  >
                    Send Message
                    <MoveRight size={18} />
                  </button>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-14 items-center justify-center rounded-2xl border border-[#e3d7cc] bg-white px-7 text-base font-semibold text-slate-800 transition hover:bg-[#f8f1ea]"
                  >
                    Get Directions
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div id= "support" className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-[#eadfd4] bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Phone size={22} />
            </div>
            <h4 className="mt-5 text-lg font-bold text-slate-900">Call Us</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Speak directly with our support team for appointments and booking
              help.
            </p>
            <p className="mt-4 text-base font-semibold text-slate-900">
              +91 98765 43210
            </p>
          </div>

          <div className="rounded-[28px] border border-[#eadfd4] bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Mail size={22} />
            </div>
            <h4 className="mt-5 text-lg font-bold text-slate-900">Email Us</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Reach out for service details, bridal packages, and support
              inquiries.
            </p>
            <p className="mt-4 text-base font-semibold text-slate-900">
              hello@salonpro.com
            </p>
          </div>

          <div className="rounded-[28px] border border-[#eadfd4] bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <MapPin size={22} />
            </div>
            <h4 className="mt-5 text-lg font-bold text-slate-900">
              Visit Salon
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Experience our premium beauty and styling services at our salon
              location.
            </p>
            <p className="mt-4 text-base font-semibold text-slate-900">
              City Center, India
            </p>
          </div>

          <div className="rounded-[28px] border border-[#eadfd4] bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Clock size={22} />
            </div>
            <h4 className="mt-5 text-lg font-bold text-slate-900">Hours</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              We are available throughout the week for your convenience and care.
            </p>
            <p className="mt-4 text-base font-semibold text-slate-900">
              Mon - Sat, 9 AM - 8 PM
            </p>
          </div>
        </div>

        {/* FAQ + NOTE */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-[#eadfd4] bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d17e50]">
              Support
            </p>
            <h3 className="mt-4 text-4xl font-bold text-slate-900">
              Frequently asked questions
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Find quick answers for the most common appointment, bridal, and
              consultation related questions.
            </p>

            <div className="mt-8 rounded-[28px] bg-[#0f172a] p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-300">
                Quick Note
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                For bridal and event bookings, we recommend contacting us at
                least 7 days in advance for preferred slot availability.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>

        {/* MAP */}
        <div id="visit-us" className="mt-16 overflow-hidden rounded-[34px] border border-[#eadfd4] bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="overflow-hidden rounded-[26px]">
            <iframe
              src="https://www.google.com/maps?q=City%20Center%20India&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full"
              title="Salon location map"
            ></iframe>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 rounded-[34px] border border-[#eadfd4] bg-gradient-to-r from-[#fff7ef] via-[#fffaf6] to-[#fff3e6] p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d17e50]">
                Premium Care
              </p>
              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                Ready to book your luxury salon experience?
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
                Connect with our team today for appointments, bridal packages,
                skin treatments, hair styling, and complete beauty consultations.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
  <Link to="/booking">
    <button className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#e58b00] px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(229,139,0,0.25)] transition hover:bg-[#cf7d00]">
      Book Now
    </button>
  </Link>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}