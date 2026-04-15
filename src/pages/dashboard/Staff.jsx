import { useState, useEffect } from "react";
import DataTable from "../../components/dashboard/Tables/DataTable";
import FilterBar from "../../components/dashboard/Forms/FilterBar";
import AddStaffModal from "../../components/dashboard/Modals/AddStaffModal";
import { useFilters, useSorting } from "../../hooks/useDashboard";
import { getAllStaff } from "../../api/dashboardApi";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { filters, updateFilter } = useFilters({ status: "" });
  const { sortKey, sortOrder, sortedItems, toggleSort } = useSorting(staff, "rating", "desc");

  useEffect(() => {
    fetchStaff();
  }, [filters.status, page]);

const fetchStaff = async () => {
  try {
    setLoading(true);
    const status = filters.status || "";
    const response = await getAllStaff(status, page, 10);

    console.log("Staff API response:", response);

    const staffList = Array.isArray(response?.data) ? response.data : [];

    setStaff(staffList);
    setTotalPages(response?.pagination?.totalPages || 1);
    setError("");
  } catch (err) {
    setError("Failed to load staff");
    console.error("Fetch staff error:", err);
  } finally {
    setLoading(false);
  }
};

  // Filter staff based on status
  const filteredStaff = sortedItems.filter((member) => {
    if (filters.status && member.status !== filters.status) return false;
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
        { value: "Leave", label: "On Leave" },
      ],
    },
  ];

  const handleAddStaffSuccess = () => {
    fetchStaff(); // Refresh the list
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value) => <span className="font-medium text-slate-900">{value}</span>,
    },
    { key: "phone", label: "Phone" },
    { key: "specialization", label: "Specialization" },
    { key: "experience", label: "Experience" },
    {
      key: "rating",
      label: "Rating",
      render: (value) => (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-900">{value}</span>
          <span className="text-yellow-500">★</span>
        </div>
      ),
    },
    {
      key: "totalBookings",
      label: "Bookings",
      render: (value) => (
        <span className="font-semibold text-slate-900">{value}</span>
      ),
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
          <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
          <p className="mt-1 text-slate-600">Manage your salon stylists and professionals</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700"
        >
          + Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total Staff</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">{staff.length}</h3>
        </div>
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-600">Active</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {staff.filter((s) => s.status === "Active").length}
          </h3>
        </div>
        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-slate-600">Avg Rating</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-600">
            {(staff.reduce((sum, s) => sum + s.rating, 0) / staff.length).toFixed(1)}
          </h3>
        </div>
        <div className="rounded-2xl bg-purple-50 p-4">
          <p className="text-sm text-slate-600">Total Bookings</p>
          <h3 className="mt-2 text-2xl font-bold text-purple-600">
            {staff.reduce((sum, s) => sum + s.totalBookings, 0)}
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
        data={filteredStaff}
        loading={loading}
        error={error}
        onRetry={fetchStaff}
        onEdit={(member) => console.log("Edit:", member)}
        onDelete={(member) => console.log("Delete:", member)}
      />

      <AddStaffModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddStaffSuccess}
      />
    </div>
  );
}