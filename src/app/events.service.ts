import { Injectable, Signal, computed, signal } from '@angular/core';
import { ExtendedEvent, SimpleEvent, UrlExportableEvent } from './shared/models/event';
import { MapsService } from './maps.service';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private newId = 0;
    private eventsSig = signal<ExtendedEvent[]>([]);

    constructor(private mapsService: MapsService) {}

    getEvents(): Signal<ExtendedEvent[]> {
        return computed(this.eventsSig);
    }

    getEvent(index: number): Signal<ExtendedEvent> {
        return computed(() => this.eventsSig()[index]);
    }

    setEvents(events: ExtendedEvent[]): void {
        this.eventsSig.set(events);
    }

    setEvent(index: number, event: ExtendedEvent): void {
        this.eventsSig.update((events) => [
            ...events.slice(0, index),
            event,
            ...events.slice(index + 1),
        ]);
    }

    // Overrides id
    addEvent(extendedEvent: ExtendedEvent): void {
        extendedEvent.update({ id: ++this.newId });
        this.eventsSig.update((prevEvents) => [...prevEvents, extendedEvent]);
    }

    addSimpleEvent(simpleEvent: SimpleEvent): void {
        let placeRouteUrl: string | undefined;
        if (simpleEvent.placeId !== null && simpleEvent.placeName !== null) {
            placeRouteUrl = this.mapsService.generateDirectionsUrl({
                placeId: simpleEvent.placeId,
                placeName: simpleEvent.placeName,
            });
        }
        const extendedEvent = ExtendedEvent.fromSimpleEvent(simpleEvent, {
            id: ++this.newId,
            placeRouteUrl,
        });
        this.eventsSig.update((prevEvents) => [...prevEvents, extendedEvent]);
    }

    addUrlExportableEvent(urlExportableEvent: UrlExportableEvent): void {
        this.addSimpleEvent(SimpleEvent.fromUrlExportableEvent(urlExportableEvent));
    }

    removeEvent(index: number): void {
        this.eventsSig.update((events) => [...events.slice(0, index), ...events.slice(index + 1)]);
    }

    clearEvents(): void {
        this.setEvents([]);
    }

    moveEvent(currentIndex: number, newIndex: number): void {
        if (
            currentIndex < 0 ||
            currentIndex > this.eventsSig().length ||
            newIndex < 0 ||
            newIndex > this.eventsSig().length
        ) {
            console.error('Invalid index while moving event');
            return;
        }

        this.eventsSig.update((prevEvents) => {
            const newEvents = [...prevEvents];
            const elementToMove = newEvents.splice(currentIndex, 1)[0];
            newEvents.splice(newIndex, 0, elementToMove);
            return newEvents;
        });
    }
}
