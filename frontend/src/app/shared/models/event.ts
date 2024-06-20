import { z } from 'zod';

export const UrlExportableEventSchema = z.object({
    /** title */
    t: z.string(),
    /** placeId */
    l: z.string(),
    /** placeName */
    p: z.string(),
    /** start time */
    s: z.coerce.number().min(0).max(1440),
    /** end time */
    e: z.coerce.number().min(0).max(1440),
    /** image url */
    i: z.string(),
    /** notes */
    n: z.string(),
});

export type UrlExportableEvent = z.infer<typeof UrlExportableEventSchema>;

export class SimpleEvent {
    constructor(
        public title: string,
        public placeId: string,
        public placeName: string,
        public startTime: number,
        public endTime: number,
        public imgUrl: string,
        public notes: string,
    ) {}

    toUrlExportableEvent(): UrlExportableEvent {
        return {
            t: this.title,
            l: this.placeId,
            p: this.placeName,
            s: this.startTime,
            e: this.endTime,
            i: this.imgUrl,
            n: this.notes,
        };
    }
}

export class Event extends SimpleEvent {
    constructor(
        title: string,
        placeId: string,
        placeName: string,
        startTime: number,
        endTime: number,
        imgUrl: string,
        notes: string,

        public id: number,
        public placeRouteUrl: string,
    ) {
        super(title, placeId, placeName, startTime, endTime, imgUrl, notes);
    }
}
