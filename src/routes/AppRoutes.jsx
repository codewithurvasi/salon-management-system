import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/website/Home";
import About from "../pages/website/About";
import Services from "../pages/website/Services";
import Pricing from "../pages/website/Pricing";
import Team from "../pages/website/Team";
import Gallery from "../pages/website/Gallery";
import Offers from "../pages/website/Offers";
import Booking from "../pages/website/Booking";
import Contact from "../pages/website/Contact";
import Faq from "../pages/website/Faq";
import Login from "../pages/website/Login";
import Signup from "../pages/website/Signup";
// import ScrollToTop from "../components/common/ScrollToTop";

import DashboardHome from "../pages/dashboard/DashboardHome";
import Appointments from "../pages/dashboard/Appointments";
import Customers from "../pages/dashboard/Customers";
import Staff from "../pages/dashboard/Staff";
import ManageService from "../pages/dashboard/ManageService";
import Revenue from "../pages/dashboard/Revenue";
import Inventory from "../pages/dashboard/Inventory";
import Reviews from "../pages/dashboard/Reviews";
import Settings from "../pages/dashboard/Settings";
import AdminLogin from "../pages/dashboard/AdminLogin";

export default function AppRoutes() {
  return (
    <Routes>

      {/* <ScrollToTop /> */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="team" element={<Team />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="offers" element={<Offers />} />
        <Route path="booking" element={<Booking />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="/dashboard" element={
        <ProtectedRoute adminOnly={true}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="customers" element={<Customers />} />
        <Route path="staff" element={<Staff />} />
        <Route path="services" element={<ManageService />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}