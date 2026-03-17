import HttpError from "@src/utils/HttpError";
import { refreshAccessToken } from "./api";
import { Listing } from "@src/schema/Listing";
import { object, string, ValitaError, type Type } from "@badrap/valita";

const getCookieValue = async (name: string) => (await window.cookieStore.get(name))?.value;

type Options<T> = RequestInit & { schema: Type<T> };

async function request<T>(url: string, options: Options<T>) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new HttpError(res.status, res.statusText);
    return options.schema.parse(await res.json(), { mode: "strip" });
  } catch (error) {
    if (error instanceof ValitaError) throw error;
    await refreshAccessToken();
    throw error;
  }
}

export async function getMe() {
  const access_token = await getCookieValue("access_token");
  return await request("https://oauth.reddit.com/api/v1/me", {
    headers: { Authorization: `Bearer ${access_token}` },
    schema: object({ name: string(), icon_img: string() }),
  });
}

export async function getSavedContent(username: string, after: string, limit = 50) {
  const access_token = await getCookieValue("access_token");
  const url = `https://oauth.reddit.com/user/${username}/saved?after=${after}&limit=${limit}&sr_detail=1&raw_json=1`;
  return await request(url, {
    headers: { Authorization: `Bearer ${access_token}` },
    schema: Listing,
  });
}

export async function toggleBookmark(id: string, state: boolean) {
  const access_token = await getCookieValue("access_token");
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
