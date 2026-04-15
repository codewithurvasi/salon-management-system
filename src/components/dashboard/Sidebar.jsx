import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineArchiveBox,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const items = [
  { name: "Overview", path: "/dashboard", icon: HiOutlineHome },
  { name: "Appointments", path: "/dashboard/appointments", icon: HiOutlineCalendarDays },
  { name: "Customers", path: "/dashboard/customers", icon: HiOutlineUsers },
  { name: "Staff", path: "/dashboard/staff", icon: HiOutlineUserGroup },
  { name: "Services", path: "/dashboard/services", icon: HiOutlineBriefcase },
  { name: "Revenue", path: "/dashboard/revenue", icon: HiOutlineCurrencyDollar },
  { name: "Inventory", path: "/dashboard/inventory", icon: HiOutlineArchiveBox },
  // { name: "Reviews", path: "/dashboard/reviews", icon: HiOutlineChatBubbleLeftRight },
  { name: "Settings", path: "/dashboard/settings", icon: HiOutlineCog6Tooth },
];

export default function Sidebar() {
  return (
    <aside className="hidden fixed left-0 top-0 h-screen w-72 bg-slate-950 text-white lg:block">
      <div className="border-b border-slate-800 px-6 py-6">
        <h2 className="text-2xl font-bold">SalonPro</h2>
        <p className="mt-1 text-sm text-slate-400">Admin Dashboard</p>
      </div>

      <div className="space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-rose-600 text-white"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon className="text-lg" />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}