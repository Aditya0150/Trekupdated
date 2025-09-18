import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByTrekId = query({
  args: { trekId: v.id("treks") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("itineraries")
      .withIndex("by_trek", (q) => q.eq("trekId", args.trekId))
      .unique();
  },
});

export const createItinerary = mutation({
  args: {
    trekId: v.id("treks"),
    days: v.array(
      v.object({
        dayNumber: v.number(),
        title: v.string(),
        description: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("itineraries", args);
  },
});
