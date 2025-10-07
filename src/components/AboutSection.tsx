import { motion } from "framer-motion";
import { Award, Heart, Mountain, Users } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: Mountain, label: "Unique Himalayan Adventures", value: "Discover hidden trails away from the crowds." },
    { icon: Users, label: "Experienced Local Guides", value: "Certified experts ensuring a safe and immersive trek." },
    { icon: Award, label: "Custom Trekking Plans", value: "From weekend getaways to high-altitude expeditions." },
    { icon: Heart, label: "Sustainable Travel", value: "Eco-friendly tourism supporting local communities." },
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-5 md:mb-6">
              About Off Beat Himalaya
            </h2>

            <p className="text-base sm:text-lg text-gray-600 mb-5 md:mb-6">
              Explore the untouched beauty of Uttarakhand with us!
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Who We Are</h3>
            <p className="text-base sm:text-lg text-gray-600 mb-5 md:mb-6">
              At Off Beat Himalaya, we take you beyond the usual tourist trails into the heart of the Himalayas. Our goal is to offer authentic trekking experiences that connect you with nature, local culture, and breathtaking landscapes. Whether you're a seasoned trekker or an adventure enthusiast, we ensure a journey filled with unforgettable moments.
            </p>

            <p className="text-base sm:text-lg text-gray-600 mb-5 md:mb-6">
              From the snowy peaks of Kedarkantha and the blooming Valley of Flowers, to the sacred trails of Gaumukh Tapovan and Satopanth, Off Beat Himalaya curates unforgettable journeys across the Himalayas.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Choose Us?</h3>
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <stat.icon className="h-8 w-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/WhatsApp Image 2025-10-04 at 12.17.48_5e13dd1f.jpg"
                alt="Trekking in snow"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Certified Guides</div>
                  <div className="text-sm text-gray-600">Professional & Experienced</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}