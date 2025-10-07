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
        image: "/Valley of Flower.png",
        featured: true,
        location: "Uttarakhand, India",
        highlights: ["UNESCO World Heritage Site", "Alpine Flowers", "Himalayan Views", "Photography Paradise"]
      },
      
      {
        name: "Roopkund Trek",
        description: "A high-altitude Himalayan trek that takes you to Roopkund, a glacial lake shrouded in mystery and legends. Famous for its ancient human skeletons, this trail offers breathtaking views of snow-capped peaks and alpine meadows.",
        altitude: "3,892 m",
        duration: "8 days",
        difficulty: "Challenging",
        price: 18000,
        image: "/Roopkund.jpg",
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
        image: "/Har Ki Dun.png",
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
        price: 6999,
        image: "/Kuari Pass.png",
        featured: false,
        location: "Uttarakhand, India",
        highlights: ["Panoramic Views", "Nanda Devi", "Dronagiri Peak", "Mountain Photography"]
      },
      {
        name: "Auli and Niti Winter Expedition",
        description: "Auli is known as the Mini Switzerland of India and offers one of Asia's longest ski slopes with breathtaking views of Nanda Devi and other Himalayan peaks. On this 4-night, 5-day winter expedition, you not only experience skiing and snow adventures in Auli but also travel deep into the snow-clad Niti Valley, one of India's last villages near the Tibet border. Niti, at 3,600 meters, is home to the ancient Bhotiya tribe, preserving centuries-old Indo-Tibetan culture and traditions. Driving through frozen rivers, pine forests, and high-altitude roads, you'll witness landscapes that feel untouched and magical. This journey is not just about adventure but also about exploring heritage, culture, and the hidden beauty of Uttarakhand's winter wonderland.",
        altitude: "3,600 m",
        duration: "5 days",
        difficulty: "Moderate",
        price: 18500,
        image: "/Niti.PNG",
        featured: true,
        location: "Uttarakhand, India",
        highlights: ["Skiing in Auli", "Niti Valley Exploration", "Bhotiya Culture", "Frozen Landscapes", "Himalayan Wildlife"]
      }
    ];

    for (const trek of treks) {
      await ctx.db.insert("treks", trek);
    }

    return { success: true, count: treks.length };
  },
});

export const seedItineraries = mutation({
  args: {},
  handler: async (ctx) => {
    const allTreks = await ctx.db.query("treks").collect();

    // Build simple demo itineraries for each trek if not present
    let count = 0;
    for (const trek of allTreks) {
      const existing = await ctx.db
        .query("itineraries")
        .withIndex("by_trek", (q) => q.eq("trekId", trek._id))
        .unique()
        .catch(() => null);

      if (existing) continue;

      let days;
      if (trek.name === "Auli and Niti Winter Expedition") {
        days = [
          {
            dayNumber: 1,
            title: "Rishikesh to Auli",
            description: "Will cover Panch Prayag and Dhari Devi Temple. It will be 7-8 Hr Drive.",
          },
          {
            dayNumber: 2,
            title: "Auli Explore and Winter Acclimatisation",
            description: "Auli Explore and winter acclimatisation. Hike to Gorson round way 6 Km. Witness the Majestic Nanda Devi with the best view of grand peaks like Dronagiri, Hathi Ghoda, Brahmal, Neelgiri and many more.",
          },
          {
            dayNumber: 3,
            title: "Move to Niti Village Explore Malari, Sumna, Tapovan Day",
            description: "Explore Malari, Sumna, Tapovan. Will travel in heavy SUV and 4x4 vehicle. We will explore the trans Himalayan region and frozen waterfalls and river beds. Will spot Himalayan Wildlife such as That, Blue sheep and Snow leopard. Then we will go to Sumna and witness Grand Canyon of India. Visit View point for place from where lord Hanuman lifted Sanjeevni for Lord Lakshman during epic battle of Ramayana.",
          },
          {
            dayNumber: 4,
            title: "Niti Village to Niti Mahadev then to Damarsien stay at NITI / GHAMSALI",
            description: "We will visit frozen Shiva temple. Hike up to Payaar it will be 4 km hike round way. A wide valley as Janskar will be sight return to Auli.",
          },
          {
            dayNumber: 5,
            title: "Departure",
            description: "Travel to home with lots of memories.",
          },
        ];
      } else {
        days = [
          {
            dayNumber: 1,
            title: `Arrival & Briefing`,
            description:
              `Arrive at base. Meet guides, safety briefing, and acclimatization walk around ${trek.location}.`,
          },
          {
            dayNumber: 2,
            title: `Trail Start`,
            description:
              `Start trekking. Gentle ascent through forests/meadows. Overnight in camp/guesthouse.`,
          },
          {
            dayNumber: 3,
            title: `Summit/Primary Viewpoint`,
            description:
              `Reach the key viewpoint/spot for ${trek.name}. Panoramic Himalayan vistas and photography.`,
          },
          {
            dayNumber: 4,
            title: `Return & Departure`,
            description:
              `Descend back to base. Debrief, certificates, and departure.`,
          },
        ];
      }

      await ctx.db.insert("itineraries", { trekId: trek._id, days });
      count++;
    }

    return { success: true, count };
  },
});