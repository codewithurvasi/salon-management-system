export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-xl font-bold">SalonPro</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Professional salon management website with booking, services, team,
            customers, and dashboard management.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Hair Styling</li>
            <li>Facial Care</li>
            <li>Bridal Makeup</li>
            <li>Nail Art</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>+91 98765 43210</li>
            <li>hello@salonpro.com</li>
            <li>City Center, India</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Mon - Fri: 9 AM - 8 PM</li>
            <li>Sat: 9 AM - 9 PM</li>
            <li>Sun: 10 AM - 6 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">
        © 2026 SalonPro. All rights reserved.
      </div>
    </footer>
  );
}