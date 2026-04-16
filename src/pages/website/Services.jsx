import { useEffect, useState } from "react";
import SectionTitle from "../../components/common/SectionTitle";
import { getAllServices } from "../../api/dashboardApi";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      // category empty => all services
      // page 1, limit bada rakh diya taki website par saari aa jaye
      const response = await getAllServices("", 1, 50);

      console.log("Website services API response:", response);

      const serviceList =
        response?.services ||
        response?.data?.services ||
        response?.data ||
        [];

      const activeServices = Array.isArray(serviceList)
        ? serviceList.filter((item) => item?.isActive !== false)
        : [];

      setServices(activeServices);
    } catch (err) {
      console.error("Fetch website services error:", err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString()}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Services"
        title="Explore our beauty and grooming services"
        text="Professional treatments for hair, skin, makeup, nails, and complete styling care."
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-rose-600"></div>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchServices}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-medium text-slate-700">
            No services available right now
          </p>
          <p className="mt-2 text-slate-500">
            Services added from admin panel will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item) => (
            <div
              key={item._id || item.id}
              className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900">
                  {item.name || "Untitled Service"}
                </h3>

                {item.category && (
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                    {item.category}
                  </span>
                )}
              </div>

              <p className="mt-3 min-h-[56px] text-slate-600">
                {item.description || "No description available."}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-lg font-bold text-rose-600">
                  {formatPrice(item.price)}
                </p>

                <p className="text-sm font-medium text-slate-500">
                  {item.duration ? `${item.duration} mins` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}