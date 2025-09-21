import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPinned, Route, Clock, Home, TreePine, Mountain } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import BookingDialog from "@/components/BookingDialog";
import ItineraryHeader from "@/components/itinerary/ItineraryHeader";
import AboutTrek from "@/components/itinerary/AboutTrek";
import ItineraryDays from "@/components/itinerary/ItineraryDays";
import Inclusions from "@/components/itinerary/Inclusions";
import Essentials from "@/components/itinerary/Essentials";
import PriceCard from "@/components/itinerary/PriceCard";

export default function ItineraryPage() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const trek = useQuery(api.treks.getTrekById, id ? { id: id as any } : "skip" as any);
  const itinerary = useQuery(api.itineraries.getByTrekId, trek?._id ? { trekId: trek._id } : "skip" as any);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Add rich itinerary data for Valley of Flowers with icons and bullets
  const richItineraryData = [
    {
      day: 1,
      title: "Rishikesh to Joshimath",
      subtitle: "Journey to the Gateway",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Distance", value: "255 km" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "9–10 hours" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Joshimath" },
      ],
      bullets: [
        "Start early (around 5:00 AM)",
        "Scenic drive through confluences",
        "Devprayag → Rudraprayag → Karnaprayag",
        "Stay in hotel/guesthouse",
      ],
    },
    {
      day: 2,
      title: "Joshimath → Poolna → Ghangaria",
      subtitle: "Trek Begins",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Drive", value: "38 km (1.5 hrs)" },
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "9 km (~5–6 hrs)" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Ghangaria" },
      ],
      bullets: ["Trek through forest & river paths", "Reach basecamp at Ghangaria"],
    },
    {
      day: 3,
      title: "Valley of Flowers Exploration",
      subtitle: "The Main Attraction",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Distance", value: "7.5 km round trip" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "6 hours" },
        { icon: <TreePine className="h-4 w-4 text-orange-600" />, label: "Altitude", value: "11,500 ft" },
      ],
      bullets: [
        "Wildflower meadows in full bloom",
        "Rare Himalayan flora and fauna",
        "Breathtaking mountain views",
      ],
    },
    {
      day: 4,
      title: "Ghangaria → Poolna → Joshimath",
      subtitle: "Return Journey",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "9 km" },
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Drive", value: "1.5 hours" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Joshimath" },
      ],
      bullets: ["Return to base, overnight stay"],
    },
    {
      day: 5,
      title: "Joshimath to Rishikesh",
      subtitle: "Journey Ends",
      details: [],
      bullets: ["Return drive to Rishikesh", "Memories of an unforgettable Himalayan trek"],
    },
  ];

  // New: Rich itinerary for Kedarkantha (6 days)
  const richKedarkanthaData = [
    {
      day: 1,
      title: "Dehradun to Sankri",
      subtitle: "Trek Base Arrival",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Distance", value: "200 km" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "10 hrs" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Sankri Guesthouse" },
      ],
      bullets: [
        "Drive through scenic Himalayan terrain",
        "Reach Sankri by evening",
      ],
    },
    {
      day: 2,
      title: "Sankri to Juda Ka Talab",
      subtitle: "Trek Begins",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "4 km (4 hrs)" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Juda Ka Talab Camp" },
      ],
      bullets: [
        "Snowy pine forests and frozen lake",
        "Overnight camp under the stars",
      ],
    },
    {
      day: 3,
      title: "Juda Ka Talab to Kedarkantha Base",
      subtitle: "Alpine Wonderland",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "4 km (3 hrs)" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Base Camp" },
      ],
      bullets: [
        "Snowy trails and open meadows",
        "Spectacular views of Swargarohini",
      ],
    },
    {
      day: 4,
      title: "Kedarkantha Summit → Base → Sankri",
      subtitle: "Summit Day",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Summit", value: "12,500 ft" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Total Trek", value: "12 km" },
      ],
      bullets: [
        "Early morning summit climb",
        "360° Himalayan views from top",
        "Descend back to Sankri",
      ],
    },
    {
      day: 5,
      title: "Buffer/Contingency Day",
      subtitle: "Weather Flexibility",
      details: [],
      bullets: [
        "Extra day to accommodate delays or snowfall",
        "Used only if required",
      ],
    },
    {
      day: 6,
      title: "Sankri to Dehradun",
      subtitle: "Return Journey",
      details: [],
      bullets: ["Drive back to Dehradun with unforgettable memories"],
    },
  ];

  // Add: Rich itinerary for Har Ki Dun (7 days)
  const richHarKiDunData = [
    {
      day: 1,
      title: "Dehradun to Sankri",
      subtitle: "The Drive to the Base Camp",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Distance", value: "210 km" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "9–10 hours" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Guesthouse in Sankri" },
      ],
      bullets: [
        "Scenic drive through Mussoorie and Yamuna Valley",
        "Evening briefing and rest at Sankri (6,400 ft)",
      ],
    },
    {
      day: 2,
      title: "Sankri to Taluka (Drive), then trek to Seema",
      subtitle: "The Trek Begins",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Drive", value: "12 km" },
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "10 km (~5-6 hrs)" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Campsite at Seema" },
      ],
      bullets: [
        "Drive to Taluka and start trek through dense forests",
        "Cross streams and wooden bridges en route",
      ],
    },
    {
      day: 3,
      title: "Seema to Har Ki Dun",
      subtitle: "The Iconic Valley",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "11 km (~6 hrs)" },
        { icon: <TreePine className="h-4 w-4 text-orange-600" />, label: "Altitude", value: "11,700 ft" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Campsite at Har Ki Dun" },
      ],
      bullets: [
        "Gradual climb with views of Swargarohini & Jaundhar glacier",
        "Camp beside the river with a view of the valley",
      ],
    },
    {
      day: 4,
      title: "Har Ki Dun Exploration Day",
      subtitle: "Rest, Explore, Enjoy",
      details: [
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Activities", value: "Exploration & Acclimatization" },
        { icon: <MapPin className="h-4 w-4 text-orange-600" />, label: "Nearby", value: "Maninda Tal, Jaundhar Glacier" },
      ],
      bullets: [
        "Optional hike to Maninda Tal or just enjoy meadow walks",
        "Photography, story sharing around bonfire",
      ],
    },
    {
      day: 5,
      title: "Har Ki Dun to Seema",
      subtitle: "Return Journey Begins",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "11 km (~5 hrs)" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Campsite at Seema" },
      ],
      bullets: [
        "Retrace steps along the valley",
        "Spotting birds and wildlife",
      ],
    },
    {
      day: 6,
      title: "Seema to Taluka (Trek) → Sankri (Drive)",
      subtitle: "Back to Base",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "10 km" },
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Drive", value: "12 km" },
      ],
      bullets: [
        "Return trek to Taluka",
        "Drive back to Sankri for overnight stay",
      ],
    },
    {
      day: 7,
      title: "Sankri to Dehradun",
      subtitle: "Departure Day",
      details: [],
      bullets: [
        "Early morning drive back to Dehradun",
        "End of a memorable Himalayan adventure",
      ],
    },
  ];

  // Add: Rich itinerary for Kuari Pass (6 days)
  const richKuariPassData = [
    {
      day: 1,
      title: "Rishikesh to Joshimath",
      subtitle: "Base Arrival",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Distance", value: "255 km" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "9–10 hrs" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Joshimath" },
      ],
      bullets: [
        "Drive along Alaknanda river",
        "Stay in hotel/guesthouse",
      ],
    },
    {
      day: 2,
      title: "Joshimath to Dhak → Gulling",
      subtitle: "Trek Begins",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Drive", value: "12 km" },
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "5 km (3–4 hrs)" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Camp at Gulling" },
      ],
      bullets: [
        "Oak forests and village trails",
        "First views of Dronagiri peak",
      ],
    },
    {
      day: 3,
      title: "Gulling to Tali Forest Camp",
      subtitle: "Deep Forest Trail",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "6 km (5 hrs)" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Tali Forest Camp" },
      ],
      bullets: [
        "Walk through dense mixed forests",
        "Camp surrounded by alpine trees",
      ],
    },
    {
      day: 4,
      title: "Tali → Kuari Pass Summit → Tali",
      subtitle: "Summit Day",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "12 km round trip" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "7 hrs" },
      ],
      bullets: [
        "Summit Kuari Pass (12,516 ft)",
        "Stunning view of Himalayan giants",
      ],
    },
    {
      day: 5,
      title: "Tali to Joshimath via Dhak",
      subtitle: "Descent & Transfer",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "11 km" },
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Drive", value: "12 km" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Joshimath" },
      ],
      bullets: [
        "Final descent to base village",
        "Drive back to Joshimath",
      ],
    },
    {
      day: 6,
      title: "Joshimath to Rishikesh",
      subtitle: "Return Drive",
      details: [],
      bullets: [
        "Trip concludes with cherished mountain moments",
      ],
    },
  ];

  // Add: Rich itinerary for Roopkund Trek (8 days)
  const richRoopkundData = [
    {
      day: 1,
      title: "Rishikesh to Lohajung",
      subtitle: "Scenic Himalayan Drive",
      details: [
        { icon: <Route className="h-4 w-4 text-orange-600" />, label: "Distance", value: "270 km" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "10 hrs" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Lohajung" },
      ],
      bullets: ["Beautiful drive via Devprayag, Karnaprayag", "Stay in Lohajung homestay"],
    },
    {
      day: 2,
      title: "Lohajung to Didna",
      subtitle: "Trek Begins",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "7 km" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "5 hrs" },
        { icon: <Home className="h-4 w-4 text-orange-600" />, label: "Stay", value: "Didna village" },
      ],
      bullets: ["Moderate climb", "Through dense forests and rivers"],
    },
    {
      day: 3,
      title: "Didna to Bedni Bugyal",
      subtitle: "Meadow Views",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "11 km" },
        { icon: <TreePine className="h-4 w-4 text-orange-600" />, label: "Altitude", value: "11,500 ft" },
      ],
      bullets: ["Alpine meadows, views of Trishul", "Camp overnight"],
    },
    {
      day: 4,
      title: "Bedni to Bhagwabasa",
      subtitle: "High Altitude Trek",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Trek", value: "10 km" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "7 hrs" },
      ],
      bullets: ["Cross Patar Nachauni & Kalu Vinayak", "Camp at Bhagwabasa"],
    },
    {
      day: 5,
      title: "Bhagwabasa to Roopkund & Back",
      subtitle: "Summit Day",
      details: [
        { icon: <Mountain className="h-4 w-4 text-orange-600" />, label: "Altitude", value: "16,000 ft" },
        { icon: <Clock className="h-4 w-4 text-orange-600" />, label: "Duration", value: "7-8 hrs" },
      ],
      bullets: ["Reach Roopkund Lake", "Return to Patar Nachauni"],
    },
    {
      day: 6,
      title: "Return to Lohajung",
      subtitle: "Long Descent",
      details: [],
      bullets: ["Same route descent", "Stay in Lohajung"],
    },
    {
      day: 7,
      title: "Buffer Day",
      subtitle: "Weather Contingency",
      details: [],
      bullets: ["Used in case of delays", "Otherwise explore Lohajung"],
    },
    {
      day: 8,
      title: "Lohajung to Rishikesh",
      subtitle: "Journey Ends",
      details: [],
      bullets: ["Final drive back", "Reach by evening"],
    },
  ];

  // Determine if we should use a rich itinerary and select the correct data
  const useRich =
    trek?.name === "Valley of Flowers" ||
    trek?.name === "Kedarkantha" ||
    trek?.name === "Har Ki Dun" ||
    trek?.name === "Kuari Pass" ||
    trek?.name === "Roopkund Trek";

  const richData =
    trek?.name === "Kedarkantha"
      ? richKedarkanthaData
      : trek?.name === "Har Ki Dun"
      ? richHarKiDunData
      : trek?.name === "Kuari Pass"
      ? richKuariPassData
      : trek?.name === "Roopkund Trek"
      ? richRoopkundData
      : richItineraryData;

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
          <ItineraryHeader trek={trek} />
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
          <AboutTrek trek={trek} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <ItineraryDays
            useRich={useRich}
            richData={richData as any}
            itinerary={itinerary as any}
            location={trek.location}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Inclusions />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Essentials />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <PriceCard
            price={trek.price}
            onBook={() => setIsBookingOpen(true)}
          />
        </motion.div>
      </div>

      <BookingDialog trek={trek} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}