import { motion } from "framer-motion";
import { Award, Users, Mountain, Heart } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: Mountain, label: "Treks Completed", value: "500+" },
    { icon: Users, label: "Happy Adventurers", value: "2000+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Heart, label: "Safety Record", value: "100%" },
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6">
              Your Gateway to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                {" "}Adventure
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-5 md:mb-6">
              For over 15 years, we've been guiding adventurers through the most spectacular 
              landscapes of the Himalayas. Our experienced team combines deep local knowledge 
              with international safety standards to create unforgettable experiences.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
              From gentle valley walks to challenging high-altitude expeditions, we offer 
              carefully crafted journeys that respect both the environment and local communities. 
              Every trek is an opportunity to discover not just breathtaking landscapes, but also 
              your own inner strength.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
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
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=800&fit=crop"
                alt="Mountain adventure"
                className="w-full h-[500px] object-cover"
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