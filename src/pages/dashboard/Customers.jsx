import { useState, useEffect } from "react";
import DataTable from "../../components/dashboard/Tables/DataTable";
import FilterBar from "../../components/dashboard/Forms/FilterBar";
import ConfirmDialog from "../../components/dashboard/Modals/ConfirmDialog";
import EditCustomerModal from "../../components/dashboard/Modals/EditCustomerModal";
import { useFilters, useSorting } from "../../hooks/useDashboard";
import {
  getAllCustomers,
  deleteCustomer,
} from "../../api/dashboardApi";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { filters, updateFilter } = useFilters({ status: "" });
  const { sortedItems } = useSorting(customers, "lastVisit", "desc");

  useEffect(() => {
    fetchCustomers();
  }, [filters.status, page]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const status = filters.status || "";
      const response = await getAllCustomers(status, page, 10);

      console.log("Customers API response:", response);

      const customerList =
        response?.customers ||
        response?.data?.customers ||
        response?.data ||
        [];

      setCustomers(Array.isArray(customerList) ? customerList : []);
      setTotalPages(
        response?.totalPages ||
          response?.pagination?.totalPages ||
          response?.data?.pagination?.totalPages ||
          1
      );
      setError("");
    } catch (err) {
      setError("Failed to load customers");
      console.error("Fetch customers error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteConfirm(true);
  };

  const handleDeleteCustomer = async () => {
    try {
      const customerId = selectedCustomer?._id || selectedCustomer?.id;

      if (!customerId) {
        setError("Customer ID not found");
        return;
      }

      await deleteCustomer(customerId);

      setCustomers((prev) =>
        prev.filter((customer) => (customer._id || customer.id) !== customerId)
      );

      setShowDeleteConfirm(false);
      setSelectedCustomer(null);
      setError("");
    } catch (err) {
      console.error("Delete customer error:", err);
      setError(
        err?.response?.data?.message || "Failed to delete customer"
      );
    }
  };

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
        { value: "", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
    },
  ];

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const totalRevenue = customers.reduce(
    (sum, c) => sum + (Number(c.totalSpent) || 0),
    0
  );
  const totalBookings = customers.reduce(
    (sum, c) => sum + (Number(c.totalBookings) || Number(c.bookings) || 0),
    0
  );

  const formatLastVisit = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

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
      key: "totalSpent",
      label: "Total Spent",
      render: (value) => `₹${Number(value || 0).toLocaleString()}`,
    },
    {
      key: "totalBookings",
      label: "Bookings",
      render: (_, row) => Number(row.totalBookings || row.bookings || 0),
    },
    {
      key: "lastVisit",
      label: "Last Visit",
      render: (value) => formatLastVisit(value),
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
          {value || "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customer Management</h1>
          <p className="mt-1 text-slate-600">
            Manage your salon customers and their activity
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total Customers</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {totalCustomers}
          </h3>
        </div>

        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-600">Active</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {activeCustomers}
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-600">
            ₹{totalRevenue.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-50 p-4">
          <p className="text-sm text-slate-600">Bookings</p>
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
        data={filteredCustomers}
        loading={loading}
        error={error}
        onRetry={fetchCustomers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {!loading && !error && customers.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, customers.length)} of {customers.length} customers
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

      <EditCustomerModal
        isOpen={showEditModal}
        customer={selectedCustomer}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCustomer(null);
        }}
        onSuccess={() => {
          setShowEditModal(false);
          setSelectedCustomer(null);
          fetchCustomers();
        }}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Customer"
        message={`Are you sure you want to delete ${
          selectedCustomer?.name || "this customer"
        }?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDeleteCustomer}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
}