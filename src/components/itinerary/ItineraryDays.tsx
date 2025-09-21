import RichDayCard from "@/components/itinerary/RichDayCard";
import SimpleDayCard from "@/components/itinerary/SimpleDayCard";
import { MapPin } from "lucide-react";

type ItineraryDaysProps = {
  useRich: boolean;
  richData: Array<any>;
  itinerary: any;
  location: string;
};

export default function ItineraryDays({
  useRich,
  richData,
  itinerary,
  location,
}: ItineraryDaysProps) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-orange-600" />
        Detailed Itinerary
      </h2>
      <div className="space-y-5">
        {useRich ? (
          richData.map((item: any, idx: number) => (
            <RichDayCard key={item.day} item={item} location={location} delay={idx * 0.05} />
          ))
        ) : (
          (itinerary?.days ?? []).map((day: any, idx: number) => (
            <SimpleDayCard
              key={day.dayNumber}
              dayNumber={day.dayNumber}
              title={day.title}
              description={day.description}
              location={location}
              delay={idx * 0.05}
            />
          ))
        )}

        {!useRich && (!itinerary || itinerary.days.length === 0) && (
          <div className="text-center text-muted-foreground">
            Itinerary will be available soon.
          </div>
        )}
      </div>
    </>
  );
}
