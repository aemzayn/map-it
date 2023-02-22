import z from "zod";

export const blogInputSchema = z.object({
  title: z.string(),
  content: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export type Blog = z.TypeOf<typeof blogInputSchema> & {
  id: number;
  authorId: string;
  createdAt: Date;
};
