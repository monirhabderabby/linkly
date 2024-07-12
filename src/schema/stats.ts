import { differenceInDays } from "date-fns";
import { z } from "zod";

export const statsQuerySchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((args) => {
    const { from, to } = args;

    const days = differenceInDays(to, from);
    const isValidRange = days >= 0 && days <= 365;

    return isValidRange;
  });
