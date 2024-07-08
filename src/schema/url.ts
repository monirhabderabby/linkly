import * as z from "zod";

export const createUrlSchema = z.object({
  original_url: z.string(),
  short_url: z.string(),
  name: z.string().optional(),
});

export type createUrlSchemaType = z.infer<typeof createUrlSchema>;
