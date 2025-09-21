import { Card, CardContent } from "@/components/ui/card";

export default function Essentials() {
  const items: Array<string> = [
    "Warm jacket, cap, gloves",
    "Trekking shoes (good grip & waterproof)",
    "Raincoat, backpack, 2L water bottle",
  ];
  return (
    <>
      <h3 className="text-xl md:text-2xl font-bold mb-4">Essentials To Carry</h3>
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
