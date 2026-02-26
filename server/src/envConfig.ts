import { literal, number, object, string, union } from "@badrap/valita";

const Schema = object({
  NODE_ENV: union(literal("production"), literal("development")),
  PORT: number().optional(() => 5000),
  REDDIT_CLIENTID: string(),
  REDDIT_CLIENT_SECRET: string(),
  REDDIT_USERAGENT: string(),
  REDDIT_REDIRECT_URI: string(),
});

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("process.env.PORT:", process.env.PORT);

const result = Schema.try(process.env, { mode: "strip" });

if (!result.ok) {
  console.log(result.message);
  process.exit(1);
}

export const env = result.value;
