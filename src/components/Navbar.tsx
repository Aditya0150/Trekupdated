import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Menu, Mountain, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleAuthAction = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/3e4ba243-1be0-424c-a7c9-04f4caccbfef"
              alt="Off Beat Himalaya Logo"
              className="h-8 w-8 object-contain mr-2"
            />
            <span className="text-xl font-bold text-white">Off Beat Himalaya</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-orange-300 transition-colors">
              Home
            </a>
            <a href="#treks" className="text-white hover:text-orange-300 transition-colors">
              Treks
            </a>
            <a href="#about" className="text-white hover:text-orange-300 transition-colors">
              About
            </a>
            <a href="#contact" className="text-white hover:text-orange-300 transition-colors">
              Contact
            </a>
            
            <Button
              onClick={handleAuthAction}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              {isAuthenticated ? `Sign Out (${user?.name || 'User'})` : 'Sign In'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-white hover:text-orange-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#treks"
                className="text-white hover:text-orange-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Treks
              </a>
              <a
                href="#about"
                className="text-white hover:text-orange-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-white hover:text-orange-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button
                onClick={() => {
                  handleAuthAction();
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full"
              >
                {isAuthenticated ? `Sign Out (${user?.name || 'User'})` : 'Sign In'}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}