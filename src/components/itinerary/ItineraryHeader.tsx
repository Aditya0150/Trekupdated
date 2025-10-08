import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Mountain, Calendar, IndianRupee } from "lucide-react";

export default function ItineraryHeader({ trek }: { trek: any }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white">
      <AspectRatio ratio={16 / 9} className="relative">
        <img
          src={trek.image}
          alt={trek.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow">
            {trek.name} — {trek.duration}
          </h1>
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium">
              <Mountain className="h-4 w-4 text-orange-600" />
              {trek.altitude}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium">
              <Calendar className="h-4 w-4 text-orange-600" />
              {trek.duration}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold">
              <IndianRupee className="h-4 w-4 text-orange-600" />
              ₹{trek.price.toLocaleString()}
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}