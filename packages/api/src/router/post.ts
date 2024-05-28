import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { CreatePostSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

// export const postRouter = {
//   all: publicProcedure.query(({ ctx }) => {
//     // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
//     return ctx.db.query.Post.findMany({
//       orderBy: desc(Post.id),
//       limit: 10,
//     });
//   }),

//   byId: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .query(({ ctx, input }) => {
//       // return ctx.db
//       //   .select()
//       //   .from(schema.post)
//       //   .where(eq(schema.post.id, input.id));

//       return ctx.db.query.Post.findFirst({
//         where: eq(Post.id, input.id),
//       });
//     }),

//   create: protectedProcedure
//     .input(CreatePostSchema)
//     .mutation(({ ctx, input }) => {
//       return ctx.db.insert(Post).values(input);
//     }),

//   delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
//     return ctx.db.delete(Post).where(eq(Post.id, input));
//   }),
// } satisfies TRPCRouterRecord;

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.post.delete({ where: { id: input } });
  }),
});
