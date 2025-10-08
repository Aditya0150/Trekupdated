import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Construct WhatsApp message
      const whatsappMessage = `New Contact Message

Name: ${formData.name}
Email: ${formData.email}
Address: ${formData.address || 'Not provided'}
Message: ${formData.message}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Create WhatsApp URL
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918126417109&text=${encodedMessage}`;

      // Try to open in new tab first
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // If popup was blocked or failed, use direct navigation as fallback
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
        style: {
          color: "black",
          background: "white",

        },
      });
      setFormData({ name: "", email: "", address: "", message: "" });
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8126417109",
      href: "tel:+918126417109",
    },
    {
      icon: Mail,
      label: "Email",
      value: "Offbeathimalayaindia@gmail.com",
      href: "mailto:Offbeathimalayaindia@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Uttarakhand, India",
      href: "#",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/918126417109",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Mountain background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            Plan Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              {" "}Adventure
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to embark on your Himalayan journey? Get in touch and let's plan your perfect adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6">Get in Touch</h3>
              <p className="text-gray-300 mb-6 md:mb-8 text-sm sm:text-base">
                We're here to help you plan your Himalayan adventure. Reach out to us 
                for personalized trek recommendations, group bookings, or any questions 
                about our expeditions.
              </p>
            </div>

            <TooltipProvider>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 items-stretch">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    className="block h-full"
                  >
                    <Card className="h-full bg-white/10 border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:ring-1 hover:ring-white/20">
                      <CardContent className="p-5 md:p-6">
                        <div className="flex items-center gap-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center ring-1 ring-white/20">
                                <info.icon className="h-5 w-5 text-white" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              {info.label}
                            </TooltipContent>
                          </Tooltip>

                          <div className="min-w-0">
                            <Badge variant="secondary" className="bg-white/15 text-white border-white/20 mb-1">
                              {info.label}
                            </Badge>
                            <div className="text-xs sm:text-sm text-gray-200 truncate">
                              {info.value}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.a>
                ))}
              </div>
            </TooltipProvider>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 md:p-7">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-white">Name *</Label>
                      <Input
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-white">Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-address" className="text-white">Address</Label>
                    <Input
                      id="contact-address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={isLoading}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                      placeholder="Your location"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-white">Message *</Label>
                    <Textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      disabled={isLoading}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 min-h-[120px]"
                      placeholder="Tell us about your dream adventure..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}