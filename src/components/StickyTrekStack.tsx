import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Doc } from "@/convex/_generated/dataModel";
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
  children: React.ReactNode;
}) {
  // Each card scales down to a target as you scroll further
  const targetScale = Math.max(0.5, 1 - (total - i - 1) * 0.08);
  const rangeStart = i * 0.2;
  const rangeEnd = 1;

  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);
  const y = useTransform(progress, [rangeStart, rangeEnd], [0, -i * 24]);

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
      className="relative mx-auto w-full max-w-4xl py-[35vh]"
      aria-label="Stacked trek cards"
    >
      {treks.map((trek, i) => (
        <StickyItem
          key={trek._id}
          i={i}
          total={treks.length}
          progress={scrollYProgress}
        >
          <TrekCard
            trek={trek}
            onBook={onBook}
            className="shadow-2xl"
            // Ensure full width within the stack and a clean background
            style={{
              width: "100%",
              maxWidth: "100%",
              backgroundColor: "white",
            }}
          />
        </StickyItem>
      ))}
    </main>
  );
}
