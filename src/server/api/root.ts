import { createTRPCRouter } from "./trpc";
import { blogRouter } from "./routers/blog";
import { authorRouter } from "./routers/author";

export const appRouter = createTRPCRouter({
  blog: blogRouter,
  author: authorRouter,
});

export type AppRouter = typeof appRouter;
