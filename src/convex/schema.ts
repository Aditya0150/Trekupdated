import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Trek data
    treks: defineTable({
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
    }).index("by_featured", ["featured"]),

    // Bookings
    bookings: defineTable({
      userId: v.id("users"),
      trekId: v.id("treks"),
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      participants: v.number(),
      preferredDate: v.string(),
      message: v.optional(v.string()),
      status: v.string(), // "pending", "confirmed", "cancelled"
    }).index("by_user", ["userId"])
      .index("by_trek", ["trekId"])
      .index("by_status", ["status"]),

    // Contact messages
    contacts: defineTable({
      name: v.string(),
      email: v.string(),
      address: v.optional(v.string()),
      message: v.string(),
      status: v.string(), // "new", "replied", "closed"
    }).index("by_status", ["status"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;