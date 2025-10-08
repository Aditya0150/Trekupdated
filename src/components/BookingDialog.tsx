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
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Trek } from "./TrekCard";

interface BookingDialogProps {
  trek: Trek;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDialog({ trek, isOpen, onClose }: BookingDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    participants: 1,
    preferredDate: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Calculate total cost
      const totalCost = trek.price * formData.participants;

      // Construct WhatsApp message
      const whatsappMessage = `New Booking Request

Trek: ${trek.name}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Participants: ${formData.participants}
Preferred Date: ${formData.preferredDate}
Message: ${formData.message || 'No additional message'}

Total Cost: ₹${totalCost.toLocaleString()}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Create WhatsApp URL (replace with your actual WhatsApp number)
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918126417109&text=${encodedMessage}`;

      // Try to open in new tab first
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // If popup was blocked or failed, use direct navigation as fallback
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }

      toast.success("Redirecting to WhatsApp!", {
        description: "",
        style: {
          color: "black",
          background: "white",
        },
      });

      // Close dialog and reset form after a short delay
      setTimeout(() => {
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          participants: 1,
          preferredDate: "",
          message: "",
        });
      }, 500);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to prepare booking request", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white border-2 border-orange-100 shadow-2xl p-8">
        <DialogHeader className="pb-8">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            Book Your Adventure
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Reserve your spot for <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">{trek.name}</span>
          </DialogDescription>
        </DialogHeader>

        <motion.div
          key={isOpen ? "open" : "closed"}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
            aria-busy={isLoading}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  disabled={isLoading}
                  autoFocus
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="+91 1234567890"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="participants" className="text-sm font-medium text-gray-700">
                  Participants
                </Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.participants}
                  onChange={(e) => handleInputChange("participants", parseInt(e.target.value) || 1)}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700">
                Preferred Start Date *
              </Label>
              <Input
                id="preferredDate"
                type="date"
                min={today}
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Additional Message
              </Label>
              <Textarea
                id="message"
                placeholder="Any special requirements or questions..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                disabled={isLoading}
                rows={4}
                className="mt-1 resize-none"
              />
            </div>

            <motion.div
              className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-lg border border-orange-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Total Cost:</span>
                <span className="text-2xl font-bold text-orange-600">
                  ₹{(trek.price * formData.participants).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {formData.participants} participant{formData.participants > 1 ? 's' : ''} × ₹{trek.price.toLocaleString('en-IN')}
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
                className="flex-1 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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