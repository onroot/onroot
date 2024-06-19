import { z } from 'zod';

export const eventSchema = z.object({
    /** title */
    t: z.string(),
    /** start time */
    s: z.coerce.number().min(0).max(1440),
    /** end time */
    e: z.coerce.number().min(0).max(1440),
    /** image url */
    i: z.string(),
    /** notes */
    n: z.string(),
});

export type Event = z.infer<typeof eventSchema>;
