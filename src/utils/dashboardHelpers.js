// Format currency for INR
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

// Format date in a readable way
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Format time
export const formatTime = (timeString) => {
  const time = new Date(`2000-01-01T${timeString}`);
  return time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Get status badge color
export const getStatusBadgeColor = (status) => {
  const statusLower = status?.toLowerCase();
  const colors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
  };
  return colors[statusLower] || "bg-gray-100 text-gray-800";
};

// Calculate percentage change
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return "0%";
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Get initials from name
export const getInitials = (name) => {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// Sort array by key
export const sortByKey = (array, key, order = "asc") => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
};

// Filter array by multiple criteria
export const filterByCriteria = (array, criteria) => {
  return array.filter((item) =>
    Object.keys(criteria).every((key) => {
      const value = criteria[key];
      if (!value) return true;
      return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
    })
  );
};
