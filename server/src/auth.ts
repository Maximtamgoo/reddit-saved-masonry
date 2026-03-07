import { betterAuth } from "better-auth";
import { env } from "./envConfig.js";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  socialProviders: {
    reddit: {
      clientId: env.REDDIT_CLIENT_ID,
      clientSecret: env.REDDIT_CLIENT_SECRET,
      duration: "permanent",
      scope: ["identity", "history", "save"],
    },
  },
});
