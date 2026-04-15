import { HiArrowRight, HiSparkles, HiStar, HiScissors } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import heroMain from "../../assets/images/bt3.jpg";
import craft1 from "../../assets/images/bt2.jpg";
import craft2 from "../../assets/images/bs.jpg";
import craft3 from "../../assets/images/bt4.jpg";
import gallery1 from "../../assets/images/hairstyle.jpg";
import gallery2 from "../../assets/images/mk.jpg";
import gallery3 from "../../assets/images/sc.jpg";
import gallery4 from "../../assets/images/bd.jpg";
import testimonial1 from "../../assets/images/craft-3.webp";
import testimonial2 from "../../assets/images/craft-3.webp";
import testimonial3 from "../../assets/images/craft-3.webp";

const pricingPlans = [
  {
    title: "Hair Services",
    price: "₹999",
    items: ["Hair Cut", "Hair Wash", "Blow Dry", "Styling"],
  },
  {
    title: "Nail & Beauty",
    price: "₹1499",
    items: ["Manicure", "Pedicure", "Nail Art", "Cleanup"],
  },
  {
    title: "Skin & Makeup",
    price: "₹2499",
    items: ["Facial", "Glow Care", "Party Makeup", "Cleanup"],
  },
  {
    title: "Special Package",
    price: "₹5999",
    items: ["Bridal Makeup", "Hair Styling", "Draping", "Touch Up"],
  },
];

const testimonials = [
  {
    name: "Olivia Mathew",
    role: "Client",
    image: testimonial1,
    text: "Absolutely loved the salon atmosphere and the level of service. The styling felt premium and the team was extremely professional.",
  },
  {
    name: "Ananya Sharma",
    role: "Bride Client",
    image: testimonial2,
    text: "My bridal makeup was flawless. Everything from booking to final service felt smooth, elegant, and highly professional.",
  },
  {
    name: "Priya Patel",
    role: "Regular Client",
    image: testimonial3,
    text: "The best salon experience I have had. The team is friendly, the service quality is excellent, and the place looks beautiful.",
  },
];

export default function Home() {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const particles = [
    { id: 1, x: 12, y: 18, size: 10, strength: 0.018 },
    { id: 2, x: 22, y: 72, size: 14, strength: 0.026 },
    { id: 3, x: 40, y: 22, size: 8, strength: 0.02 },
    { id: 4, x: 52, y: 68, size: 12, strength: 0.03 },
    { id: 5, x: 68, y: 16, size: 16, strength: 0.024 },
    { id: 6, x: 78, y: 52, size: 10, strength: 0.028 },
    { id: 7, x: 88, y: 28, size: 13, strength: 0.022 },
    { id: 8, x: 60, y: 84, size: 9, strength: 0.032 },
  ];

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-br from-amber-50/30 via-rose-50/50 to-orange-50/30 text-slate-900"
    >
      <motion.section
        style={{ y }}
        className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8"
      >
        <motion.div
          ref={sectionRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden rounded-[34px] border border-amber-200/30 bg-gradient-to-br from-white/80 to-amber-50/60 shadow-2xl backdrop-blur-sm"
        >
          <div className="pointer-events-none absolute inset-0">
            {particles.map((particle) => {
              const rect = sectionRef.current?.getBoundingClientRect();
              const centerX = rect ? rect.width / 2 : 0;
              const centerY = rect ? rect.height / 2 : 0;

              const offsetX = isInside
                ? (mousePosition.x - centerX) * particle.strength
                : 0;
              const offsetY = isInside
                ? (mousePosition.y - centerY) * particle.strength
                : 0;

              return (
                <motion.span
                  key={particle.id}
                  className="absolute rounded-full bg-amber-400/40 transition-transform duration-200 ease-out"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                    boxShadow: "0 0 18px rgba(245, 158, 11, 0.4)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: particle.id * 0.2,
                  }}
                />
              );
            })}

            <motion.div
              className="absolute rounded-full bg-amber-300/20 blur-3xl"
              style={{
                width: "220px",
                height: "220px",
                left: `${mousePosition.x - 110}px`,
                top: `${mousePosition.y - 110}px`,
                opacity: isInside ? 1 : 0,
              }}
              animate={{ scale: isInside ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 grid gap-10 px-6 py-8 lg:grid-cols-2 lg:px-10 lg:py-10">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Luxury Salon Experience
              </motion.p>

              <motion.h1
                className="mt-4 text-5xl font-bold leading-none text-slate-900 sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Glowence
              </motion.h1>

              <motion.div
                className="mt-4 flex items-center gap-3 text-slate-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                >
                  <HiSparkles className="text-xl text-amber-500" />
                </motion.div>
                <p className="text-lg">Where Beauty Meets Confidence</p>
              </motion.div>

              <motion.p
                className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                From hair to skin, our expert stylists and beauty professionals
                are here to deliver a luxurious and personalized salon
                experience with care, style, and confidence.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/booking"
                    className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl glow"
                  >
                    Book Appointment
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/services"
                    className="rounded-full border border-amber-200 bg-white/50 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-amber-50 hover:shadow-lg backdrop-blur-sm"
                  >
                    Explore Services
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-10 grid max-w-xl grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                {[
                  { value: "27K", label: "Happy Users" },
                  { value: "34K+", label: "Bookings" },
                  { value: "40%", label: "Repeat Clients" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-2xl glass p-4 shadow-lg backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    //transition={{ delay: 1.8 + index * 0.1 }}
                  >
                    <motion.h3
                      className="text-2xl font-bold text-slate-900"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2 + index * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="overflow-hidden rounded-[28px] bg-gradient-to-br from-amber-100 to-rose-100 p-4 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.img
                  src={heroMain}
                  alt="Salon Hero"
                  className="h-[580px] w-full rounded-[24px] object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </motion.div>

              <motion.div
                className="absolute left-[-12px] bottom-10 rounded-2xl glass p-5 shadow-2xl backdrop-blur-sm"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-2xl font-bold text-slate-900">27K</h4>
                <p className="text-sm text-slate-900">
                  Happy users from our expert stylists
                </p>
              </motion.div>

              {/* <motion.div
                className="absolute right-[-10px] top-10 rounded-2xl bg-emerald-600 px-5 py-4 text-white shadow-2xl"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm">34K+ Users</p>
              </motion.div> */}

              {/* <motion.div
                className="absolute right-8 bottom-[-12px] rounded-2xl bg-slate-800 px-5 py-4 text-white shadow-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.05 }}
                className="shimmer"
              > */}
                {/* <h4 className="text-xl font-bold">40% Off</h4>
                <p className="mt-1 text-xs text-slate-200">
                  For selected premium services this week
                </p> */}
              {/* </motion.div> */}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="rounded-[34px] bg-gradient-to-br from-slate-50 to-amber-50/30 px-6 py-12 shadow-xl"
          //whileHover={{ scale: 1.01 }}
          //transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our Craft
            </motion.p>
            <motion.h2
              className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Crafting Confidence & Style
            </motion.h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <motion.div
              className="rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              // whileHover={{ scale: 1.02 }}
            >
              <p className="max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                With a team of skilled stylists and beauty experts, we offer
                personalized services that bring out your natural glow. From
                refreshing haircuts to rejuvenating spa treatments, every detail
                is designed to give you a luxurious and relaxing experience.
              </p>

              <motion.button
                className="mt-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              className="overflow-hidden rounded-[28px] shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
              // whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={craft1}
                alt="Craft section"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr_0.8fr]">
            <motion.div
              className="overflow-hidden rounded-[28px] shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              //whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={craft2}
                alt="Salon styling"
                className="h-64 w-full object-cover"
              whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            <motion.div
              className="rounded-[28px] bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <ul className="space-y-4 text-sm leading-7 sm:text-base">
                {[
                  { icon: HiStar, text: "Expert stylists & therapists with years of experience" },
                  { icon: HiScissors, text: "Modern techniques blended with timeless elegance" },
                  { icon: HiSparkles, text: "A welcoming space built for comfort and self-care" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <item.icon className="mt-1 text-lg" />
                    </motion.div>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="overflow-hidden rounded-[28px] shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
              //whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={craft3}
                alt="Hair service"
                className="h-64 w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="rounded-[34px] glass p-8 shadow-2xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          //whileHover={{ scale: 1.01 }}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Gallery
          </motion.p>

          <motion.h2
            className="mt-4 text-4xl font-bold text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our work speaks for itself
          </motion.h2>

          <motion.div
            className="mt-8 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { img: gallery1, title: "Hair Styling" },
              { img: gallery2, title: "Makeup" },
              { img: gallery3, title: "Skin Care" },
              { img: gallery4, title: "Bridal Look" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                //whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

                <motion.p
                  className="mt-3 text-sm font-semibold text-slate-900"
                  whileHover={{ color: "#d97706" }}
                >
                  {item.title}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="rounded-[34px] glass p-8 shadow-2xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          //whileHover={{ scale: 1.01 }}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.p>
          <motion.h2
            className="mt-4 text-4xl font-bold text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            What our clients are saying
          </motion.h2>

          <motion.div
            className="mt-8 space-y-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                className="flex gap-4 rounded-2xl glass p-4 shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.0 }}
              >
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <motion.h3
                        className="font-bold text-slate-900"
                        whileHover={{ color: "#d97706" }}
                      >
                        {item.name}
                      </motion.h3>
                      <p className="text-sm text-slate-600">{item.role}</p>
                    </div>
                    <motion.span
                      className="text-amber-500"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      ★★★★★
                    </motion.span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="rounded-[34px] glass p-8 shadow-2xl backdrop-blur-sm"
          //whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Pricing
            </motion.p>
            <motion.h2
              className="mt-4 text-4xl font-bold text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our pricing & packages
            </motion.h2>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.title}
                className="rounded-[24px] glass p-6 shadow-xl backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
    
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <motion.h3
                  className="text-xl font-bold text-slate-900"
                  whileHover={{ color: "#d97706" }}
                >
                  {plan.title}
                </motion.h3>
                <motion.p
                  className="mt-3 text-3xl font-bold text-amber-600"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                >
                  {plan.price}
                </motion.p>

                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {plan.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 + itemIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="h-1.5 w-1.5 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: itemIndex * 0.2 }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-slate-800 hover:to-slate-700 hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Started</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <HiArrowRight />
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
