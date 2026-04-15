import SectionTitle from "../../components/common/SectionTitle";
import { pricingPlans } from "../../data/siteData";

export default function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Pricing"
        title="Affordable and premium packages"
        text="Choose salon packages based on your needs, occasion, and beauty goals."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div key={plan.id} className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-2xl font-bold">{plan.title}</h3>
            <p className="mt-4 text-3xl font-bold text-rose-600">{plan.price}</p>
            <ul className="mt-6 space-y-3 text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}