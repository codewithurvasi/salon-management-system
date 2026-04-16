import { useState, useEffect } from "react";
import FilterBar from "../../components/dashboard/Forms/FilterBar";
import ConfirmDialog from "../../components/dashboard/Modals/ConfirmDialog";
import AddAppointmentModal from "../../components/dashboard/Modals/AddAppointmentModal";
import { useFilters, useSorting } from "../../hooks/useDashboard";
import { getStatusBadgeColor, formatDate } from "../../utils/dashboardHelpers";
import {
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../../api/dashboardApi";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { filters, updateFilter } = useFilters({ status: "", date: "" });
  const { sortKey, sortOrder, sortedItems, toggleSort } = useSorting(
    appointments,
    "date",
    "desc"
  );

  useEffect(() => {
    fetchAppointments();
  }, [filters.status, page]);
  
const fetchAppointments = async () => {
  try {
    setLoading(true);
    const status = filters.status || "";
    const response = await getAllAppointments(status, page, 10);

    console.log("Appointments API response:", response);

    const appointmentList = Array.isArray(response?.data) ? response.data : [];

    setAppointments(appointmentList);
    setTotalPages(response?.pagination?.totalPages || 1);
    setError("");
  } catch (err) {
    setError("Failed to load appointments");
    console.error("Fetch appointments error:", err);
  } finally {
    setLoading(false);
  }
};
  const filteredAppointments = sortedItems.filter((apt) => {
    if (filters.status && apt.status !== filters.status) return false;
    return true;
  });
  console.log("Filtered Appointments:", filteredAppointments);

  const filterOptions = [
    {
      id: "status",
      label: "Status",
      type: "select",
      value: filters.status,
      options: [
        { value: "", label: "All Status" },
        { value: "Confirmed", label: "Confirmed" },
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
      ],
    },
  ];

  const getCustomerName = (apt) =>
    apt?.customerName || apt?.customer?.name || apt?.customer?.fullName || "N/A";

  const getServiceName = (apt) =>
    apt?.service || apt?.serviceName || apt?.serviceId?.name || apt?.service?.name || "N/A";

  const getStylistName = (apt) =>
    apt?.stylist || apt?.stylistName || apt?.staff?.name || apt?.stylistId?.name || "N/A";

  const getAppointmentDate = (apt) => {
    if (!apt?.date) return "N/A";
    try {
      return formatDate ? formatDate(apt.date) : new Date(apt.date).toLocaleDateString();
    } catch {
      return apt.date;
    }
  };

const handleStatusChange = async (aptId, newStatus) => {
  try {
    setError("");
    const response = await updateAppointmentStatus(aptId, newStatus);
    console.log("Appointment status updated:", response);
    await fetchAppointments();
  } catch (err) {
    setError(
      err?.response?.data?.message || "Failed to update appointment status"
    );
    console.error("Status update error:", err);
  }
};
  const handleDeleteAppointment = async (aptId) => {
    try {
      await cancelAppointment(aptId);

      setAppointments((prev) =>
        prev.filter((apt) => apt._id !== aptId && apt.id !== aptId)
      );

      setDeleteConfirm(false);
      setSelectedAppointment(null);
    } catch (err) {
      setError("Failed to cancel appointment");
      console.error("Delete appointment error:", err);
    }
  };

  const handleAddAppointmentSuccess = () => {
    setShowAddModal(false);
    fetchAppointments();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-1 text-slate-600">Manage all your salon appointments</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700"
        >
          + New Appointment
        </button>
      </div>

      <FilterBar
        filters={filterOptions}
        onFilterChange={(id, value) => {
          setPage(1);
          updateFilter(id, value);
        }}
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {appointments.length}
          </h3>
        </div>

        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-600">Confirmed</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {appointments.filter((a) => a.status === "Confirmed").length}
          </h3>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-4">
          <p className="text-sm text-slate-600">Pending</p>
          <h3 className="mt-2 text-2xl font-bold text-yellow-600">
            {appointments.filter((a) => a.status === "Pending").length}
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 p-4">
          <p className="text-sm text-slate-600">Cancelled</p>
          <h3 className="mt-2 text-2xl font-bold text-red-600">
            {appointments.filter((a) => a.status === "Cancelled").length}
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-pink-600"></div>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchAppointments}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Stylist
                  </th>
                  <th
                    className="cursor-pointer px-6 py-4 text-left text-sm font-semibold text-slate-700 hover:text-slate-900"
                    onClick={() => toggleSort("date")}
                  >
                    Date {sortKey === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt) => (
                    <tr
                      key={apt._id || apt.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {getCustomerName(apt)}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {getServiceName(apt)}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {getStylistName(apt)}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {getAppointmentDate(apt)}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {apt.time || "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={apt.status || "Pending"}
                          onChange={(e) =>
                            handleStatusChange(apt._id || apt.id, e.target.value)
                          }
                          className={`cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
                            apt.status || "Pending"
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setDeleteConfirm(true);
                          }}
                          className="font-medium text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, appointments.length)} of{" "}
            {appointments.length} appointments
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

      <ConfirmDialog
        isOpen={deleteConfirm}
        title="Delete Appointment"
        message={`Are you sure you want to delete the appointment of ${getCustomerName(
          selectedAppointment
        )}?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={() => handleDeleteAppointment(selectedAppointment?._id || selectedAppointment?.id)}
        onCancel={() => {
          setDeleteConfirm(false);
          setSelectedAppointment(null);
        }}
      />

      <AddAppointmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddAppointmentSuccess}
      />
    </div>
  );
}