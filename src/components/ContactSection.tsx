import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function ContactSection() {
  const createContact = useMutation(api.contacts.createContact);
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
      await createContact(formData);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", address: "", message: "" });
    } catch (error) {
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
      value: "info@himalayan-adventures.com",
      href: "mailto:info@himalayan-adventures.com",
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
      className="py-20 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden"
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              {" "}Adventure
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to embark on your Himalayan journey? Get in touch and let's plan your perfect adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-gray-300 mb-8">
                We're here to help you plan your Himalayan adventure. Reach out to us 
                for personalized trek recommendations, group bookings, or any questions 
                about our expeditions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  whileHover={{ scale: 1.05 }}
                  className="block"
                >
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                          <info.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{info.label}</div>
                          <div className="text-sm text-gray-300">{info.value}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
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
                    <div>
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

                  <div>
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

                  <div>
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
