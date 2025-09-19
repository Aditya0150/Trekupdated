import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPinned, Calendar, Mountain, IndianRupee, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import BookingDialog from "@/components/BookingDialog";

export default function ItineraryPage() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const trek = useQuery(api.treks.getTrekById, id ? { id: id as any } : "skip" as any);
  const itinerary = useQuery(api.itineraries.getByTrekId, trek?._id ? { trekId: trek._id } : "skip" as any);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Add animation variants for cards and bullet rows
  const dayCardVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const bulletVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0 },
  };

  if (trek === undefined || itinerary === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading itinerary...</span>
        </div>
      </div>
    );
  }

  if (!trek) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Trek not found.</p>
          <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.01_85)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinned className="h-4 w-4" />
            {trek.location}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
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
        </motion.div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            onClick={() => setIsBookingOpen(true)}
          >
            Book Now
          </Button>
          <div className="text-sm text-muted-foreground sm:ml-2">
            Difficulty: <span className="font-medium text-foreground">{trek.difficulty}</span>
          </div>
        </div>

        {/* About Section — polished split layout like reference */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
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
        </motion.div>

        {/* Detailed Itinerary — card style updated to match reference */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm">⛰</span>
            Detailed Itinerary
          </h2>
          <div className="space-y-5">
            {(itinerary?.days ?? []).map((day, idx) => (
              <motion.div
                key={day.dayNumber}
                variants={dayCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className="group relative overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50/60 to-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-100/60 blur-0" />
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-b from-orange-500 to-red-600 text-white flex items-center justify-center font-extrabold shadow-md ring-2 ring-white/70 shrink-0">
                        {day.dayNumber}
                      </div>
                      <div className="min-w-0 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-lg md:text-xl font-semibold text-foreground">
                            {day.title}
                          </h3>
                          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 border border-orange-100 px-3 py-1 text-xs font-medium">
                            {trek.location}
                          </div>
                        </div>
                        <ul className="mt-3 space-y-2">
                          <motion.li
                            className="flex items-start gap-2 text-sm leading-relaxed"
                            variants={bulletVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                          >
                            <span className="mt-1 text-orange-600">
                              <ArrowRight className="h-4 w-4" />
                            </span>
                            <span className="flex-1 bg-orange-50/50 rounded-lg px-3 py-2 border border-orange-100 text-muted-foreground">
                              {day.description}
                            </span>
                          </motion.li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {(!itinerary || itinerary.days.length === 0) && (
              <div className="text-center text-muted-foreground">
                Itinerary will be available soon.
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">Inclusions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Accommodation: camps/guesthouses",
              "Meals: veg breakfast & dinner",
              "Transportation: base pick-up & drop",
            ].map((item, i) => (
              <Card key={i} className="bg-[oklch(1_0_0)] border rounded-xl">
                <CardContent className="p-4 text-sm font-medium text-foreground">{item}</CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">Essentials To Carry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Warm jacket, cap, gloves",
              "Trekking shoes (good grip & waterproof)",
              "Raincoat, backpack, 2L water bottle",
            ].map((item, i) => (
              <Card key={i} className="bg-[oklch(1_0_0)] border rounded-xl">
                <CardContent className="p-4 text-sm font-medium text-foreground">{item}</CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Card className="border rounded-2xl bg-white">
            <CardContent className="p-6 md:p-8 flex flex-col items-center gap-4">
              <div className="text-xl md:text-2xl font-bold">
                Price: <span className="text-orange-600">₹{trek.price.toLocaleString()}</span>
              </div>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                onClick={() => setIsBookingOpen(true)}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BookingDialog trek={trek} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}