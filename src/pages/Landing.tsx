import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TreksSection from "@/components/TreksSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Landing() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white"
        >
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading your adventure...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background image layer */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
      >
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Navbar />
      <HeroSection />
      <TreksSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}