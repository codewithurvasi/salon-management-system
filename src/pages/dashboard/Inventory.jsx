export default function Inventory() {
  const items = [
    "Hair Serum - 14 units",
    "Facial Kit - 8 units",
    "Hair Color Pack - 12 units",
    "Nail Paint Set - 21 units",
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Inventory</h2>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-slate-200 p-4">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}