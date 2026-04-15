import SectionTitle from "../../components/common/SectionTitle";
import { faqs } from "../../data/siteData";

export default function Faq() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="FAQ"
        title="Frequently asked questions"
        text="Common questions related to booking, service selection, appointments, and walk-in availability."
      />
      <div className="space-y-5">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">{item.q}</h3>
            <p className="mt-3 text-slate-600">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}