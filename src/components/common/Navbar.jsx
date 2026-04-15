import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineScissors, HiChevronDown } from "react-icons/hi2";

const navItems = [
  {
    title: "Home",
    path: "/",
    dropdown: [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
      { name: "Offers", path: "/offers" },
    ],
  },
  {
    title: "About",
    path: "/about",
    dropdown: [
      { name: "About Us", path: "/about" },
      { name: "Team", path: "/team" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Services",
    path: "/services",
    dropdown: [
      { name: "Services", path: "/services" },
      { name: "Pricing", path: "/pricing" },
      { name: "Booking", path: "/booking" },
    ],
  },
  {
    title: "Contact",
    path: "/contact",
    dropdown: [
      { name: "Support", path: "/contact#support" },
      { name: "Visit Us", path: "/contact#visit-us" },
    ],
  },
];

function DesktopDropdown({ item }) {
  return (
    <div className="group relative">
      <div className="flex items-center gap-1 cursor-pointer py-2">
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `text-sm font-medium transition-all duration-300 ${
              isActive ? "text-amber-600" : "text-slate-900 hover:text-amber-600"
            }`
          }
        >
          {item.title}
        </NavLink>

        <HiChevronDown className="text-sm text-slate-600 transition-transform duration-300 group-hover:rotate-180" />
      </div>

      <div className="invisible absolute left-0 top-full z-50 w-52 translate-y-1 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {item.dropdown.map((subItem) => (
          <NavLink
            key={subItem.name}
            to={subItem.path}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-amber-50 text-amber-600 shadow-md"
                  : "text-slate-700 hover:bg-amber-50 hover:text-amber-600"
              }`
            }
          >
            {subItem.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg"
            >
              <HiOutlineScissors className="text-2xl" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Glowence</h1>
              <p className="text-xs text-slate-600">Luxury Salon Experience</p>
            </div>
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <DesktopDropdown
                item={item}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard"
              className="rounded-xl border border-amber-200/50 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50 hover:shadow-lg backdrop-blur-sm"
            >
              Dashboard
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/booking"
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl"
            >
              Book Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}