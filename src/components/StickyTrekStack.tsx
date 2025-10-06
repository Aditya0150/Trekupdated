import { Doc } from "@/convex/_generated/dataModel";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import TrekCard from "./TrekCard";

type StickyTrekStackProps = {
  treks: Doc<"treks">[];
  onBook: (trek: Doc<"treks">) => void;
};

function StickyItem({
  i,
  total,
  progress,
  children,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  // Segment the scroll range per card so each shows fully before the next begins
  const step = 1 / total;
  const rangeStart = i * step;
  const rangeEnd = (i + 1) * step;

  // Keep scale subtle; ensure each card remains readable
  const targetScale = Math.max(0.88, 1 - (i + 1) * 0.04);
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);

  // Slight vertical shift only within its segment
  const y = useTransform(progress, [rangeStart, rangeEnd], [0, -16]);

  return (
    <motion.div
      style={{ scale, y }}
      className="sticky top-24 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default function StickyTrekStack({ treks, onBook }: StickyTrekStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={containerRef}
      className="relative mx-auto w-full max-w-4xl py-[18vh]"
      aria-label="Stacked trek cards"
    >
      {treks.map((trek, i) => (
        // Add per-card scroll space so the full details are visible before next card advances
        <div key={trek._id} className={"relative " + (i === treks.length - 1 ? "h-[100vh]" : "h-[120vh]")}>
          <StickyItem
            i={i}
            total={treks.length}
            progress={scrollYProgress}
          >
            <TrekCard
              trek={trek}
              onBook={onBook}
              className="shadow-2xl mx-auto"
              // Make stacked cards slightly narrower for a compact look
              style={{
                width: "94%",
                maxWidth: "700px",
                backgroundColor: "white",
              }}
            />
          </StickyItem>
        </div>
      ))}
    </main>
  );
}