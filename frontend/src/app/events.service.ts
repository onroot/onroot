import { Injectable, Signal, computed, signal } from '@angular/core';
import { ExtendedEvent, SimpleEvent, UrlExportableEvent } from './shared/models/event';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private newId = 0;
    private eventsSig = signal<ExtendedEvent[]>([]);

    getEvents(): Signal<ExtendedEvent[]> {
        return computed(this.eventsSig);
    }

    setEvents(events: ExtendedEvent[]): void {
        this.eventsSig.set(events);
    }

    setEvent(index: number, event: ExtendedEvent): void {
        console.log('new event');
        console.log(event);

        this.eventsSig.update((events) => [
            ...events.slice(0, index),
            event,
            ...events.slice(index + 1),
        ]);
    }

    addSimpleEvent(simpleEvent: SimpleEvent): void {
        const extendedEvent = ExtendedEvent.fromSimpleEvent(simpleEvent, { id: ++this.newId });
        this.eventsSig.update((prevEvents) => [...prevEvents, extendedEvent]);
    }

    addUrlExportableEvent(urlExportableEvent: UrlExportableEvent): void {
        this.addSimpleEvent(SimpleEvent.fromUrlExportableEvent(urlExportableEvent));
    }

    removeEvent(index: number): void {
        this.eventsSig.update((events) => [...events.slice(0, index), ...events.slice(index + 1)]);
    }
}
