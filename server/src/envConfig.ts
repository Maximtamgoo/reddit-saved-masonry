import { literal, object, string, union, type Infer } from "@badrap/valita";

const Schema = object({
  NODE_ENV: union(literal("production"), literal("development")),
  COOKIE_SECRET: string(),
  PORT: string().map((v) => Number(v)),
  REDDIT_CLIENT_ID: string(),
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
const env = result.value as Readonly<Infer<typeof Schema>>;
console.log("env.NODE_ENV:", env.NODE_ENV);
export { env };
