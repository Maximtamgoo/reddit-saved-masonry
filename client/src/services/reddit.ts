import HttpError from "@src/utils/HttpError";
import { Listing } from "@src/schema/Listing";
import { object, string, type Type } from "@badrap/valita";
import { getSession } from "./auth";

type Options<T> = RequestInit & { schema: Type<T> };

async function request<T>(url: string, options: Options<T>) {
  const res = await fetch(url, options);
  if (!res.ok) throw new HttpError(res.status, res.statusText);
  return options.schema.parse(await res.json(), { mode: "strip" });
}

export async function getMe() {
  const { access_token } = await getSession();
  return await request("https://oauth.reddit.com/api/v1/me", {
    headers: { Authorization: `Bearer ${access_token}` },
    schema: object({ name: string(), icon_img: string() }),
  });
}

export async function getSavedContent(username: string, after: string, limit = 50) {
  const { access_token } = await getSession();
  const url = `https://oauth.reddit.com/user/${username}/saved?after=${after}&limit=${limit}&sr_detail=1&raw_json=1`;
  return await request(url, {
    headers: { Authorization: `Bearer ${access_token}` },
    schema: Listing,
  });
}

export async function toggleBookmark(id: string, state: boolean) {
  const { access_token } = await getSession();
  return await request(`https://oauth.reddit.com/api/${state ? "save" : "unsave"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
    body: `id=${id}`,
    schema: object({}),
  });
}
