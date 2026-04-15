import SectionTitle from "../../components/common/SectionTitle";

export default function Offers() {
  const offers = [
    "Flat 20% off on bridal pre-booking package",
    "Hair spa + haircut combo at special price",
    "Weekend glow facial package",
    "Membership discount for repeat clients",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Offers"
        title="Seasonal offers and premium salon deals"
        text="Exclusive discounts and value packages for beauty, grooming, and bridal services."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {offers.map((offer) => (
          <div key={offer} className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-rose-600">Special Offer</h3>
            <p className="mt-3 text-slate-700">{offer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}