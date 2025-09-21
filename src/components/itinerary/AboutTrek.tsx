import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import type { Doc } from "@/convex/_generated/dataModel";

export default function AboutTrek({ trek }: { trek: Doc<"treks"> }) {
  return (
    <Card className="border rounded-2xl bg-[oklch(0.99_0.01_85)]">
      <CardContent className="p-5 md:p-7">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm">!</span>
          About the {trek.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {trek.description}
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border bg-white p-4">
                <div className="text-xs uppercase text-muted-foreground">Altitude</div>
                <div className="mt-1 text-lg font-semibold">{trek.altitude}</div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="text-xs uppercase text-muted-foreground">Days Trek</div>
                <div className="mt-1 text-lg font-semibold">{trek.duration}</div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="text-xs uppercase text-muted-foreground">Highlights</div>
                <div className="mt-1 text-lg font-semibold">{trek.highlights.length}+</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border">
            <AspectRatio ratio={16 / 9}>
              <img
                src={trek.image}
                alt={trek.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
