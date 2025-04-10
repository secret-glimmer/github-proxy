import { z } from "zod";
import { GithubUserOrder, GithubUserSort } from "../types/index.js";

export const searchUsersSchema = z.object({
  query: z.object({
    q: z.string().min(1, "Search query is required"),
    sort: z
      .enum([
        GithubUserSort.FOLLOWERS,
        GithubUserSort.REPOSITORIES,
        GithubUserSort.JOINED,
      ])
      .optional(),
    order: z
      .enum([GithubUserOrder.ASC, GithubUserOrder.DESC])
      .optional()
      .default(GithubUserOrder.DESC),
    per_page: z
      .string()
      .transform(Number)
      .pipe(z.number().int().min(1).max(100))
      .optional()
      .default("30"),
    page: z
      .string()
      .transform(Number)
      .pipe(z.number().int().min(1))
      .optional()
      .default("1"),
  }),
});
