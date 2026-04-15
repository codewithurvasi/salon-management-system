export default function Settings() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <input className="rounded-xl border border-slate-300 px-4 py-3 outline-none" type="text" placeholder="Salon Name" />
        <input className="rounded-xl border border-slate-300 px-4 py-3 outline-none" type="text" placeholder="Phone Number" />
        <input className="rounded-xl border border-slate-300 px-4 py-3 outline-none" type="email" placeholder="Email Address" />
        <input className="rounded-xl border border-slate-300 px-4 py-3 outline-none" type="text" placeholder="Business Hours" />
      </div>
    </div>
  );
}