"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendContactEmail = action({
  args: {
    name: v.string(),
    email: v.string(),
    address: v.optional(v.string()),
    message: v.string(),
    toEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set. Add it in Integrations > Resend.");
    }

    const resend = new Resend(apiKey);

    const subject = `New Contact Message from ${args.name}`;
    const text = [
      `You have a new contact submission from Off Beat Himalaya:`,
      ``,
      `Name: ${args.name}`,
      `Email: ${args.email}`,
      `Address: ${args.address ?? "N/A"}`,
      ``,
      `Message:`,
      `${args.message}`,
    ].join("\n");

    const html = `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5; color:#111;">
        <h2 style="margin:0 0 12px;">New Contact Message</h2>
        <p style="margin:0 0 8px;">You have a new contact submission from Off Beat Himalaya.</p>
        <div style="margin:16px 0; padding:12px; background:#f6f6f6; border-radius:8px;">
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${args.name}</p>
          <p style="margin:0 0 6px;"><strong>Email:</strong> ${args.email}</p>
          <p style="margin:0 0 6px;"><strong>Address:</strong> ${args.address ?? "N/A"}</p>
        </div>
        <div style="margin-top:12px;">
          <p style="margin:0 0 6px;"><strong>Message:</strong></p>
          <p style="white-space:pre-wrap; margin:0;">${args.message}</p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Off Beat Himalaya <onboarding@resend.dev>",
      to: [args.toEmail],
      subject,
      text,
      html,
    });

    if (error) {
      throw new Error(`Resend error: ${error.message ?? "Unknown error"}`);
    }

    return { ok: true };
  },
});
