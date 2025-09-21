import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PriceCard({
  price,
  onBook,
}: {
  price: number;
  onBook: () => void;
}) {
  return (
    <Card className="border rounded-2xl bg-white">
      <CardContent className="p-6 md:p-8 flex flex-col items-center gap-4">
        <div className="text-xl md:text-2xl font-bold">
          Price: <span className="text-orange-600">₹{price.toLocaleString()}</span>
        </div>
        <Button
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
          onClick={onBook}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
