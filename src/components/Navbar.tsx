import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Menu, Mountain, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Mountain className="h-8 w-8 text-orange-500 mr-2" />
            <span className="text-xl font-bold text-white">Himalayan Adventures</span>
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
          >
            <div className="flex flex-col space-y-4">
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
