import { useState, useEffect } from "react";
import DataTable from "../../components/dashboard/Tables/DataTable";
import FilterBar from "../../components/dashboard/Forms/FilterBar";
import AddServiceModal from "../../components/dashboard/Modals/AddServiceModal";
import { useFilters, useSorting } from "../../hooks/useDashboard";
import { formatCurrency } from "../../utils/dashboardHelpers";
import { getAllServices } from "../../api/dashboardApi";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { filters, updateFilter } = useFilters({ category: "" });
  const { sortedItems } = useSorting(services, "name", "asc");

  useEffect(() => {
    fetchServices();
  }, [filters.category, page]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const category = filters.category || "";
      const response = await getAllServices(category, page, 10);

      console.log("Services API response:", response);

      const serviceList =
        response?.services ||
        response?.data?.services ||
        response?.data ||
        [];

      setServices(Array.isArray(serviceList) ? serviceList : []);
      setTotalPages(
        response?.totalPages ||
          response?.pagination?.totalPages ||
          response?.data?.pagination?.totalPages ||
          1
      );
      setError("");
    } catch (err) {
      setError("Failed to load services");
      console.error("Fetch services error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = sortedItems.filter((service) => {
    if (filters.category && service.category !== filters.category) return false;
    return true;
  });

  const columns = [
    {
      key: "name",
      label: "Service Name",
      render: (value) => (
        <span className="font-medium text-slate-900">{value || "N/A"}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value) => value || "N/A",
    },
    {
      key: "price",
      label: "Price",
      render: (value) => formatCurrency(value || 0),
    },
    {
      key: "duration",
      label: "Duration",
      render: (value) => `${value || 0} mins`,
    },
    {
      key: "description",
      label: "Description",
      render: (value) =>
        value ? (
          <span className="block max-w-[260px] truncate text-slate-700">
            {value}
          </span>
        ) : (
          "N/A"
        ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value) => (
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            value
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      id: "category",
      label: "Category",
      type: "select",
      value: filters.category,
      options: [
        { value: "", label: "All Category" },
        { value: "Hair", label: "Hair" },
        { value: "Makeup", label: "Makeup" },
        { value: "Facial", label: "Facial" },
        { value: "Skin", label: "Skin" },
        { value: "Nails", label: "Nails" },
        { value: "Threading", label: "Threading" },
        { value: "Massage", label: "Massage" },
      ],
    },
  ];

  const handleAddServiceSuccess = () => {
    setShowAddModal(false);
    fetchServices();
  };

  const totalServices = services.length;
  const activeServices = services.filter((s) => s.isActive).length;
  const totalRevenue = services.reduce((sum, s) => sum + (Number(s.revenue) || 0), 0);
  const avgRating =
    services.length > 0
      ? (
          services.reduce((sum, s) => sum + (Number(s.rating) || 0), 0) /
          services.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Service Management</h1>
          <p className="mt-1 text-slate-600">
            Manage your salon services and pricing
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700"
        >
          + Add Service
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total Services</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">{totalServices}</h3>
        </div>

        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-600">Active Services</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {activeServices}
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-600">
            ₹{totalRevenue.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-50 p-4">
          <p className="text-sm text-slate-600">Avg Rating</p>
          <h3 className="mt-2 text-2xl font-bold text-purple-600">
            {avgRating} ⭐
          </h3>
        </div>
      </div>

      <FilterBar
        filters={filterOptions}
        onFilterChange={(id, value) => {
          setPage(1);
          updateFilter(id, value);
        }}
      />

      <DataTable
        columns={columns}
        data={filteredServices}
        loading={loading}
        error={error}
        onRetry={fetchServices}
        onEdit={(service) => console.log("Edit:", service)}
        onDelete={(service) => console.log("Delete:", service)}
      />

      {!loading && !error && services.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, services.length)} of {services.length} services
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AddServiceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddServiceSuccess}
      />
    </div>
  );
}