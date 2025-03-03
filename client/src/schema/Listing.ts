import { type Infer, array, literal, number, object, string, union, unknown } from "@badrap/valita";
import { T1_COMMENT } from "./t1_comment";
import { T3_LINK } from "./t3_link";

export const ListingItem = union(T3_LINK, T1_COMMENT);

export type ListingItem = Infer<typeof ListingItem>;

const UnknownItem = object({
  kind: string(),
  data: object({
    name: string(),
  }).rest(unknown()),
});

export const Listing = object({
  kind: literal("Listing"),
  data: object({
    after: string().nullable(),
    before: string().nullable(),
    children: array(UnknownItem),
    dist: number(),
  }),
});
