import SectionTitle from "../../components/common/SectionTitle";

// 👇 import images
import g1 from "../../assets/images/bd.jpg";
import g2 from "../../assets/images/hairstyle.jpg";
import g3 from "../../assets/images/mk.jpg";
import b1 from "../../assets/images/haircut.jpg";
import b2 from "../../assets/images/beard.jpg";
import b3 from "../../assets/images/fadecut.jpg";
import b4 from "../../assets/images/groom.jpg";
import salon from "../../assets/images/bs.jpg";

export default function Gallery() {
  const items = [
    { img: g1, title: "Bridal Makeup" },
    { img: g2, title: "Hair Styling" },
    { img: g3, title: "Party Look" },
    { img: b1, title: "Men Haircut" },
    { img: b2, title: "Beard Styling" },
    { img: b3, title: "Fade Cut" },
    { img: b4, title: "Grooming" },
    { img: salon, title: "Salon Interior" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        tag="Gallery"
        title="Salon ambience and beauty transformations"
        text="A preview of our styling quality, makeup work, client transformations, and interior experience."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative h-64 overflow-hidden rounded-3xl shadow-md"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300" />

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}