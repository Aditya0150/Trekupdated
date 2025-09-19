import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

function Character({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  // Horizontal slide-in toward center while scrolling through the section
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  // Subtle 3D tilt effect
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  // Slight fade-in
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  return (
    <motion.span
      className={cn("inline-block text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-orange-500 select-none", isSpace && "w-3 md:w-4")}
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

export default function TextScroll() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "center center"] });

  const text = "See More From The Himalayas";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <section
      aria-label="Scroll Text Animation"
      className="relative bg-[oklch(0.98_0.01_85)]"
    >
      <div
        ref={targetRef}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex items-center justify-center"
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
