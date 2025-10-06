import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  // Close menu on escape and lock body scroll when menu is open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    // lock body scroll when menu open
    document.body.classList.toggle("overflow-hidden", isMenuOpen);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-0">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo - Positioned in absolute corner */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute top-2 left-4 cursor-pointer z-10"
            onClick={() => navigate("/")}
          >
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/3e4ba243-1be0-424c-a7c9-04f4caccbfef"
              alt="Off Beat Himalaya Logo"
              className="h-20 w-20 lg:h-24 lg:w-24 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200"
              onClick={() => scrollToSection('#home')}
            >
              Home
            </button>
            <button
              className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200"
              onClick={() => scrollToSection('#treks')}
            >
              Treks
            </button>
            <button
              className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200"
              onClick={() => scrollToSection('#about')}
            >
              About
            </button>
            <button
              className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200"
              onClick={() => scrollToSection('#contact')}
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden pr-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/50 backdrop-blur-md rounded-lg mt-2 p-4"
            id="mobile-menu"
          >
            <div className="flex flex-col space-y-3">
              <button
                className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200 text-left"
                onClick={() => scrollToSection('#home')}
              >
                Home
              </button>
              <button
                className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200 text-left"
                onClick={() => scrollToSection('#treks')}
              >
                Treks
              </button>
              <button
                className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200 text-left"
                onClick={() => scrollToSection('#about')}
              >
                About
              </button>
              <button
                className="px-4 py-2 rounded-full bg-white/90 text-gray-900 border border-black/10 hover:bg-white shadow-sm transition-colors duration-200 text-left"
                onClick={() => scrollToSection('#contact')}
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}