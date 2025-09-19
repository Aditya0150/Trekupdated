import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
  // New: allow external styling and animation intensity
  className?: string;
  intensity?: number;
};

// Update Character to accept className + intensity for reuse
function Character({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
  intensity = 1,
}: CharacterProps) {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  // Use intensity multiplier for reuse
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50 * intensity, 0]);

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50 * intensity, 0],
  );

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  return (
    <motion.span
      className={cn(
        "inline-block text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-orange-500 select-none",
        isSpace && "w-3 md:w-4",
        className,
      )}
      style={{
        x,
        rotateX,
        opacity,
        transformOrigin: "center",
      }}
    >
      {char}
    </motion.span>
  );
}

// New reusable props for TextScroll
type TextScrollProps = {
  text?: string; // custom text
  sectionClassName?: string; // outer section styling
  containerClassName?: string; // inner container styling
  charClassName?: string; // per-character styling
  intensity?: number; // animation intensity multiplier
  // control scroll offset
  offsetStart?: string; // default "start end"
  offsetEnd?: string; // default "center center"
};

export default function TextScroll({
  text = "See More From The Himalayas",
  sectionClassName,
  containerClassName,
  charClassName,
  intensity = 1,
  offsetStart = "start end",
  offsetEnd = "center center",
}: TextScrollProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Cast to satisfy Framer Motion's narrow string union types for offsets
    offset: [offsetStart, offsetEnd] as any,
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <section
      aria-label="Scroll Text Animation"
      className={cn("relative bg-[oklch(0.98_0.01_85)]", sectionClassName)}
    >
      <div
        ref={targetRef}
        className={cn(
          "relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex items-center justify-center",
          containerClassName,
        )}
      >
        <div
          className="text-center"
          style={{ perspective: "600px" }}
        >
          <div className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            Scroll to reveal
          </div>
          <div className="leading-tight">
            {characters.map((char, index) => (
              <Character
                key={`${char}-${index}`}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
                className={charClassName}
                intensity={intensity}
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
            Discover treks, stories, and routes as you continue down the page.
          </p>
        </div>
      </div>
    </section>
  );
}