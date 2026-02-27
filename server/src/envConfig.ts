import { literal, object, string, union, type Infer } from "@badrap/valita";

const Schema = object({
  NODE_ENV: union(literal("production"), literal("development")),
  PORT: string(),
  REDDIT_CLIENTID: string(),
  REDDIT_CLIENT_SECRET: string(),
  REDDIT_USERAGENT: string(),
  REDDIT_REDIRECT_URI: string(),

  HTTPS_KEY: string().optional(),
  HTTPS_CERT: string().optional(),
});

const result = Schema.try(process.env, { mode: "strip" });

if (!result.ok) {
  console.log(result.message);
  process.exit(1);
}

export const env = result.value as Readonly<Infer<typeof Schema>>;
