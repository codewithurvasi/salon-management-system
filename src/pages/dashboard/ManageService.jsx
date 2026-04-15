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
  const { sortKey, sortOrder, sortedItems, toggleSort } = useSorting(services, "name", "asc");

  useEffect(() => {
    fetchServices();
  }, [filters.category, page]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const category = filters.category || "";
      const response = await getAllServices(category, page, 10);
      setServices(response.data || []);
      setTotalPages(response.totalPages || 1);
      setError("");
    } catch (err) {
      setError("Failed to load services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter services based on category
  const filteredServices = sortedItems.filter((service) => {
    if (filters.category && service.category !== filters.category) return false;
    return true;
  });

  const columns = [
    {
      key: "name",
      label: "Service Name",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
    },
    {
      key: "price",
      label: "Price",
      render: (value) => formatCurrency(value),
      sortable: true,
    },
    {
      key: "duration",
      label: "Duration",
      render: (value) => `${value} mins`,
      sortable: true,
    },
    {
      key: "totalBookings",
      label: "Bookings",
      sortable: true,
    },
    {
      key: "rating",
      label: "Rating",
      render: (value) => value ? `${value} ⭐` : "N/A",
      sortable: true,
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
    fetchServices(); // Refresh the list
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Service Management</h1>
          <p className="mt-1 text-slate-600">Manage your salon services and pricing</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700"
        >
          + Add Service
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total Services</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">{services.length}</h3>
        </div>
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-600">Active Services</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {services.filter((s) => s.isActive).length}
          </h3>
        </div>
        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-600">
            ₹{services.reduce((sum, s) => sum + (s.revenue || 0), 0).toLocaleString()}
          </h3>
        </div>
        <div className="rounded-2xl bg-purple-50 p-4">
          <p className="text-sm text-slate-600">Avg Rating</p>
          <h3 className="mt-2 text-2xl font-bold text-purple-600">
            {services.length > 0
              ? (services.reduce((sum, s) => sum + (s.rating || 0), 0) / services.length).toFixed(1)
              : 0} ⭐
          </h3>
        </div>
      </div>

      {/* Filter */}
      <FilterBar
        filters={filterOptions}
        onFilterChange={(id, value) => updateFilter(id, value)}
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredServices}
        loading={loading}
        error={error}
        onRetry={fetchServices}
        onEdit={(service) => console.log("Edit:", service)}
        onDelete={(service) => console.log("Delete:", service)}
      />

      <AddServiceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddServiceSuccess}
      />
    </div>
  );
}