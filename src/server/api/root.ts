import { createTRPCRouter } from "./trpc";
import { blogRouter } from "./routers/blog";

export const appRouter = createTRPCRouter({
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
