import HttpError from "@src/utils/HttpError";
import * as auth from "./auth";
import { Listing } from "@src/schema/Listing";
import { object } from "@badrap/valita";

export async function getSavedContent(after: string, limit = 50) {
  const access_token = await auth.getAccessToken();
  const url = `https://oauth.reddit.com/user/${auth.username}/saved?after=${after}&limit=${limit}&sr_detail=1&raw_json=1`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!res.ok) throw new HttpError(res.status, res.statusText);
  return Listing.parse(await res.json(), { mode: "strip" });
}

export async function toggleBookmark(id: string, state: boolean) {
  const access_token = await auth.getAccessToken();
  const res = await fetch(`https://oauth.reddit.com/api/${state ? "save" : "unsave"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
    body: `id=${id}`,
  });
  if (!res.ok) throw new HttpError(res.status, res.statusText);
  return object({}).parse(await res.json());
}
