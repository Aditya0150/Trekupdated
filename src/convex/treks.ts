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
