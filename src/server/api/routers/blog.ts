import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const blogRouter = createTRPCRouter({
  createBlog: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = ctx.session.user.id;
        const { title, content, latitude, longitude } = input;
        const blog = await ctx.prisma.blog.create({
          data: {
            title,
            content,
            latitude,
            longitude,
            authorId: userId,
          },
        });

        return blog;
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "There was an error",
        });
      }
    }),

  getMarkers: publicProcedure.query(async ({ ctx }) => {
    try {
      const blogMarkers = await ctx.prisma.blog.findMany({
        select: { latitude: true, longitude: true, id: true, title: true },
      });
      return blogMarkers;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "There was an error",
      });
    }
  }),
});
