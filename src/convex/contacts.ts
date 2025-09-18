import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    address: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", {
      ...args,
      status: "new",
    });
  },
});
