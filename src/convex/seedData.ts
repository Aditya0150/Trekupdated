import { mutation } from "./_generated/server";

export const seedTreks = mutation({
  args: {},
  handler: async (ctx) => {
    const treks = [
      {
        name: "Valley of Flowers",
        description: "Embark on a mesmerizing journey through the Valley of Flowers, where vibrant alpine blooms create a breathtaking natural tapestry set against towering Himalayan peaks. This UNESCO World Heritage site offers an unforgettable experience of nature's finest artistry.",
        altitude: "3,658 m",
        duration: "6 days",
        difficulty: "Moderate",
        price: 15000,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        featured: true,
        location: "Uttarakhand, India",
        highlights: ["UNESCO World Heritage Site", "Alpine Flowers", "Himalayan Views", "Photography Paradise"]
      },
      {
        name: "Kedarnath Trek",
        description: "A spiritual journey to one of the most sacred Shiva temples in the Himalayas. Experience divine energy amidst snow-capped peaks and pristine mountain landscapes.",
        altitude: "3,583 m",
        duration: "5 days",
        difficulty: "Moderate",
        price: 12000,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        featured: true,
        location: "Uttarakhand, India",
        highlights: ["Sacred Temple", "Spiritual Experience", "Mountain Views", "Cultural Heritage"]
      },
      {
        name: "Roopkund Trek",
        description: "A high-altitude Himalayan trek that takes you to Roopkund, a glacial lake shrouded in mystery and legends. Famous for its ancient human skeletons, this trail offers breathtaking views of snow-capped peaks and alpine meadows.",
        altitude: "3,892 m",
        duration: "8 days",
        difficulty: "Challenging",
        price: 18000,
        image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=800&h=600&fit=crop",
        featured: true,
        location: "Uttarakhand, India",
        highlights: ["Mystery Lake", "Ancient Skeletons", "High Altitude", "Adventure Challenge"]
      },
      {
        name: "Har Ki Dun",
        description: "Discover the enchanting Valley of Gods, where lush meadows, dense forests, and ancient villages unfold against the backdrop of the majestic Swargarohini peaks.",
        altitude: "3,566 m",
        duration: "7 days",
        difficulty: "Easy to Moderate",
        price: 14000,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        featured: false,
        location: "Uttarakhand, India",
        highlights: ["Valley of Gods", "Ancient Villages", "Swargarohini Views", "Cultural Experience"]
      },
      {
        name: "Kuari Pass",
        description: "Experience the famed Kuari Pass trek, offering sweeping panoramic views of India's most iconic peaks, including Nanda Devi and Dronagiri.",
        altitude: "4,265 m",
        duration: "6 days",
        difficulty: "Moderate",
        price: 16000,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
        featured: false,
        location: "Uttarakhand, India",
        highlights: ["Panoramic Views", "Nanda Devi", "Dronagiri Peak", "Mountain Photography"]
      },
      {
        name: "Kedarkantha",
        description: "Embark on the Kedarkantha winter trek, perfect for first-time trekkers. With snow-covered forests and 360-degree summit views, this adventure suits all skill levels.",
        altitude: "3,800 m",
        duration: "5 days",
        difficulty: "Easy",
        price: 11000,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
        featured: false,
        location: "Uttarakhand, India",
        highlights: ["Winter Trek", "Snow Forests", "360° Views", "Beginner Friendly"]
      }
    ];

    for (const trek of treks) {
      await ctx.db.insert("treks", trek);
    }

    return { success: true, count: treks.length };
  },
});
