import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser } from "./users";

export const createBooking = mutation({
  args: {
    trekId: v.id("treks"),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    participants: v.number(),
    preferredDate: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    
    return await ctx.db.insert("bookings", {
      ...args,
      userId: user?._id || ("anonymous" as any),
      status: "pending",
    });
  },
});

export const getUserBookings = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    
    return await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});
