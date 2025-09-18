import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPinned } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function ItineraryPage() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const trek = useQuery(api.treks.getTrekById, id ? { id: id as any } : "skip" as any);
  const itinerary = useQuery(api.itineraries.getByTrekId, trek?._id ? { trekId: trek._id } : "skip" as any);

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinned className="h-4 w-4" />
            {trek.location}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative overflow-hidden rounded-xl border">
            <img
              src={trek.image}
              alt={trek.name}
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {trek.name} — Itinerary
              </h1>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4">
          {(itinerary?.days ?? []).map((day) => (
            <motion.div
              key={day.dayNumber}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold">
                      {day.dayNumber}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{day.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
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
      </div>
    </div>
  );
}
