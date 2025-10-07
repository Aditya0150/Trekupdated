import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface BookingDialogProps {
  trek: Doc<"treks">;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDialog({ trek, isOpen, onClose }: BookingDialogProps) {
  const createBooking = useMutation(api.bookings.createBooking);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    participants: 1,
    preferredDate: "",
    message: "",
  });

  // Accessible IDs for modal labelling
  const titleId = `booking-${trek._id}-title`;
  const descId = `booking-${trek._id}-description`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createBooking({
        trekId: trek._id,
        ...formData,
      });

      toast.success("Booking request submitted successfully!", {
        description: "We'll contact you soon to confirm your adventure.",
      });

      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        participants: 1,
        preferredDate: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to submit booking request", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <motion.div
          key={isOpen ? "open" : "closed"}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <DialogHeader>
            <DialogTitle id={titleId} className="text-xl font-bold">Book Your Adventure</DialogTitle>
            <DialogDescription id={descId}>
              Reserve your spot for <span className="font-semibold text-orange-600">{trek.name}</span>
            </DialogDescription>
          </DialogHeader>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
            aria-busy={isLoading}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="participants">Participants</Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.participants}
                  onChange={(e) => handleInputChange("participants", parseInt(e.target.value))}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="preferredDate">Preferred Start Date *</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                placeholder="Any special requirements or questions..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Cost:</span>
                <span className="text-xl font-bold text-orange-600">
                  ₹{(trek.price * formData.participants).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {formData.participants} participant(s) × ₹{trek.price.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.08 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Booking"
                )}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}