import { useState, useEffect } from "react";
import DataTable from "../../components/dashboard/Tables/DataTable";
import FilterBar from "../../components/dashboard/Forms/FilterBar";
import AddStaffModal from "../../components/dashboard/Modals/AddStaffModal";
import EditStaffModal from "../../components/dashboard/Modals/EditStaffModal";
import { useFilters, useSorting } from "../../hooks/useDashboard";
import {
  getAllStaff,
  updateStaff as updateStaffApi,
  deleteStaff as deleteStaffApi,
} from "../../api/dashboardApi";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { filters, updateFilter } = useFilters({ status: "" });
  const { sortedItems } = useSorting(staff, "name", "asc");

  useEffect(() => {
    fetchStaff();
  }, [filters.status, page]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const status = filters.status || "";
      const response = await getAllStaff(status, page, 10);

      console.log("Staff API response:", response);

      const staffList =
        response?.staff ||
        response?.data?.staff ||
        response?.data ||
        [];

      setStaff(Array.isArray(staffList) ? staffList : []);
      setTotalPages(
        response?.totalPages ||
          response?.pagination?.totalPages ||
          response?.data?.pagination?.totalPages ||
          1
      );
      setError("");
    } catch (err) {
      setError("Failed to load staff");
      console.error("Fetch staff error:", err);
    } finally {
      setLoading(false);
    }
  };

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
        { value: "", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
        { value: "Leave", label: "On Leave" },
      ],
    },
  ];

  const handleAddStaffSuccess = () => {
    setShowAddModal(false);
    fetchStaff();
  };

  const handleEditStaff = (member) => {
    setEditingStaff(member);
    setShowEditModal(true);
  };

  const handleDeleteStaff = async (member) => {
    try {
      await deleteStaffApi(member._id || member.id);
      fetchStaff();
    } catch (err) {
      setError("Failed to delete staff");
      console.error("Delete staff error:", err);
    }
  };

  const handleUpdateStaff = async (updatedData) => {
    try {
      await updateStaffApi(editingStaff._id || editingStaff.id, updatedData);
      setShowEditModal(false);
      setEditingStaff(null);
      fetchStaff();
    } catch (err) {
      setError("Failed to update staff");
      console.error("Update staff error:", err);
    }
  };

  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === "Active").length;
  const avgRating =
    staff.length > 0
      ? (
          staff.reduce((sum, s) => sum + (Number(s.rating) || 0), 0) /
          staff.length
        ).toFixed(1)
      : "0.0";
  const totalBookings = staff.reduce(
    (sum, s) => sum + (Number(s.totalBookings) || 0),
    0
  );

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value) => (
        <span className="font-medium text-slate-900">{value || "N/A"}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (value) => value || "N/A",
    },
    {
      key: "phone",
      label: "Phone",
      render: (value) => value || "N/A",
    },
    {
      key: "specialization",
      label: "Specialization",
      render: (value) => value || "N/A",
    },
    {
      key: "experience",
      label: "Experience",
      render: (value) => (
        <span className="text-slate-700">
          {value ? `${value} Years` : "N/A"}
        </span>
      ),
    },
    {
      key: "joinDate",
      label: "Join Date",
      render: (value) =>
        value ? new Date(value).toLocaleDateString() : "N/A",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : value === "Leave"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value || "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
          <p className="mt-1 text-slate-600">
            Manage your salon stylists and professionals
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700"
        >
          + Add Staff
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total Staff</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">{totalStaff}</h3>
        </div>

        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-600">Active</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {activeStaff}
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-slate-600">Avg Rating</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-600">
            {avgRating}
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-50 p-4">
          <p className="text-sm text-slate-600">Total Bookings</p>
          <h3 className="mt-2 text-2xl font-bold text-purple-600">
            {totalBookings}
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
        data={filteredStaff}
        loading={loading}
        error={error}
        onRetry={fetchStaff}
        onEdit={handleEditStaff}
        onDelete={handleDeleteStaff}
      />

      {!loading && !error && staff.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, staff.length)} of {staff.length} staff members
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

      <AddStaffModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddStaffSuccess}
      />

      <EditStaffModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingStaff(null);
        }}
        staff={editingStaff}
        onSave={handleUpdateStaff}
      />
    </div>
  );
}