import { v } from "convex/values";
import { query } from "../_generated/server";

export const getCurrentUser = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .unique();

    if (!session) return null;

    const user = await ctx.db.get(session.userId);
    if (!user) return null;

    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    };
  },
});
