import { object, string, type Infer } from "@badrap/valita";

const Schema = object({
  PORT: string().map(Number),
  COOKIE_SECRET: string(),
  REDDIT_CLIENT_ID: string(),
  REDDIT_CLIENT_SECRET: string(),
  REDDIT_USERAGENT: string(),
  REDDIT_REDIRECT_URI: string(),
  SERVE_STATIC: string()
    .map((v) => v === "true")
    .optional(() => true),
});

const result = Schema.try(process.env, { mode: "strip" });
if (!result.ok) {
  console.error(result.message);
  process.exit(1);
}

export const env = result.value as Readonly<Infer<typeof Schema>>;
