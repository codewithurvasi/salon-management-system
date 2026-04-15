import { testimonials } from "../../data/siteData";

export default function Reviews() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Reviews</h2>
      <div className="mt-6 space-y-4">
        {testimonials.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <h3 className="font-bold">{item.name}</h3>
            <p className="mt-2 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}