import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { useState } from "react";
import BookingDialog from "./BookingDialog";
import StickyTrekStack from "./StickyTrekStack";
import TrekCard from "./TrekCard";
import treksData from "../data/treks.json";

const allTreks: Doc<"treks">[] = treksData.map((trek, index) => ({
  ...trek,
  _id: `trek-${index}` as any,
  _creationTime: Date.now() + index,
}));

export default function TreksSection() {
  const [selectedTrek, setSelectedTrek] = useState<Doc<"treks"> | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookTrek = (trek: Doc<"treks">) => {
    setSelectedTrek(trek);
    setIsBookingOpen(true);
  };

  return (
    <section id="treks" className="py-16 md:py-20 bg-[oklch(0.98_0.01_85)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Treks</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Embark on extraordinary journeys through the world's most spectacular mountain landscapes
          </p>
        </motion.div>

        {/* Desktop: Stacked scroll cards */}
        <div className="hidden md:block">
          <StickyTrekStack treks={allTreks} onBook={handleBookTrek} />
        </div>

        {/* Mobile: Original grid layout */}
        <div className="grid md:hidden grid-cols-1 gap-6 place-items-center [grid-auto-rows:1fr]">
          {allTreks.map((trek, index) => (
            <motion.div
              key={trek._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full w-full max-w-xl mx-auto"
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