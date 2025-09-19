import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPinned, Calendar, Mountain, IndianRupee } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import BookingDialog from "@/components/BookingDialog";

export default function ItineraryPage() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const trek = useQuery(api.treks.getTrekById, id ? { id: id as any } : "skip" as any);
  const itinerary = useQuery(api.itineraries.getByTrekId, trek?._id ? { trekId: trek._id } : "skip" as any);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
            Detailed Itinerary
          </h2>
          <div className="space-y-5">
            {(itinerary?.days ?? []).map((day) => (
              <motion.div
                key={day.dayNumber}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border rounded-2xl bg-white">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-b from-orange-500 to-red-600 text-white flex items-center justify-center font-bold shrink-0">
                        {day.dayNumber}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold text-foreground">
                          {day.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {day.description}
                        </p>
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