import { z } from "zod";

export const unused = z.string().describe(
  `This lib is currently not used as we use drizzle-zod for simple schemas
   But as your application grows and you need other validators to share
   with back and frontend, you can put them in here
  `,
);

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
