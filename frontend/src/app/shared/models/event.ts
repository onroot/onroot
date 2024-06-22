import { DateTime } from 'luxon';
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
    constructor(
        public title: string,
        public placeId: string | null,
        public placeName: string | null,
        public startTime: number | null,
        public endTime: number | null,
        public imgUrl: string | null,
        public notes: string | null,
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

    static fromUrlExportableEvent(e: UrlExportableEvent): SimpleEvent {
        return new SimpleEvent(e.t, e.l, e.p, e.s, e.e, e.i, e.n);
    }
}

export class Event extends SimpleEvent {
    constructor(
        event: SimpleEvent,
        public id: number,
        public placeRouteUrl: string | null,
    ) {
        super(
            event.title,
            event.placeId,
            event.placeName,
            event.startTime,
            event.endTime,
            event.imgUrl,
            event.notes,
        );
    }

    static fromRaw(
        title: string,
        placeId: string | null,
        placeName: string | null,
        startTime: number | null,
        endTime: number | null,
        imgUrl: string | null,
        notes: string | null,
        id: number,
        placeRouteUrl: string | null,
    ): Event {
        const simpleEvent = new SimpleEvent(
            title,
            placeId,
            placeName,
            startTime,
            endTime,
            imgUrl,
            notes,
        );
        return new Event(simpleEvent, id, placeRouteUrl);
    }

    static withPatch(event: Event, patch: any, member: EventMember): Event {
        switch (member) {
            case EventMember.title:
                return this.fromRaw(
                    patch,
                    event.placeId,
                    event.placeName,
                    event.startTime,
                    event.endTime,
                    event.imgUrl,
                    event.notes,
                    event.id,
                    event.placeRouteUrl,
                );
            case EventMember.placeId:
                return this.fromRaw(
                    event.title,
                    patch,
                    event.placeName,
                    event.startTime,
                    event.endTime,
                    event.imgUrl,
                    event.notes,
                    event.id,
                    event.placeRouteUrl,
                );
            case EventMember.placeName:
                return this.fromRaw(
                    event.title,
                    event.placeId,
                    patch,
                    event.startTime,
                    event.endTime,
                    event.imgUrl,
                    event.notes,
                    event.id,
                    event.placeRouteUrl,
                );
            case EventMember.startTime:
                return this.fromRaw(
                    event.title,
                    event.placeId,
                    event.placeName,
                    patch,
                    event.endTime,
                    event.imgUrl,
                    event.notes,
                    event.id,
                    event.placeRouteUrl,
                );
            case EventMember.endTime:
                return this.fromRaw(
                    event.title,
                    event.placeId,
                    event.placeName,
                    event.startTime,
                    patch,
                    event.imgUrl,
                    event.notes,
                    event.id,
                    event.placeRouteUrl,
                );
            case EventMember.imgUrl:
                return this.fromRaw(
                    event.title,
                    event.placeId,
                    event.placeName,
                    event.startTime,
                    event.endTime,
                    patch,
                    event.notes,
                    event.id,
                    event.placeRouteUrl,
                );
            case EventMember.notes:
                return this.fromRaw(
                    event.title,
                    event.placeId,
                    event.placeName,
                    event.startTime,
                    event.endTime,
                    event.imgUrl,
                    patch,
                    event.id,
                    event.placeRouteUrl,
                );
            case EventMember.id:
                return this.fromRaw(
                    event.title,
                    event.placeId,
                    event.placeName,
                    event.startTime,
                    event.endTime,
                    event.imgUrl,
                    event.notes,
                    patch,
                    event.placeRouteUrl,
                );
            case EventMember.placeRouteUrl:
                return this.fromRaw(
                    event.title,
                    event.placeId,
                    event.placeName,
                    event.startTime,
                    event.endTime,
                    event.imgUrl,
                    event.notes,
                    event.id,
                    patch,
                );
        }
    }
}

export enum EventMember {
    title,
    placeId,
    placeName,
    startTime,
    endTime,
    imgUrl,
    notes,
    id,
    placeRouteUrl,
}
