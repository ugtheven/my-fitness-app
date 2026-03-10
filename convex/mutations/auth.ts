import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { generateSessionToken, hashPassword, verifyPassword } from "../auth";

export const signUp = mutation({
  args: { fullName: v.string(), email: v.string(), password: v.string() },
  handler: async (ctx, { fullName, email, password }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) throw new Error("Cet email est déjà utilisé.");

    const passwordHash = await hashPassword(password);
    const userId = await ctx.db.insert("users", {
      fullName,
      email,
      passwordHash,
      createdAt: Date.now(),
    });

    const token = generateSessionToken();
    await ctx.db.insert("sessions", { userId, token, createdAt: Date.now() });

    return { token };
  },
});

export const signIn = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, { email, password }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (!user) throw new Error("Email ou mot de passe incorrect.");

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) throw new Error("Email ou mot de passe incorrect.");

    const token = generateSessionToken();
    await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      createdAt: Date.now(),
    });

    return { token };
  },
});
