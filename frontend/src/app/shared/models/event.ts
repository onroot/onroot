import { z } from 'zod';

export const UrlExportableEventSchema = z.object({
    /** title */
    t: z.string(),
    /** placeId */
    l: z.string().nullable().default(null),
    /** placeName */
    p: z.string().nullable().default(null),
    /** start time */
    s: z.coerce.number().min(0).max(1440).nullable().default(null),
    /** end time */
    e: z.coerce.number().min(0).max(1440).nullable().default(null),
    /** image url */
    i: z.string().nullable().default(null),
    /** notes */
    n: z.string().nullable().default(null),
});

export type UrlExportableEvent = z.infer<typeof UrlExportableEventSchema>;

export class SimpleEvent {
    public title: string;
    public placeId: string | null;
    public placeName: string | null;
    public startTime: number | null;
    public endTime: number | null;
    public imgUrl: string | null;
    public notes: string | null;

    constructor({
        title = 'Untitled',
        placeId = null,
        placeName = null,
        startTime = null,
        endTime = null,
        imgUrl = null,
        notes = null,
    }: {
        title: string;
        placeId?: string | null;
        placeName?: string | null;
        startTime?: number | null;
        endTime?: number | null;
        imgUrl?: string | null;
        notes?: string | null;
    }) {
        this.title = title;
        this.placeId = placeId;
        this.placeName = placeName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imgUrl = imgUrl;
        this.notes = notes;
    }

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

    static fromUrlExportableEvent(e: UrlExportableEvent): SimpleEvent {
        return new SimpleEvent({
            title: e.t,
            placeId: e.l,
            placeName: e.p,
            startTime: e.s,
            endTime: e.e,
            imgUrl: e.i,
            notes: e.n,
        });
    }
}

export class ExtendedEvent extends SimpleEvent {
    public id: number;
    public placeRouteUrl: string | null;

    constructor({
        title = 'Untitled',
        placeId = null,
        placeName = null,
        startTime = null,
        endTime = null,
        imgUrl = null,
        notes = null,
        id,
        placeRouteUrl = null,
    }: {
        title: string;
        placeId?: string | null;
        placeName?: string | null;
        startTime?: number | null;
        endTime?: number | null;
        imgUrl?: string | null;
        notes?: string | null;
        id: number;
        placeRouteUrl?: string | null;
    }) {
        super({ title, placeId, placeName, startTime, endTime, imgUrl, notes });
        this.id = id;
        this.placeRouteUrl = placeRouteUrl;
    }

    static fromSimpleEvent(
        simpleEvent: SimpleEvent,
        { id, placeRouteUrl = null }: { id: number; placeRouteUrl?: string | null },
    ): ExtendedEvent {
        return new ExtendedEvent({
            title: simpleEvent.title,
            placeId: simpleEvent.placeId,
            placeName: simpleEvent.placeName,
            startTime: simpleEvent.startTime,
            endTime: simpleEvent.endTime,
            imgUrl: simpleEvent.imgUrl,
            notes: simpleEvent.notes,
            id,
            placeRouteUrl,
        });
    }

    clone(): ExtendedEvent {
        return new ExtendedEvent({
            title: this.title,
            placeId: this.placeId,
            placeName: this.placeName,
            startTime: this.startTime,
            endTime: this.endTime,
            imgUrl: this.imgUrl,
            notes: this.notes,
            id: this.id,
            placeRouteUrl: this.placeRouteUrl,
        });
    }

    update({
        title,
        placeId,
        placeName,
        startTime,
        endTime,
        imgUrl,
        notes,
        id,
        placeRouteUrl,
    }: {
        title?: string;
        placeId?: string | null;
        placeName?: string | null;
        startTime?: number | null;
        endTime?: number | null;
        imgUrl?: string | null;
        notes?: string | null;
        id?: number;
        placeRouteUrl?: string | null;
    }): ExtendedEvent {
        this.title = title !== undefined ? title : this.title;
        this.placeId = placeId !== undefined ? placeId : this.placeId;
        this.placeName = placeName !== undefined ? placeName : this.placeName;
        this.startTime = startTime !== undefined ? startTime : this.startTime;
        this.endTime = endTime !== undefined ? endTime : this.endTime;
        this.imgUrl = imgUrl !== undefined ? imgUrl : this.imgUrl;
        this.notes = notes !== undefined ? notes : this.notes;
        this.id = id !== undefined ? id : this.id;
        this.placeRouteUrl = placeRouteUrl !== undefined ? placeRouteUrl : this.placeRouteUrl;

        return this;
    }
}
