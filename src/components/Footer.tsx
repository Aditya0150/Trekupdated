import { motion } from "framer-motion";
import { Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Popular Treks": [
      { name: "Auli and Niti Winter Expedition", href: "#treks" },
      { name: "Kuari Pass", href: "#treks" },
      { name: "Kedarkantha", href: "#treks" },
    ],
    "Quick Links": [
      { name: "About Us", href: "#about" },
      { name: "All Treks", href: "#treks" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8126417109",
      href: "tel:+918126417109",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@himalayan-adventures.com",
      href: "mailto:info@himalayan-adventures.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Uttarakhand, India",
      href: null,
    },
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/offbeat_himalaya?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", 
      label: "Instagram" 
    },
    { 
      icon: MessageCircle, 
      href: "https://wa.me/918126417109", 
      label: "WhatsApp" 
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="Himalayan Adventures Logo"
                className="h-20 w-20 object-contain mr-4 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent leading-tight">
                  Himalayan Adventures
                </h3>
                <p className="text-sm text-gray-400 mt-1.5">Off Beat Himalaya</p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300 max-w-lg text-base leading-relaxed"
            >
              Discover the true heart of the Himalayas with our expertly guided treks.
              Creating unforgettable adventures while respecting nature and local communities.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => (
                info.href ? (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors duration-300">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm leading-tight">{info.value}</span>
                  </a>
                ) : (
                  <div
                    key={index}
                    className="flex items-center space-x-4 text-gray-300"
                  >
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm leading-tight">{info.value}</span>
                  </div>
                )
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex space-x-4 pt-2"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative">
                <h3 className="text-lg font-bold text-white tracking-wide mb-1">{title}</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
              </div>
              <ul className="space-y-4">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex} className="group">
                    <a
                      href={link.href}
                      className="flex items-center text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-orange-500 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 inline-block transform transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-gray-400 text-sm text-center md:text-left leading-relaxed">
            © {currentYear} Himalayan Adventures. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 md:gap-8">
            <a 
              href="#privacy" 
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300 hover:underline whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300 hover:underline whitespace-nowrap"
            >
              Terms of Service
            </a>
            <a 
              href="#cookies" 
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300 hover:underline whitespace-nowrap"
            >
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}