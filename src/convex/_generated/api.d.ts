/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth_emailOtp from "../auth/emailOtp.js";
import type * as auth from "../auth.js";
import type * as bookings from "../bookings.js";
import type * as contacts from "../contacts.js";
import type * as email from "../email.js";
import type * as http from "../http.js";
import type * as itineraries from "../itineraries.js";
import type * as seedData from "../seedData.js";
import type * as treks from "../treks.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "auth/emailOtp": typeof auth_emailOtp;
  auth: typeof auth;
  bookings: typeof bookings;
  contacts: typeof contacts;
  email: typeof email;
  http: typeof http;
  itineraries: typeof itineraries;
  seedData: typeof seedData;
  treks: typeof treks;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
