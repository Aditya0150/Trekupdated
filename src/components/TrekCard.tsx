import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Clock, TrendingUp, Users } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useNavigate } from "react-router";

interface TrekCardProps {
  trek: Doc<"treks">;
  onBook: (trek: Doc<"treks">) => void;
}

export default function TrekCard({ trek, onBook }: TrekCardProps) {
  const navigate = useNavigate();
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'challenging':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl h-full flex flex-col">
        <div className="relative">
          <img
            src={trek.image}
            alt={trek.name}
            className="w-full h-40 sm:h-48 md:h-56 object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className={`${getDifficultyColor(trek.difficulty)} text-white`}>
              {trek.difficulty}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-black/70 text-white">
              ₹{trek.price.toLocaleString()}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 md:p-6 flex-grow">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{trek.name}</h3>
          
          <div className="flex items-center gap-3 md:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{trek.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{trek.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Altitude: {trek.altitude}</span>
          </div>

          <p className="text-gray-700 text-sm md:text-base mb-4 line-clamp-3">
            {trek.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {trek.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-5 md:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 w-full">
            <Button
              onClick={() => onBook(trek)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              Book Now
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/treks/${trek._id}/itinerary`)}
              className="w-full"
            >
              Show Itinerary
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}