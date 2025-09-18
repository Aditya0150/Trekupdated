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
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TreksSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}