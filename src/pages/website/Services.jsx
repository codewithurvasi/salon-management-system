import SectionTitle from "../../components/common/SectionTitle";
import { services } from "../../data/siteData";

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Services"
        title="Explore our beauty and grooming services"
        text="Professional treatments for hair, skin, makeup, nails, and complete styling care."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-3 text-slate-600">{item.desc}</p>
            <p className="mt-5 text-lg font-bold text-rose-600">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}