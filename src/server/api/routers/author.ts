import { TRPCError } from "@trpc/server";
import { authorInputSchema } from "../../../schema/author.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authorRouter = createTRPCRouter({
  getAuthor: publicProcedure
    .input(authorInputSchema)
    .query(({ ctx, input }) => {
      try {
        const author = ctx.prisma.user.findFirst({
          where: { id: input.authorId },
          select: {
            id: true,
            name: true,
            image: true,
          },
        });
        return author;
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Failed request" });
      }
    }),
});
