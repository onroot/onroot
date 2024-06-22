import { Injectable, Signal, computed, signal } from '@angular/core';
import { Event, SimpleEvent, UrlExportableEvent } from './shared/models/event';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private newId = 0;
    private eventsSig = signal<Event[]>([]);

    getEvents(): Signal<Event[]> {
        return computed(this.eventsSig);
    }

    setEvents(events: Event[]): void {
        this.eventsSig.set(events);
    }

    setEvent(index: number, event: Event): void {
        this.eventsSig.update((events) => [
            ...events.slice(0, index),
            event,
            ...events.slice(index + 1),
        ]);
    }

    addSimpleEvent(simpleEvent: SimpleEvent): void {
        const event = new Event(simpleEvent, ++this.newId, 'https://www.example.com');
        this.eventsSig.update((prevEvents) => [...prevEvents, event]);
    }

    addUrlExportableEvent(urlExportableEvent: UrlExportableEvent): void {
        this.addSimpleEvent(SimpleEvent.fromUrlExportableEvent(urlExportableEvent));
    }

    removeEvent(index: number): void {
        this.eventsSig.update((events) => [
            ...events.slice(0, index),
            ...events.slice(index + 1),
        ]);
    }
}
