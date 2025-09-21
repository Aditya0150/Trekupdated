import { Card, CardContent } from "@/components/ui/card";

export default function Inclusions() {
  const items: Array<string> = [
    "Accommodation: camps/guesthouses",
    "Meals: veg breakfast & dinner",
    "Transportation: base pick-up & drop",
  ];
  return (
    <>
      <h3 className="text-xl md:text-2xl font-bold mb-4">Inclusions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <Card key={i} className="bg-[oklch(1_0_0)] border rounded-xl">
            <CardContent className="p-4 text-sm font-medium text-foreground">{item}</CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
