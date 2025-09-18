import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllTreks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("treks").collect();
  },
});

export const getFeaturedTreks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("treks")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getTrekById = query({
  args: { id: v.id("treks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createTrek = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    altitude: v.string(),
    duration: v.string(),
    difficulty: v.string(),
    price: v.number(),
    image: v.string(),
    featured: v.optional(v.boolean()),
    location: v.string(),
    highlights: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("treks", args);
  },
});

export const updateImages = mutation({
  args: {},
  handler: async (ctx) => {
    // Map trek name to the correct image URL
    const mapping: Record<string, string> = {
      "Valley of Flowers": "https://harmless-tapir-303.convex.cloud/api/storage/1ef5d76b-4648-4297-a0bf-6f4f64f41c4a",
      "Kedarnath Trek": "https://harmless-tapir-303.convex.cloud/api/storage/c2e2808b-b4a0-4865-ad33-4a9d6a64b934",
      "Roopkund Trek": "https://harmless-tapir-303.convex.cloud/api/storage/d2d066ba-483a-4535-8371-b4c2d848c21a",
      "Har Ki Dun": "https://harmless-tapir-303.convex.cloud/api/storage/e0af7db7-f107-4599-a953-902df559cd86",
      "Kuari Pass": "https://harmless-tapir-303.convex.cloud/api/storage/1fe4d1c9-1b59-452d-a0f0-a70bd6fb36e2",
      "Kedarkantha": "https://harmless-tapir-303.convex.cloud/api/storage/858a3d3f-128a-47c8-8c7d-a3235ebb537c",
    };

    let updated = 0;
    const treks = await ctx.db.query("treks").collect();
    for (const trek of treks) {
      const url = mapping[trek.name];
      if (url && trek.image !== url) {
        await ctx.db.patch(trek._id, { image: url });
        updated++;
      }
    }
    return { updated };
  },
});