import { useState, useEffect } from "react";
import DataTable from "../../components/dashboard/Tables/DataTable";
import FilterBar from "../../components/dashboard/Forms/FilterBar";
import AddCustomerModal from "../../components/dashboard/Modals/AddCustomerModal";
import { useFilters, useSorting } from "../../hooks/useDashboard";
import { formatCurrency, formatDate } from "../../utils/dashboardHelpers";
import { getAllCustomers } from "../../api/dashboardApi";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { filters, updateFilter } = useFilters({ status: "" });
  const { sortKey, sortOrder, sortedItems, toggleSort } = useSorting(customers, "lastVisit", "desc");

  useEffect(() => {
    fetchCustomers();
  }, [filters.status, page]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const status = filters.status || "";
      const response = await getAllCustomers(status, page, 10);
      setCustomers(response.data || []);
      setTotalPages(response.totalPages || 1);
      setError("");
    } catch (err) {
      setError("Failed to load customers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on status
  const filteredCustomers = sortedItems.filter((customer) => {
    if (filters.status && customer.status !== filters.status) return false;
    return true;
  });

  const filterOptions = [
    {
      id: "status",
      label: "Status",
      type: "select",
      value: filters.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
    },
  ];

  const handleAddCustomerSuccess = () => {
    fetchCustomers(); // Refresh the list
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value) => <span className="font-medium text-slate-900">{value}</span>,
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "totalSpent",
      label: "Total Spent",
      render: (value) => <span className="font-semibold text-slate-900">₹{value.toLocaleString()}</span>,
    },
    { key: "bookings", label: "Bookings" },
    {
      key: "lastVisit",
      label: "Last Visit",
      render: (value) => formatDate(value),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="mt-1 text-slate-600">Manage your customer base</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700"
        >
          + Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total Customers</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">{customers.length}</h3>
        </div>
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-600">Active</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {customers.filter((c) => c.status === "Active").length}
          </h3>
        </div>
        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-600">
            ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
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
        data={filteredCustomers}
        loading={loading}
        error={error}
        onRetry={fetchCustomers}
        onEdit={(customer) => console.log("Edit:", customer)}
        onDelete={(customer) => console.log("Delete:", customer)}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="inline-flex gap-2 rounded-lg border border-slate-200 bg-white p-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`rounded px-3 py-2 text-sm font-medium ${
                  page === i + 1
                    ? "bg-pink-600 text-white"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddCustomerSuccess}
      />
    </div>
  );
}