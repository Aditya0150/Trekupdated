import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TrekCard from "./TrekCard";
import BookingDialog from "./BookingDialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import StickyTrekStack from "./StickyTrekStack";

export default function TreksSection() {
  const treks = useQuery(api.treks.getAllTreks);
  const [selectedTrek, setSelectedTrek] = useState<Doc<"treks"> | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookTrek = (trek: Doc<"treks">) => {
    setSelectedTrek(trek);
    setIsBookingOpen(true);
  };

  if (!treks) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <section id="treks" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Treks</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Embark on extraordinary journeys through the world's most spectacular mountain landscapes
          </p>
        </motion.div>

        {/* Desktop: Stacked scroll cards */}
        <div className="hidden md:block">
          <StickyTrekStack treks={treks} onBook={handleBookTrek} />
        </div>

        {/* Mobile: Original grid layout */}
        <div className="grid md:hidden grid-cols-1 gap-6 items-stretch [grid-auto-rows:1fr]">
          {treks.map((trek, index) => (
            <motion.div
              key={trek._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <TrekCard trek={trek} onBook={handleBookTrek} />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedTrek && (
        <BookingDialog
          trek={selectedTrek}
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedTrek(null);
          }}
        />
      )}
    </section>
  );
}