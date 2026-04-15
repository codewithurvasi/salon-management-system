import SectionTitle from "../../components/common/SectionTitle";
import { HiSparkles, HiUserGroup, HiHeart } from "react-icons/hi2";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-rose-50 via-white to-orange-50">
      
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8 text-center">
        <SectionTitle
          tag="About Us"
          title="A premium salon experience crafted for modern beauty & luxury care"
          text="SalonPro blends elegance, innovation, and professional service to create a seamless salon experience for both clients and business owners."
        />
      </section>

      {/* STORY + MISSION */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* STORY CARD */}
          <div className="group rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <HiSparkles className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Story</h3>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              SalonPro was created with a vision to redefine how modern salons operate.
              We combine **beauty expertise with smart management systems**, enabling
              seamless booking, customer handling, and service delivery.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              From luxury styling to personalized customer care, every experience
              is designed to reflect **premium quality, elegance, and efficiency**.
            </p>
          </div>

          {/* MISSION CARD */}
          <div className="group rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <HiUserGroup className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              Our mission is to build a complete salon ecosystem where **clients enjoy
              luxury services** and **salon owners manage operations effortlessly**.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We aim to empower salons with **technology-driven growth**, helping
              them scale, improve customer satisfaction, and increase revenue.
            </p>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 ">
          
          <div className="rounded-3xl bg-white p-6 text-center shadow-md">
            <h3 className="text-3xl font-bold text-rose-600">10K+</h3>
            <p className="mt-2 text-sm text-slate-600">Happy Clients</p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-md">
            <h3 className="text-3xl font-bold text-rose-600">25+</h3>
            <p className="mt-2 text-sm text-slate-600">Expert Stylists</p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-md">
            <h3 className="text-3xl font-bold text-rose-600">4.9★</h3>
            <p className="mt-2 text-sm text-slate-600">Client Rating</p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-md">
            <h3 className="text-3xl font-bold text-rose-600">5+</h3>
            <p className="mt-2 text-sm text-slate-600">Years Experience</p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Why Choose Us"
          title="What makes our salon experience different"
        />

        <div className="grid gap-6 md:grid-cols-3">
          
          <div className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-2xl">
            <HiSparkles className="text-3xl text-rose-600" />
            <h3 className="mt-4 text-xl font-bold">Premium Quality</h3>
            <p className="mt-2 text-slate-600">
              High-end services using top-quality products and modern techniques.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-2xl">
            <HiUserGroup className="text-3xl text-orange-600" />
            <h3 className="mt-4 text-xl font-bold">Expert Team</h3>
            <p className="mt-2 text-slate-600">
              Certified professionals with years of styling and beauty experience.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-2xl">
            <HiHeart className="text-3xl text-pink-600" />
            <h3 className="mt-4 text-xl font-bold">Customer First</h3>
            <p className="mt-2 text-slate-600">
              Personalized services focused on comfort, satisfaction, and trust.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}