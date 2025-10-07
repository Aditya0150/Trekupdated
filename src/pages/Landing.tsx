import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TreksSection from "@/components/TreksSection";

export default function Landing() {

  return (
    <div className="min-h-screen relative">
      {/* Background video layer */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/DSC_4495.mp4" type="video/mp4" />
        </video>
      </div>

      <Navbar />
      <HeroSection />
      <AboutSection />
      <TreksSection />
      <ContactSection />
      <Footer />
    </div>
  );
}