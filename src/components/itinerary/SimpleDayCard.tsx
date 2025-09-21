import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SimpleDayCard({
  dayNumber,
  title,
  description,
  location,
  delay = 0,
}: {
  dayNumber: number;
  title: string;
  description: string;
  location: string;
  delay?: number;
}) {
  const dayCardVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const bulletVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={dayCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
    >
      <Card className="group relative overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50/60 to-white shadow-sm hover:shadow-md transition-shadow">
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-100/60 blur-0" />
        <CardContent className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-b from-orange-500 to-red-600 text-white flex items-center justify-center font-extrabold shadow-md ring-2 ring-white/70 shrink-0">
              {dayNumber}
            </div>
            <div className="min-w-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 border border-orange-100 px-3 py-1 text-xs font-medium">
                  {location}
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
                    {description}
                  </span>
                </motion.li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
