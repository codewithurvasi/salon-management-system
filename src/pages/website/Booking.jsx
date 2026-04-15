import SectionTitle from "../../components/common/SectionTitle";

export default function Booking() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Booking"
        title="Book your salon appointment"
        text="Choose service, date, time, and preferred stylist for a smooth booking experience."
      />

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <form className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Full Name</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none" type="text" placeholder="Enter your name" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Phone Number</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none" type="text" placeholder="Enter phone number" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Service</label>
            <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none">
              <option>Hair Cut & Styling</option>
              <option>Hair Spa</option>
              <option>Bridal Makeup</option>
              <option>Facial Treatment</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Preferred Stylist</label>
            <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none">
              <option>Riya Mehra</option>
              <option>Aisha Khan</option>
              <option>Neha Sharma</option>
              <option>Meera Patel</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Date</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none" type="date" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Time</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none" type="time" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Notes</label>
            <textarea className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none" rows="5" placeholder="Additional notes"></textarea>
          </div>

          <div className="md:col-span-2">
            <button className="rounded-2xl bg-rose-600 px-6 py-3 font-semibold text-white">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}