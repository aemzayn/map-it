import z from "zod";

export const authorInputSchema = z.object({
  authorId: z.string(),
});
