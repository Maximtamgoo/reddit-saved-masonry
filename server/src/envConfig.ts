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

const env = Schema.parse(process.env, { mode: "strip" }) as Readonly<Infer<typeof Schema>>;
console.log("env.NODE_ENV:", env.NODE_ENV);
export { env };
